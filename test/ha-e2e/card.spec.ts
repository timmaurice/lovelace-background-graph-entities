import { test, expect } from './fixtures/hass';
import { removeState, setState, useDashboard } from './helpers/homeassistant';

const TEMPERATURE = 'sensor.e2e_bge_temperature';
const HUMIDITY = 'sensor.e2e_bge_humidity';

const DASHBOARD = {
  views: [
    {
      title: 'Graphs',
      cards: [
        {
          type: 'custom:background-graph-entities',
          title: 'E2E graphs',
          hours_to_show: 24,
          entities: [
            { entity: TEMPERATURE, name: 'E2E living room' },
            { entity: HUMIDITY, name: 'E2E bathroom' },
          ],
        },
      ],
    },
    { title: 'Elsewhere', cards: [{ type: 'markdown', content: 'nothing here' }] },
  ],
};

let urlPath: string;

/**
 * The card draws a line from the recorder's history, and it needs at least two
 * finite points to draw anything at all. So the entities are not seeded once but
 * written a few times with a pause in between: the recorder commits on its own
 * schedule, and a single write would leave the graph empty for reasons that have
 * nothing to do with the card.
 */
async function seedSeries(entityId: string, unit: string, values: number[]): Promise<void> {
  for (const value of values) {
    await setState(entityId, value.toFixed(1), {
      friendly_name: entityId,
      unit_of_measurement: unit,
      device_class: unit === '°C' ? 'temperature' : 'humidity',
      state_class: 'measurement',
    });
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}

test.beforeAll(async () => {
  test.setTimeout(120_000);
  await seedSeries(TEMPERATURE, '°C', [19.2, 20.8, 21.5]);
  await seedSeries(HUMIDITY, '%', [41, 46, 44]);
  urlPath = await useDashboard('card', DASHBOARD);
});

test.afterAll(async () => {
  await removeState(TEMPERATURE);
  await removeState(HUMIDITY);
});

test.describe('The card on a real dashboard', () => {
  test('renders the seeded entities', async ({ page, consoleErrors }) => {
    await page.goto(`/${urlPath}/0`);

    // Assert on what the card paints, not on the custom element itself: the host
    // has no box of its own, so Playwright rightly calls it hidden.
    const card = page.locator('background-graph-entities');
    await expect(card.locator('ha-card')).toBeVisible({ timeout: 60_000 });
    await expect(card.locator('.entity-row', { hasText: 'E2E living room' })).toBeVisible();
    await expect(card.locator('.entity-row', { hasText: 'E2E living room' }).locator('.primary-value')).toHaveText(
      '21.5 °C',
    );
    await expect(card.locator('.entity-row', { hasText: 'E2E bathroom' }).locator('.primary-value')).toHaveText(
      '44.0 %',
    );
    expect(consoleErrors.filter((text) => /has already been used/i.test(text))).toEqual([]);
  });

  test('draws a graph from the recorder history', async ({ page }) => {
    await page.goto(`/${urlPath}/0`);
    const graph = page.locator(`background-graph-entities .graph-container[data-entity-id="${TEMPERATURE}"] svg`);
    await expect(graph).toHaveCount(1, { timeout: 60_000 });
    await expect(graph.locator('path.graph-path')).toHaveCount(1);
  });

  test('comes back after leaving the view and returning', async ({ page }) => {
    // Views are torn out of the DOM on a switch. A card that does not notice it
    // is visible again comes back empty, and no unit test sees that.
    await page.goto(`/${urlPath}/0`);
    const value = page
      .locator('background-graph-entities')
      .locator('.entity-row', { hasText: 'E2E living room' })
      .locator('.primary-value');
    await expect(value).toHaveText('21.5 °C', { timeout: 60_000 });

    await page.getByRole('tab', { name: 'Elsewhere' }).click();
    await expect(page.locator('background-graph-entities')).toHaveCount(0);

    await page.getByRole('tab', { name: 'Graphs' }).click();
    await expect(value).toHaveText('21.5 °C', { timeout: 30_000 });
    await expect(
      page.locator(`background-graph-entities .graph-container[data-entity-id="${TEMPERATURE}"] svg`),
    ).toHaveCount(1, { timeout: 30_000 });
  });
});
