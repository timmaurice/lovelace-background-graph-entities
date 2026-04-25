import { test, expect, Page } from '@playwright/test';

// Helper to inject the card and set its config/mock data
async function setupCard(page: Page, config: Record<string, unknown>) {
  await page.evaluate(async (configPayload) => {
    await customElements.whenDefined('background-graph-entities');

    interface MockHass {
      states: Record<string, unknown>;
      entities: Record<string, unknown>;
      callWS: () => Promise<unknown>;
    }
    interface BackgroundGraphEntitiesElement extends HTMLElement {
      hass: MockHass;
      setConfig(config: Record<string, unknown>): void;
    }

    const container = document.querySelector('.card-container')!;
    container.innerHTML = '<background-graph-entities></background-graph-entities>';
    const card = document.querySelector('background-graph-entities') as BackgroundGraphEntitiesElement;

    // Generate some history data
    const now = Date.now() / 1000;
    const generateHistory = (baseValue: number, variance: number, trend: number = 0) => {
      const data = [];
      for (let i = 24; i >= 0; i--) {
        data.push({
          s: String(baseValue + (Math.random() * variance - variance / 2) + (24 - i) * trend),
          lu: now - i * 3600,
        });
      }
      return data;
    };

    card.hass = {
      states: {
        'sensor.bedroom': {
          entity_id: 'sensor.bedroom',
          state: '25.54',
          attributes: { friendly_name: 'Bed room', unit_of_measurement: '°C' },
        },
        'sensor.living_room': {
          entity_id: 'sensor.living_room',
          state: '24.07',
          attributes: { friendly_name: 'Living room', unit_of_measurement: '°C' },
        },
        'sensor.outside': {
          entity_id: 'sensor.outside',
          state: '20.91',
          attributes: { friendly_name: 'Outside', unit_of_measurement: '°C' },
        },
        'sensor.humidity': {
          entity_id: 'sensor.humidity',
          state: '45',
          attributes: { friendly_name: 'Humidity', unit_of_measurement: '%' },
        },
        'sensor.hidden': { entity_id: 'sensor.hidden', state: '0', attributes: {} },
        'switch.ac': { entity_id: 'switch.ac', state: 'on', attributes: { friendly_name: 'Air Conditioner' } },
      },
      entities: {
        'sensor.bedroom': { entity_id: 'sensor.bedroom', icon: 'mdi:bed' },
        'sensor.living_room': { entity_id: 'sensor.living_room', icon: 'mdi:sofa' },
        'sensor.outside': { entity_id: 'sensor.outside', icon: 'mdi:thermometer' },
        'sensor.humidity': { entity_id: 'sensor.humidity', icon: 'mdi:water-percent' },
        'sensor.hidden': { entity_id: 'sensor.hidden', icon: 'mdi:eye-off' },
        'switch.ac': { entity_id: 'switch.ac', icon: 'mdi:air-conditioner' },
      },
      callWS: async () => ({
        'sensor.bedroom': generateHistory(25, 1, 0.05),
        'sensor.living_room': generateHistory(24, 0.5, -0.02),
        'sensor.outside': generateHistory(15, 3, 0.2),
        'sensor.humidity': generateHistory(50, 10, -0.1),
        'sensor.hidden': generateHistory(0, 0, 0),
        'switch.ac': generateHistory(1, 0, 0),
      }),
    };

    card.setConfig(configPayload);
  }, config);
}

