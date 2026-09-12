import { test, expect } from './fixtures/hass';
import { removeState, setState, useDashboard } from './helpers/homeassistant';

const TOGGLE = 'switch.e2e_bge_toggle';

let urlPath: string;

test.beforeAll(async () => {
  await setState(TOGGLE, 'on', { friendly_name: 'E2E toggle' });
  urlPath = await useDashboard('switch', {
    views: [
      {
        title: 'Toggles',
        cards: [
          {
            type: 'custom:background-graph-entities',
            title: 'E2E toggles',
            entities: [{ entity: TOGGLE, name: 'E2E toggle' }],
          },
        ],
      },
    ],
  });
});

test.afterAll(async () => {
  await removeState(TOGGLE);
});

test.describe("Home Assistant's own ha-switch", () => {
  test('is the element in use, and the card registers no placeholder for it', async ({ page, consoleErrors }) => {
    // Record every customElements.define before any page script runs, together
    // with the stack it came from. That is what tells a placeholder registered
    // by this bundle apart from Home Assistant's own lazily loaded definition -
    // and a placeholder is what used to make HA's define throw and break every
    // toggle in the frontend.
    await page.addInitScript(() => {
      const defines: { name: string; stack: string }[] = [];
      (window as unknown as { __defines: typeof defines }).__defines = defines;
      const original = customElements.define.bind(customElements);
      customElements.define = (name: string, ctor: CustomElementConstructor, options?: ElementDefinitionOptions) => {
        defines.push({ name, stack: new Error().stack ?? '' });
        return original(name, ctor, options);
      };
    });

    await page.goto(`/${urlPath}/0`);

    const toggle = page.locator('background-graph-entities .entity-with-toggle ha-switch');
    await expect(toggle).toBeVisible({ timeout: 60_000 });

    const defines = await page.evaluate(
      () => (window as unknown as { __defines: { name: string; stack: string }[] }).__defines,
    );
    const ourBundle = defines.filter((entry) => entry.stack.includes('/local/background-graph-entities/'));
    // The bundle is allowed to define its own elements and nothing else.
    expect(ourBundle.map((entry) => entry.name).sort()).toEqual([
      'background-graph-entities',
      'background-graph-entities-editor',
      'hex-color-picker',
    ]);
    expect(defines.some((entry) => entry.name === 'ha-switch')).toBe(true);
    expect(ourBundle.some((entry) => entry.name === 'ha-switch')).toBe(false);

    // Upgraded by Home Assistant's implementation: a placeholder
    // `class extends HTMLElement {}` has no shadow root and paints nothing.
    const upgraded = await toggle.evaluate((element) => ({
      constructorName: element.constructor.name,
      hasShadowRoot: !!element.shadowRoot,
      inner: element.shadowRoot?.innerHTML.length ?? 0,
      checked: (element as unknown as { checked?: boolean }).checked,
    }));
    expect(upgraded.hasShadowRoot).toBe(true);
    expect(upgraded.inner).toBeGreaterThan(0);
    expect(upgraded.checked).toBe(true);

    // And it tracks the entity, which is only true if the real element upgraded
    // and kept the properties Lit had already set on it.
    await setState(TOGGLE, 'off', { friendly_name: 'E2E toggle' });
    await expect
      .poll(() => toggle.evaluate((element) => (element as unknown as { checked?: boolean }).checked), {
        timeout: 30_000,
      })
      .toBe(false);

    expect(consoleErrors.filter((text) => /has already been used/i.test(text))).toEqual([]);
  });

  // Material's switch redispatches an activation click, so one tap used to reach a
  // `click` handler twice: the card called `homeassistant.toggle` on and straight back
  // off about a millisecond apart, and automations triggered by the helper never ran.
  // Only the real element does this - the mocked `ha-switch` of the static suite cannot
  // see it.
  test('sends exactly one toggle service call per tap', async ({ page }) => {
    await setState(TOGGLE, 'off', { friendly_name: 'E2E toggle' });
    await page.goto(`/${urlPath}/0`);

    const toggle = page.locator('background-graph-entities .entity-with-toggle ha-switch');
    await expect(toggle).toBeVisible({ timeout: 60_000 });

    await page.evaluate(() => {
      const recorded: Record<string, unknown>[] = [];
      (window as unknown as { __serviceCalls: typeof recorded }).__serviceCalls = recorded;
      const send = WebSocket.prototype.send;
      WebSocket.prototype.send = function (data) {
        try {
          const message = JSON.parse(String(data)) as Record<string, unknown>;
          if (message.type === 'call_service') recorded.push(message);
        } catch {
          // Binary frames and anything else the frontend sends are not our business.
        }
        return send.call(this, data);
      };
    });

    const recorded = () =>
      page.evaluate(() => (window as unknown as { __serviceCalls: Record<string, unknown>[] }).__serviceCalls);

    await toggle.click();
    await expect.poll(() => recorded().then((calls) => calls.length), { timeout: 10_000 }).toBeGreaterThan(0);
    // The duplicate used to land about a millisecond behind the first one, so a short
    // settle is enough to catch it - and the entity is state-only, so its state never
    // answers the question.
    await page.waitForTimeout(1000);

    const calls = await recorded();
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({
      domain: 'homeassistant',
      service: 'toggle',
      service_data: { entity_id: TOGGLE },
    });
  });
});