test.describe('Background Graph Entities', () => {
  test.beforeEach(async ({ page }) => {
    page.on('pageerror', (exception) => console.error(`BROWSER ERROR:\n${exception.stack || exception}`));
    await page.goto('/test/e2e/test-page.html');
  });

  test('1. Multi-Entity "Temperatures" Layout', async ({ page }) => {
    await setupCard(page, {
      title: 'Temperatures',
      entities: [
        { entity: 'sensor.bedroom' },
        {
          entity: 'sensor.living_room',
          overwrite_graph_appearance: true,
          line_color: '#ff0000',
        },
        { entity: 'sensor.outside' },
      ],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    const rows = cardElement.locator('.entity-row');
    await expect(rows).toHaveCount(3);

    // Verify Bedroom
    await expect(rows.nth(0).locator('.entity-name')).toHaveText('Bed room');
    await expect(rows.nth(0).locator('.primary-value')).toHaveText('25.54 °C');
    // Verify Living Room
    await expect(rows.nth(1).locator('.entity-name')).toHaveText('Living room');
    await expect(rows.nth(1).locator('.primary-value')).toHaveText('24.07 °C');
    // Verify Living Room graph has red color
    const livingRoomGraph = rows.nth(1).locator('.graph-path');
    await expect(livingRoomGraph).toHaveAttribute('stroke', '#ff0000');

    // Screenshot
    await page.screenshot({
      path: 'test/e2e/screenshots/1_temperatures.png',
    });
  });

  test('2. General Graph Appearance Settings', async ({ page }) => {
    await setupCard(page, {
      title: 'Appearance Test',
      line_width: 5,
      line_length: 'short',
      line_opacity: 0.8,
      line_glow: true,
      curve: 'step',
      entities: ['sensor.bedroom'],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    const graphPath = cardElement.locator('.graph-path');
    await expect(graphPath).toHaveAttribute('stroke-width', '5');
    await expect(graphPath).toHaveAttribute('stroke-opacity', '0.8');

    // Test that the glow filter is applied
    await expect(graphPath).toHaveAttribute('filter', 'url(#bge-glow-sensor.bedroom)');

    await page.screenshot({
      path: 'test/e2e/screenshots/2_appearance.png',
    });
  });

  test('3. Layout & Min/Max Bound Settings', async ({ page }) => {
    await setupCard(page, {
      title: 'Layout Test',
      tile_style: true,
      show_icon: false,
      graph_min: 20,
      graph_max: 30,
      entities: [{ entity: 'sensor.bedroom', show_icon: true }, 'sensor.living_room'],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    // Verify tile style class
    const cardContent = cardElement.locator('.card-content');
    await expect(cardContent).toHaveClass(/tile/);

    // Verify icon overrides (bedroom shows icon, living room does not because global show_icon is false)
    const rows = cardElement.locator('.entity-row');
    const bedIcon = rows.nth(0).locator('ha-state-icon');
    await expect(bedIcon).toBeAttached();

    const livingIcon = rows.nth(1).locator('ha-state-icon');
    await expect(livingIcon).not.toBeAttached();

    await page.screenshot({
      path: 'test/e2e/screenshots/3_layout.png',
    });
  });

  test('4. Dynamic Color Thresholds', async ({ page }) => {
    await setupCard(page, {
      title: 'Thresholds Test',
      entities: [
        {
          entity: 'sensor.bedroom',
          overwrite_graph_appearance: true,
          color_thresholds: [
            { value: 20, color: 'blue' },
            { value: 24, color: 'orange' },
            { value: 28, color: 'red' },
          ],
        },
      ],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    // Verify that a linear gradient was generated for the graph stroke
    const graphPath = cardElement.locator('.graph-path');
    const strokeAttr = await graphPath.getAttribute('stroke');
    expect(strokeAttr).toContain('url(#bge-gradient-sensor.bedroom)');

    const gradient = cardElement.locator('linearGradient');
    await expect(gradient).toBeAttached();

    await page.screenshot({
      path: 'test/e2e/screenshots/4_thresholds.png',
    });
  });

  test('5. Alternative Graph Entity & Overrides', async ({ page }) => {
    await setupCard(page, {
      title: 'Overrides Test',
      entities: [
        {
          entity: 'sensor.bedroom',
          graph_entity: 'sensor.humidity',
          show_graph_entity_state: true,
          icon_color: '#00ff00',
        },
      ],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    const row = cardElement.locator('.entity-row').nth(0);

    // Verify icon color
    const icon = row.locator('.entity-icon');
    await expect(icon).toHaveAttribute('style', /color: #00ff00/);

    // Verify alternative state is rendered (.secondary-value)
    const secondaryValue = row.locator('.secondary-value');
    await expect(secondaryValue).toBeVisible();
    await expect(secondaryValue).toHaveText('· 45 %');

    await page.screenshot({
      path: 'test/e2e/screenshots/5_overrides.png',
    });
  });

  test('6. Standard Style & Entity Toggles', async ({ page }) => {
    await setupCard(page, {
      title: 'Standard Controls',
      entities: ['sensor.bedroom', { entity: 'switch.ac', name: 'AC Toggle' }],
    });

    const cardElement = page.locator('background-graph-entities');
    await expect(cardElement).toBeVisible();

    // Verify switch row
    const switchRow = cardElement.locator('.entity-row').nth(1);
    const toggleContainer = switchRow.locator('.entity-with-toggle');
    await expect(toggleContainer).toBeVisible();

    const haSwitch = toggleContainer.locator('ha-switch');
    await expect(haSwitch).toBeVisible();

    await page.screenshot({
      path: 'test/e2e/screenshots/6_toggles.png',
    });
  });
});
