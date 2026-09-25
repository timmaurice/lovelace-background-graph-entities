import { describe, it, expect, beforeEach, afterEach, vi, Mock, beforeAll } from 'vitest';
import { HomeAssistant, BackgroundGraphEntitiesConfig } from '../src/types';
import type { BackgroundGraphEntities as BackgroundGraphEntitiesType } from '../src/background-graph-entities';
import { compileValueTransform, downsampleHistory, entityDisplayName, formatNumber } from '../src/utils';
import { resolveEntity } from '../src/entity';

// Mock console.info before the module is imported to prevent version logging.
vi.spyOn(console, 'info').mockImplementation(() => {});

// Mock requestAnimationFrame for the JSDOM environment
window.requestAnimationFrame = vi.fn().mockImplementation((cb) => setTimeout(() => cb(0), 0) as unknown as number);
window.cancelAnimationFrame = vi.fn().mockImplementation((id) => clearTimeout(id));

import { scaleLinear } from 'd3-scale';
import { LitElement, TemplateResult, html, render as litRender } from 'lit';

// Define a minimal interface for the ha-switch element
interface HaSwitch extends HTMLElement {
  checked?: boolean;
}

vi.mock('d3-scale', async () => {
  const originalModule = await vi.importActual<typeof import('d3-scale')>('d3-scale');
  // We spy on scaleLinear to be able to check the domain it was called with.
  return { ...originalModule, scaleLinear: vi.fn(originalModule.scaleLinear) };
});

/**
 * Drains the rAF-driven render chain under fake timers.
 *
 * Not `runAllTimersAsync`: the card now arms a recurring history refresh, so the
 * timer queue never empties and that helper aborts as an infinite loop. The
 * render path only ever hops a handful of animation frames (mocked here as
 * `setTimeout(cb, 0)`), so a short bounded advance is enough - and it keeps the
 * refresh interval out of the tests that only care about drawing.
 */
async function flushFrames(): Promise<void> {
  await vi.advanceTimersByTimeAsync(100);
}

describe('BackgroundGraphEntities', () => {
  let element: BackgroundGraphEntitiesType;
  let hass: HomeAssistant;
  let config: BackgroundGraphEntitiesConfig;
  // This will hold the class constructor at runtime, loaded via dynamic import.
  let BackgroundGraphEntities: new () => BackgroundGraphEntitiesType;

  // Mock element dimensions for JSDOM. D3 requires a sized container to render.
  beforeAll(async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 50 });

    // Dynamically import the component to get the class constructor.
    // This ensures the console.info mock above is active before the component's
    // module-level code (which includes the log statement) runs.
    const module = await import('../src/background-graph-entities');
    BackgroundGraphEntities = module.BackgroundGraphEntities;
  });

  beforeEach(() => {
    // Mock the Home Assistant object
    hass = {
      states: {
        'sensor.test': {
          entity_id: 'sensor.test',
          state: '123',
          attributes: {
            friendly_name: 'Test Sensor',
            unit_of_measurement: '°C',
          },
        },
      },
      entities: {},
      localize: (key: string) => key,
      language: 'en',
      themes: { darkMode: false },
      callWS: vi.fn().mockResolvedValue({ 'sensor.test': [] }),
      callService: vi.fn().mockResolvedValue(true),
    };

    // Mock a basic card configuration
    config = {
      type: 'custom:background-graph-entities',
      entities: ['sensor.test'],
    };

    // Create the element and add it to the DOM
    element = document.createElement('background-graph-entities') as BackgroundGraphEntitiesType;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.mocked(scaleLinear).mockClear();
    vi.clearAllMocks();
  });

  describe('Basic Rendering and Configuration', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should create the component instance', () => {
      expect(element).toBeInstanceOf(BackgroundGraphEntities);
    });

    it('should render a ha-card with a title if provided', async () => {
      element.hass = hass;
      element.setConfig({ ...config, title: 'My Test Card' });
      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.name')?.textContent?.trim()).toBe('My Test Card');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('');
    });

    it('should render the average in the title if average_in_title is enabled', async () => {
      element.hass = {
        ...hass,
        states: {
          'sensor.test1': {
            entity_id: 'sensor.test1',
            state: '10.5',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
          'sensor.test2': {
            entity_id: 'sensor.test2',
            state: '20.5',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
        },
      };
      element.setConfig({
        ...config,
        title: 'Temperature',
        entities: ['sensor.test1', 'sensor.test2'],
        average_in_title: true,
      });
      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.name')?.textContent?.trim()).toBe('Temperature');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('15.5 °C');
    });

    it('should render only the average if title is not provided and average_in_title is enabled', async () => {
      element.hass = {
        ...hass,
        states: {
          'sensor.test1': {
            entity_id: 'sensor.test1',
            state: '10.5',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
          'sensor.test2': {
            entity_id: 'sensor.test2',
            state: '20.5',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
        },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test1', 'sensor.test2'],
        average_in_title: true,
      });
      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.name')?.textContent?.trim()).toBe('');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('15.5 °C');
    });

    it('should skip non-numeric and boolean entities when calculating average in title', async () => {
      element.hass = {
        ...hass,
        states: {
          'sensor.test1': {
            entity_id: 'sensor.test1',
            state: '10',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
          'binary_sensor.test2': {
            entity_id: 'binary_sensor.test2',
            state: 'on',
            attributes: {},
          },
          'sensor.test3': {
            entity_id: 'sensor.test3',
            state: 'unknown',
            attributes: {},
          },
        },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test1', 'binary_sensor.test2', 'sensor.test3'],
        average_in_title: true,
      });
      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.name')?.textContent?.trim()).toBe('');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('10 °C');
    });

    it('should not display unit if entities have mismatched units', async () => {
      element.hass = {
        ...hass,
        states: {
          'sensor.test1': {
            entity_id: 'sensor.test1',
            state: '10',
            attributes: {
              unit_of_measurement: '°C',
            },
          },
          'sensor.test2': {
            entity_id: 'sensor.test2',
            state: '20',
            attributes: {
              unit_of_measurement: '%',
            },
          },
        },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test1', 'sensor.test2'],
        average_in_title: true,
      });
      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.name')?.textContent?.trim()).toBe('');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('15');
    });

    it('should throw an error if no entities are provided in config', () => {
      expect(() => element.setConfig({ type: 'custom:background-graph-entities', entities: [] })).toThrow(
        'You need to define at least one entity',
      );
    });

    it('should render an unavailable entity row correctly', async () => {
      // Use a config with an entity that is not in the hass object
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.unavailable'],
      });
      element.hass = hass;
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row');
      expect(row).not.toBeNull();
      expect(row?.classList.contains('unavailable')).toBe(true);

      const icon = row?.querySelector('ha-icon');
      expect(icon?.getAttribute('icon')).toBe('mdi:alert-circle-outline');

      const value = row?.querySelector('.entity-value');
      expect(value?.textContent?.trim()).toBe('state.default.unavailable');
    });

    it('should render an svg graph when history is available', async () => {
      // Mock callWS to return some history data
      const historyData = [
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '10' },
        { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '12' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig(config);

      // Wait for the component to update twice: once for the initial render,
      // and a second time after the async history data is fetched and rendered.
      await element.updateComplete;
      await element.updateComplete;

      // Wait for the requestAnimationFrame in `updated()` to fire and render the D3 graph.
      await flushFrames();

      const graphContainer = element.shadowRoot?.querySelector('.graph-container');
      const svg = graphContainer?.querySelector('svg');
      expect(svg).not.toBeNull();
    });

    it('should format the entity state using display_precision', async () => {
      hass.states['sensor.precise'] = {
        entity_id: 'sensor.precise',
        state: '123.4567',
        attributes: {
          friendly_name: 'Precise Sensor',
          unit_of_measurement: 'V',
        },
      };
      hass.entities['sensor.precise'] = {
        entity_id: 'sensor.precise',
        display_precision: 2,
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.precise'],
      });
      element.hass = hass;
      await element.updateComplete;

      const value = element.shadowRoot?.querySelector('.entity-value');
      expect(value?.textContent?.trim()).toBe('123.46 V');
    });

    it('should apply locale thousands separators to the displayed value', async () => {
      hass.states['sensor.big'] = {
        entity_id: 'sensor.big',
        state: '1234567',
        attributes: { friendly_name: 'Big', unit_of_measurement: 'W' },
      };
      hass.entities['sensor.big'] = { entity_id: 'sensor.big', display_precision: 0 };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.big'] });
      element.hass = hass;
      await element.updateComplete;

      const value = element.shadowRoot?.querySelector('.entity-value');
      // Default mock locale is English → comma grouping.
      expect(value?.textContent?.trim()).toBe('1,234,567 W');
    });

    it('should honor the user number_format locale (decimal_comma)', async () => {
      hass.locale = { language: 'de', number_format: 'decimal_comma' };
      hass.states['sensor.big'] = {
        entity_id: 'sensor.big',
        state: '1234567.5',
        attributes: { friendly_name: 'Big', unit_of_measurement: 'W' },
      };
      hass.entities['sensor.big'] = { entity_id: 'sensor.big', display_precision: 1 };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.big'] });
      element.hass = hass;
      await element.updateComplete;

      const value = element.shadowRoot?.querySelector('.entity-value');
      // decimal_comma → dot grouping, comma decimal mark: 1.234.567,5
      expect(value?.textContent?.trim()).toBe('1.234.567,5 W');
    });

    it('should format minute values correctly', async () => {
      hass.states['sensor.time_short'] = {
        entity_id: 'sensor.time_short',
        state: '14.56',
        attributes: { friendly_name: 'Short Time', unit_of_measurement: 'min' },
      };
      hass.states['sensor.time_long'] = {
        entity_id: 'sensor.time_long',
        state: '75.5',
        attributes: { friendly_name: 'Long Time', unit_of_measurement: 'min' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.time_short', 'sensor.time_long'],
      });
      element.hass = hass;
      await element.updateComplete;

      const values = element.shadowRoot?.querySelectorAll('.entity-value');
      expect(values).toHaveLength(2);
      expect(values?.[0].textContent?.trim()).toBe('14 min');
      expect(values?.[1].textContent?.trim()).toBe('1h 15min');
    });
  });

  describe('History fetching', () => {
    const historyCalls = () =>
      (hass.callWS as Mock).mock.calls.filter(([message]) => message?.type === 'history/history_during_period') as [
        { entity_ids: string[] },
      ][];

    it('should fetch every row in a single websocket call', async () => {
      const ids: string[] = [];
      for (let i = 0; i < 12; i++) {
        const id = `sensor.row_${i}`;
        ids.push(id);
        hass.states[id] = { entity_id: id, state: String(i), attributes: {} };
      }
      element.hass = hass;
      element.setConfig({ type: 'custom:background-graph-entities', entities: ids });
      await element.updateComplete;
      await element.updateComplete;

      // One request per row is what made a 60-row card issue 60 calls.
      expect(historyCalls()).toHaveLength(1);
      expect(historyCalls()[0][0].entity_ids).toEqual(ids);
    });

    it('should ask for a shared series only once', async () => {
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          { entity: 'sensor.test' },
          { entity: 'sensor.test', name: 'Same entity, second row' },
          { entity: 'sensor.other', graph_entity: 'sensor.test' },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;

      expect(historyCalls()).toHaveLength(1);
      expect(historyCalls()[0][0].entity_ids).toEqual(['sensor.test']);
    });

    it('should not refetch when an unrelated option changes', async () => {
      element.hass = hass;
      element.setConfig({ ...config, title: '' });
      await element.updateComplete;
      await element.updateComplete;
      expect(historyCalls()).toHaveLength(1);

      // Ten keystrokes in the editor's title field are ten setConfig calls.
      for (const title of 'Livingroom'.split('')) {
        element.setConfig({ ...config, title });
        await element.updateComplete;
      }
      await element.updateComplete;

      expect(historyCalls()).toHaveLength(1);
    });

    it('should refetch when the history window changes', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;
      await element.updateComplete;
      expect(historyCalls()).toHaveLength(1);

      element.setConfig({ ...config, hours_to_show: 48 });
      await element.updateComplete;
      await element.updateComplete;

      expect(historyCalls()).toHaveLength(2);
    });

    it('should refetch when the entities change', async () => {
      hass.states['sensor.extra'] = { entity_id: 'sensor.extra', state: '1', attributes: {} };
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;
      await element.updateComplete;
      expect(historyCalls()).toHaveLength(1);

      element.setConfig({ ...config, entities: ['sensor.test', 'sensor.extra'] });
      await element.updateComplete;
      await element.updateComplete;

      expect(historyCalls()).toHaveLength(2);
    });

    it('should still keep per-entity history apart in one response', async () => {
      hass.states['sensor.second'] = { entity_id: 'sensor.second', state: '7', attributes: {} };
      (hass.callWS as Mock).mockResolvedValue({
        'sensor.test': [{ lu: 1_700_000_000, s: '1' }],
        'sensor.second': [{ lu: 1_700_000_000, s: '2' }],
      });
      element.hass = hass;
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test', 'sensor.second'] });
      await element.updateComplete;
      await element.updateComplete;

      const history = (element as unknown as { _history: Map<string, { raw: { value: number }[] }> })._history;
      expect(history.get('sensor.test')?.raw[0].value).toBe(1);
      expect(history.get('sensor.second')?.raw[0].value).toBe(2);
    });
  });

  describe('History refresh interval', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should refresh history on the documented default interval', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;
      await element.updateComplete;
      const callsAfterFirstFetch = (hass.callWS as Mock).mock.calls.length;
      expect(callsAfterFirstFetch).toBeGreaterThan(0);

      // README documents `update_interval: 600`; without a default the card
      // fetched once and then froze forever.
      await vi.advanceTimersByTimeAsync(600 * 1000 + 10);
      expect((hass.callWS as Mock).mock.calls.length).toBeGreaterThan(callsAfterFirstFetch);
    });

    it('should honor an explicit update_interval', async () => {
      element.hass = hass;
      element.setConfig({ ...config, update_interval: 5 });
      await element.updateComplete;
      await element.updateComplete;
      const before = (hass.callWS as Mock).mock.calls.length;

      await vi.advanceTimersByTimeAsync(5 * 1000 + 10);
      expect((hass.callWS as Mock).mock.calls.length).toBeGreaterThan(before);
    });

    it('should never refresh when update_interval is 0', async () => {
      element.hass = hass;
      element.setConfig({ ...config, update_interval: 0 });
      await element.updateComplete;
      await element.updateComplete;
      const before = (hass.callWS as Mock).mock.calls.length;

      await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
      expect((hass.callWS as Mock).mock.calls.length).toBe(before);
    });
  });

  describe('Locale-aware durations', () => {
    it('should group the hour count the way the locale does', async () => {
      hass.locale = { language: 'de', number_format: 'decimal_comma' };
      hass.states['sensor.uptime'] = {
        entity_id: 'sensor.uptime',
        state: '75000',
        attributes: { friendly_name: 'Uptime', unit_of_measurement: 'min' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.uptime'] });
      element.hass = hass;
      await element.updateComplete;

      // 75000 minutes = 1250h 0min; every other value on the card would render
      // that as 1.250 in this locale.
      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('1.250h 0min');
    });

    it('should group a sub-hour value the same way', async () => {
      hass.locale = { language: 'en', number_format: 'comma_decimal' };
      hass.states['sensor.short'] = {
        entity_id: 'sensor.short',
        state: '45',
        attributes: { friendly_name: 'Short', unit_of_measurement: 'min' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.short'] });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('45 min');
    });
  });

  describe('Interactivity', () => {
    it('should render a toggle for on/off entities', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector<HaSwitch>('ha-switch');
      expect(toggle).not.toBeNull();
      expect(toggle?.checked).toBe(true);
    });

    it('should call the toggle service when the switch changes', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('ha-switch');
      toggle?.dispatchEvent(new Event('change', { bubbles: true }));

      expect(hass.callService).toHaveBeenCalledWith('homeassistant', 'toggle', { entity_id: 'switch.test' });
    });

    // Material's switch redispatches an activation click, so one tap reached a click
    // handler twice and toggled the entity on and straight back off 1ms apart.
    it('should not toggle on a click, only on the change it produces', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('ha-switch');
      // What a real tap looks like: click, change, and the redispatched click.
      (toggle as HTMLElement).click();
      toggle?.dispatchEvent(new Event('change', { bubbles: true }));
      (toggle as HTMLElement).click();

      expect(hass.callService).toHaveBeenCalledTimes(1);
    });

    it('should not open more-info when the switch is operated', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const moreInfo = vi.fn();
      element.addEventListener('hass-more-info', moreInfo);
      const toggle = element.shadowRoot?.querySelector('ha-switch');
      (toggle as HTMLElement).click();
      toggle?.dispatchEvent(new Event('change', { bubbles: true }));

      expect(moreInfo).not.toHaveBeenCalled();
    });
  });

  describe('Tile Style Mode', () => {
    beforeEach(() => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      config = {
        type: 'custom:background-graph-entities',
        entities: ['switch.test'],
        tile_style: true,
      };
    });

    it('should apply the tile class to card-content', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const cardContent = element.shadowRoot?.querySelector('.card-content');
      expect(cardContent?.classList.contains('tile')).toBe(true);
    });

    it('should not render a toggle switch', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('ha-switch');
      expect(toggle).toBeNull();
    });

    it('should render an active icon container for an "on" entity', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const iconContainer = element.shadowRoot?.querySelector('.icon-container');
      expect(iconContainer).not.toBeNull();
      expect(iconContainer?.classList.contains('active')).toBe(true);
    });

    it('should render name and value inside an entity-info container', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const entityInfo = element.shadowRoot?.querySelector('.entity-info');
      expect(entityInfo).not.toBeNull();
      expect(entityInfo?.querySelector('.entity-name')).not.toBeNull();
      expect(entityInfo?.querySelector('.entity-value')).not.toBeNull();
    });

    it('should call toggle service on icon click', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const iconContainer = element.shadowRoot?.querySelector('.icon-container');
      (iconContainer as HTMLElement).click();

      expect(hass.callService).toHaveBeenCalledWith('homeassistant', 'toggle', { entity_id: 'switch.test' });
    });

    it('should open more-info on row click (not on icon)', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const moreInfoSpy = vi.fn();
      element.addEventListener('hass-more-info', moreInfoSpy);
      const row = element.shadowRoot?.querySelector('.entity-row');
      (row as HTMLElement).click();

      expect(moreInfoSpy).toHaveBeenCalled();
      expect(moreInfoSpy.mock.calls[0][0].detail.entityId).toBe('switch.test');
    });
  });

  describe('Advanced Features and Overrides', () => {
    const mockNow = new Date('2023-01-01T11:30:00Z');

    beforeEach(() => {
      // Mock Date to control time-based logic in downsampler
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);

      // Ensure editMode is on to render dots for color checks
      element.editMode = true;
      // Mock history for graph rendering
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000); // 2 hours before mockNow
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '5' }, // Start time state
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '5' }, // value 5, falls in first hour bucket
        { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '15' }, // value 15, falls in second hour bucket
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      // Mock requestAnimationFrame to be synchronous. This is necessary because vi.useFakeTimers()
      // breaks the real requestAnimationFrame. We mock it with a setTimeout to make it async,
      // which we can then control with fake timers. This prevents stack overflows that can
      // occur from recursive rAF calls in the component's rendering retry logic.
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return correct card size', () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test', 'sensor.test2', 'sensor.test3'],
      });
      expect(element.getCardSize()).toBe(4);
    });

    it('should fire hass-more-info event on entity click', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const moreInfoSpy = vi.fn();
      element.addEventListener('hass-more-info', moreInfoSpy);

      const row = element.shadowRoot?.querySelector('.entity-row');
      (row as HTMLElement).click();

      expect(moreInfoSpy).toHaveBeenCalled();
      expect(moreInfoSpy.mock.calls[0][0].detail.entityId).toBe('sensor.test');
    });

    it('should use graph_entity for history fetching', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', graph_entity: 'sensor.graph' }],
      });
      await element.updateComplete;
      await element.updateComplete;

      expect(hass.callWS).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'history/history_during_period', entity_ids: ['sensor.graph'] }),
      );
    });

    it('should apply line_glow effect when configured', async () => {
      element.hass = hass;
      element.setConfig({ ...config, line_glow: true, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg, 'SVG element should exist').not.toBeNull();

      const glowOuter = svg?.querySelector('.graph-path-glow-outer');
      const glowInner = svg?.querySelector('.graph-path-glow-inner');
      expect(glowOuter, 'Outer glow path should exist').not.toBeNull();
      expect(glowInner, 'Inner glow path should exist').not.toBeNull();
      expect((glowOuter as HTMLElement)?.style.filter).toContain('blur');
      expect((glowInner as HTMLElement)?.style.filter).toContain('blur');
    });

    it('should not apply line_glow effect by default', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg, 'SVG element should exist').not.toBeNull();

      const glowOuter = svg?.querySelector('.graph-path-glow-outer');
      const glowInner = svg?.querySelector('.graph-path-glow-inner');
      expect(glowOuter, 'Outer glow path should not exist').toBeNull();
      expect(glowInner, 'Inner glow path should not exist').toBeNull();
    });

    it('should render a spline curve by default', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const path = element.shadowRoot?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      // curveBasis (spline) uses cubic Bézier curves, which are represented by 'C' in SVG paths.
      expect(d, 'Path "d" attribute should not be null').not.toBeNull();
      expect(d).toContain('C');
    });

    it('should render a linear curve when configured', async () => {
      element.hass = hass;
      element.setConfig({ ...config, curve: 'linear', hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const path = element.shadowRoot?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      // curveLinear uses straight line segments, which are 'L' commands. It should not use 'C'.
      expect(d, 'Path "d" attribute should not be null').not.toBeNull();
      expect(d).not.toContain('C');
      expect(d).toContain('L');
    });

    it('should render a step curve when configured', async () => {
      element.hass = hass;
      element.setConfig({ ...config, curve: 'step', hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const path = element.shadowRoot?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      // curveStep uses straight line segments, which are 'L' commands. It should not use 'C'.
      expect(d, 'Path "d" attribute should not be null').not.toBeNull();
      expect(d).not.toContain('C');
      expect(d).toContain('L');
    });
  });

  describe('Secondary State Display Feature', () => {
    beforeEach(() => {
      // Set up hass with a main entity and a graph entity
      hass.states['switch.main'] = {
        entity_id: 'switch.main',
        state: 'on',
        attributes: { friendly_name: 'Main Switch' },
      };
      hass.states['sensor.power'] = {
        entity_id: 'sensor.power',
        state: '123.456',
        attributes: { friendly_name: 'Power Sensor', unit_of_measurement: 'W' },
      };
      hass.entities['sensor.power'] = {
        entity_id: 'sensor.power',
        display_precision: 1,
      };
    });

    it('should display secondary state when enabled', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'switch.main',
            graph_entity: 'sensor.power',
            show_graph_entity_state: true,
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const secondaryValue = element.shadowRoot?.querySelector('.secondary-value-inline');
      expect(secondaryValue).not.toBeNull();
      // Note the middle dot and space: "· 123.5 W"
      expect(secondaryValue?.textContent?.trim()).toBe('123.5 W');
    });

    it('should display secondary state in tile_style mode', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        tile_style: true,
        entities: [
          {
            entity: 'switch.main',
            graph_entity: 'sensor.power',
            show_graph_entity_state: true,
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const secondaryValue = element.shadowRoot?.querySelector('.secondary-value');
      expect(secondaryValue).not.toBeNull();
      expect(secondaryValue?.textContent?.trim()).toBe('· 123.5 W');
    });

    it('should not display secondary state when disabled', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'switch.main',
            graph_entity: 'sensor.power',
            // show_graph_entity_state is false by default
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const secondaryValue = element.shadowRoot?.querySelector('.secondary-value');
      expect(secondaryValue).toBeNull();
    });

    it('should display "unavailable" for missing graph_entity', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'switch.main',
            graph_entity: 'sensor.does_not_exist',
            show_graph_entity_state: true,
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const secondaryValue = element.shadowRoot?.querySelector('.secondary-value-inline');
      expect(secondaryValue).not.toBeNull();
      expect(secondaryValue?.textContent?.trim()).toBe('state.default.unavailable'); // No dot for inline secondary state
    });

    it('should not display secondary state if graph_entity is not defined', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'switch.main', show_graph_entity_state: true }],
      });
      element.hass = hass;
      await element.updateComplete;

      const secondaryValue = element.shadowRoot?.querySelector('.secondary-value');
      expect(secondaryValue).toBeNull();
    });
  });

  describe('Independent Extra Value (extra_value_entity)', () => {
    beforeEach(() => {
      hass.states['sensor.temperature'] = {
        entity_id: 'sensor.temperature',
        state: '21.3',
        attributes: { friendly_name: 'Temperature', unit_of_measurement: '°C' },
      };
      hass.states['sensor.humidity'] = {
        entity_id: 'sensor.humidity',
        state: '54.2',
        attributes: { friendly_name: 'Humidity', unit_of_measurement: '%' },
      };
      hass.entities['sensor.humidity'] = {
        entity_id: 'sensor.humidity',
        display_precision: 0,
      };
    });

    it('should display the extra value next to the main value', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue).not.toBeNull();
      expect(extraValue?.textContent?.trim()).toBe('54 %');
    });

    it('should not affect the graphed entity or the click target', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const primaryValue = element.shadowRoot?.querySelector('.primary-value');
      expect(primaryValue?.textContent?.trim()).toBe('21.3 °C');

      const dispatchSpy = vi.spyOn(element, 'dispatchEvent');
      const row = element.shadowRoot?.querySelector('.entity-row') as HTMLElement;
      row.click();
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'hass-more-info',
          detail: { entityId: 'sensor.temperature' },
        }),
      );
    });

    it('should prefix the extra value with a custom label', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
            extra_value_name: 'Humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('Humidity: 54 %');
    });

    it('should use the entity friendly name as label when extra_value_name is true', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
            extra_value_name: true,
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('Humidity: 54 %');
    });

    it('should fall back to the entity id when extra_value_name is true without a friendly name', async () => {
      hass.states['sensor.no_name'] = {
        entity_id: 'sensor.no_name',
        state: '7',
        attributes: {},
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.no_name',
            extra_value_name: true,
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('sensor.no_name: 7');
    });

    it('should keep the label when the extra entity is unavailable', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.does_not_exist',
            extra_value_name: 'Humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('Humidity: state.default.unavailable');
    });

    it('should localize an unknown extra value instead of appending a unit', async () => {
      hass.states['sensor.broken'] = {
        entity_id: 'sensor.broken',
        state: 'unknown',
        attributes: { friendly_name: 'Broken', unit_of_measurement: '%' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.broken',
            extra_value_name: 'Humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('Humidity: state.default.unknown');
    });

    it('should localize an unavailable extra value instead of appending a unit', async () => {
      hass.states['sensor.broken'] = {
        entity_id: 'sensor.broken',
        state: 'unavailable',
        attributes: { friendly_name: 'Broken', unit_of_measurement: '%' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.temperature', extra_value_entity: 'sensor.broken' }],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('state.default.unavailable');
    });

    it('should localize an unknown main value instead of appending a unit', async () => {
      hass.states['sensor.broken'] = {
        entity_id: 'sensor.broken',
        state: 'unknown',
        attributes: { friendly_name: 'Broken', unit_of_measurement: '°C' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.broken' }],
      });
      element.hass = hass;
      await element.updateComplete;

      const primaryValue = element.shadowRoot?.querySelector('.primary-value');
      expect(primaryValue?.textContent?.trim()).toBe('state.default.unknown');
    });

    it('should stack companion values on their own line below the main value', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
            value_label: '(peak)',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      // Line 1 keeps the main value and its label; line 2 carries the companion value.
      const valueLine = element.shadowRoot?.querySelector('.value-line');
      expect(valueLine?.querySelector('.primary-value')).not.toBeNull();
      expect(valueLine?.querySelector('.value-label')).not.toBeNull();
      expect(valueLine?.querySelector('.extra-value')).toBeNull();

      expect(element.shadowRoot?.querySelector('.companion-line .extra-value')).not.toBeNull();
    });

    it('should display the extra value in tile_style mode', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        tile_style: true,
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue?.textContent?.trim()).toBe('· 54 %');
    });

    it('should display the extra value inline on a toggleable row', async () => {
      hass.states['switch.main'] = {
        entity_id: 'switch.main',
        state: 'on',
        attributes: { friendly_name: 'Main Switch' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'switch.main',
            extra_value_entity: 'sensor.humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      // Toggleable rows move the value next to the name and drop the middle dot.
      const extraValue = element.shadowRoot?.querySelector('.extra-value-inline');
      expect(extraValue).not.toBeNull();
      expect(extraValue?.textContent?.trim()).toBe('54 %');
      expect(element.shadowRoot?.querySelector('.extra-value')).toBeNull();
    });

    it('should display "unavailable" for a missing extra_value_entity', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            extra_value_entity: 'sensor.does_not_exist',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue).not.toBeNull();
      expect(extraValue?.textContent?.trim()).toBe('state.default.unavailable');
    });

    it('should not display an extra value when extra_value_entity is not defined', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.temperature' }],
      });
      element.hass = hass;
      await element.updateComplete;

      const extraValue = element.shadowRoot?.querySelector('.extra-value');
      expect(extraValue).toBeNull();
    });

    it('should work together with graph_entity/show_graph_entity_state on the same row', async () => {
      hass.states['sensor.power'] = {
        entity_id: 'sensor.power',
        state: '42',
        attributes: { friendly_name: 'Power', unit_of_measurement: 'W' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.temperature',
            graph_entity: 'sensor.power',
            show_graph_entity_state: true,
            extra_value_entity: 'sensor.humidity',
          },
        ],
      });
      element.hass = hass;
      await element.updateComplete;

      // Both companions share the single line below the main value.
      const companionLine = element.shadowRoot?.querySelector('.companion-line');
      expect(companionLine?.querySelector('.secondary-value')?.textContent?.trim()).toBe('42 W');
      expect(companionLine?.querySelector('.extra-value')?.textContent?.trim()).toBe('54 %');
    });
  });

  describe('Graph Y-axis bounds', () => {
    const Y_AXIS_PADDING_FACTOR = 0.1;
    const historyData = [
      { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '10' }, // min
      { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '20' }, // max
    ];

    beforeEach(() => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });
      config.hours_to_show = 2; // Set a smaller window for predictable downsampling
      config.points_per_hour = 1;
      element.hass = hass;
      vi.useFakeTimers();
    });

    it('should use automatic bounds with padding by default', async () => {
      element.setConfig(config);
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const yDomain = [10, 20];
      const yPadding = (yDomain[1] - yDomain[0]) * Y_AXIS_PADDING_FACTOR;
      const expectedDomain = [yDomain[0] - yPadding, yDomain[1] + yPadding]; // [9, 21]

      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual(expectedDomain);
    });

    it('should use global graph_min and graph_max when set', async () => {
      element.setConfig({ ...config, graph_min: 0, graph_max: 50 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([0, 50]);
    });

    it('should use only global graph_min when set', async () => {
      element.setConfig({ ...config, graph_min: 0 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const yDomain = [0, 20]; // min is overridden
      const yPadding = (yDomain[1] - yDomain[0]) * Y_AXIS_PADDING_FACTOR;
      const expectedDomain = [0, yDomain[1] + yPadding]; // [0, 22]

      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual(expectedDomain);
    });

    it('honours bounds that YAML quoted into strings', async () => {
      // `graph_min: "0"` is legal YAML, and a bare `typeof === 'number'` gate
      // dropped it silently - the graph just kept its automatic bounds.
      element.setConfig({
        ...config,
        graph_min: '0' as unknown as number,
        graph_max: '50' as unknown as number,
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([0, 50]);
    });

    it('honours a per-entity bound the visual editor stored as a string', async () => {
      // What the per-entity handler wrote before it read the `type` attribute.
      element.setConfig({
        ...config,
        entities: [
          {
            entity: 'sensor.test',
            overwrite_graph_appearance: true,
            graph_min: '5' as unknown as number,
            graph_max: '25' as unknown as number,
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([5, 25]);
    });

    it('should use per-entity bounds which override global bounds', async () => {
      element.setConfig({
        ...config,
        graph_min: 0,
        graph_max: 50,
        entities: [
          {
            entity: 'sensor.test',
            overwrite_graph_appearance: true,
            graph_min: 5,
            graph_max: 25,
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([5, 25]);
    });

    it('should not apply padding when both bounds are fixed', async () => {
      element.setConfig({
        ...config,
        graph_min: 0,
        graph_max: 50,
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      // The domain should be exactly [0, 50], not [0 - padding, 50 + padding]
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([0, 50]);
    });
  });

  describe('Downsampling Logic (downsampleHistory)', () => {
    const hoursToShow = 2;
    const pointsPerHour = 2;
    const mockNow = new Date('2023-01-01T12:00:00Z');
    const startTime = new Date(mockNow.getTime() - hoursToShow * 3600 * 1000); // 10:00:00Z

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return raw states if pointsPerHour is 0 or less', () => {
      const rawStates = [
        { timestamp: new Date('2023-01-01T11:00:00Z'), value: 10 },
        { timestamp: new Date('2023-01-01T11:30:00Z'), value: 20 },
      ];
      const result = downsampleHistory(rawStates, hoursToShow, 0);
      expect(result).toEqual(rawStates);
      const resultNegative = downsampleHistory(rawStates, hoursToShow, -1);
      expect(resultNegative).toEqual(rawStates);
    });

    it('should correctly calculate time-weighted average for buckets', () => {
      // Bucket 1 (10:00-10:30): value 10 for 30 mins. Avg: 10.
      // Bucket 2 (10:30-11:00): value 20 for 30 mins. Avg: 20.
      // Bucket 3 (11:00-11:30): value 30 for 30 mins. Avg: 30.
      // Bucket 4 (11:30-12:00): value 40 for 30 mins. Avg: 40.
      const states = [
        { timestamp: startTime, value: 5 }, // Start time state
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 10 }, // Bucket 1 (10:00-10:30)
        { timestamp: new Date('2023-01-01T10:45:00Z'), value: 20 }, // Bucket 2 (10:30-11:00)
        { timestamp: new Date('2023-01-01T11:15:00Z'), value: 30 }, // Bucket 3 (11:00-11:30)
        { timestamp: new Date('2023-01-01T11:45:00Z'), value: 40 }, // Bucket 4 (11:30-12:00)
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ timestamp: startTime, value: 5 });
      expect(result[1].value).toBeCloseTo(7.5); // (5*15 + 10*15)/30
      expect(result[2].value).toBeCloseTo(15); // (10*15 + 20*15)/30
      expect(result[3].value).toBeCloseTo(25); // (20*15 + 30*15)/30
      expect(result[4].value).toBeCloseTo(35); // (30*15 + 40*15)/30
    });

    it('should correctly weight a short spike in a bucket', () => {
      // Bucket 1 (10:00-10:30): value 10 for 29 mins, 1000 for 1 min.
      const states = [
        { timestamp: startTime, value: 5 },
        { timestamp: new Date('2023-01-01T10:00:00Z'), value: 10 },
        { timestamp: new Date('2023-01-01T10:29:00Z'), value: 1000 }, // Spike for 1 minute
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      // Weighted average: ((10 * 29) + (1000 * 1)) / 30 = 1290 / 30 = 43
      expect(result[1].value).toBeCloseTo(43);
      // The rest of the buckets should hold the last value
      expect(result[2].value).toBe(1000);
      expect(result[3].value).toBe(1000);
      expect(result[4].value).toBe(1000);
    });

    it('should carry forward the last known value for empty buckets', () => {
      const states = [
        { timestamp: startTime, value: 5 },
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 10 }, // Bucket 1 (10:00-10:30)
        // Bucket 2 (10:30-11:00) is empty
        { timestamp: new Date('2023-01-01T11:15:00Z'), value: 30 }, // Bucket 3 (11:00-11:30)
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result).toHaveLength(5);
      // Bucket 1 has weighted average of 5 and 10
      expect(result[1].value).toBeCloseTo(7.5);
      // Bucket 2 is empty, should carry forward value 10
      expect(result[2].value).toBe(10);
      // Bucket 3 has weighted average of 10 and 30
      expect(result[3].value).toBeCloseTo(20);
      // Bucket 4 is empty, should carry forward value 30
      expect(result[4].value).toBe(30);
    });

    it('should correctly handle a short, high-value spike (e.g., illuminance)', () => {
      // Simulates a sensor that is 0 for a long time, spikes to 50000 for 10 seconds, then returns to 0.
      const states = [
        { timestamp: startTime, value: 0 }, // 10:00:00
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 0 },
        { timestamp: new Date('2023-01-01T10:15:10Z'), value: 50000 }, // 10-second spike
        { timestamp: new Date('2023-01-01T10:15:20Z'), value: 0 },
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      // Bucket 1 (10:00-10:30): Contains the spike.
      // The bucket is 30 minutes (1800 seconds) long.
      // Value is 0 for (1800 - 10) seconds and 50000 for 10 seconds.
      // Weighted average: (50000 * 10) / 1800 = 500000 / 1800 ≈ 277.77
      expect(result[1].value).toBeCloseTo(277.78);

      // Subsequent buckets should be 0, as the value returned to 0.
      expect(result[2].value).toBe(0);
    });

    it('should return an empty array when no history is provided', () => {
      const states: { timestamp: Date; value: number }[] = [];
      const result = downsampleHistory(states, hoursToShow, pointsPerHour);
      expect(result).toEqual([]);
    });

    it('should emit NaN for a bucket mostly spent in an invalid state', () => {
      const states = [
        { timestamp: startTime, value: 5 }, // 10:00
        { timestamp: new Date('2023-01-01T10:10:00Z'), value: NaN }, // unavailable from 10:10
        { timestamp: new Date('2023-01-01T10:40:00Z'), value: 20 }, // recovers at 10:40
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      // Bucket 1 (10:00-10:30): 10 min valid, 20 min invalid → gap.
      expect(result[1].value).toBeNaN();
      // Bucket 2 (10:30-11:00): 10 min invalid, 20 min valid → average of the valid part only.
      expect(result[2].value).toBeCloseTo(20);
      expect(result[3].value).toBe(20);
    });

    it('should ignore a minority sliver of invalid time in a bucket', () => {
      const states = [
        { timestamp: startTime, value: 10 }, // 10:00
        { timestamp: new Date('2023-01-01T10:25:00Z'), value: NaN }, // only the last 5 min of bucket 1
        { timestamp: new Date('2023-01-01T10:30:00Z'), value: 12 },
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      // 25 min valid vs 5 min invalid → no gap, average taken from the valid part.
      expect(result[1].value).toBeCloseTo(10);
      expect(result[2].value).toBeCloseTo(12);
    });

    it('should emit consecutive NaN buckets for a multi-bucket outage and recover after it', () => {
      const states = [
        { timestamp: startTime, value: 5 }, // 10:00
        { timestamp: new Date('2023-01-01T10:10:00Z'), value: NaN }, // unavailable for ~90 min
        { timestamp: new Date('2023-01-01T11:40:00Z'), value: 40 },
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result[0]).toEqual({ timestamp: startTime, value: 5 });
      expect(result[1].value).toBeNaN(); // 10:00-10:30, mostly invalid
      expect(result[2].value).toBeNaN(); // 10:30-11:00, fully invalid
      expect(result[3].value).toBeNaN(); // 11:00-11:30, fully invalid
      expect(result[4].value).toBeCloseTo(40); // 11:30-12:00, 20 of 30 min valid
    });

    it('should produce a NaN anchor when the window opens mid-outage', () => {
      const states = [
        { timestamp: startTime, value: NaN }, // already unavailable at 10:00
        { timestamp: new Date('2023-01-01T11:00:00Z'), value: 30 },
      ];

      const result = downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result[0].value).toBeNaN();
      expect(result[1].value).toBeNaN();
      expect(result[2].value).toBeNaN();
      expect(result[3].value).toBe(30);
      expect(result[4].value).toBe(30);
    });

    it('should downsample a week of dense data in one pass', () => {
      // A sample every 10s for a week - 60k states over 2016 buckets. The old
      // implementation walked every state for every bucket and needed roughly a
      // second per entity for exactly this shape of data; the budget here is
      // deliberately far above the one-pass cost and far below the quadratic one.
      vi.useRealTimers();
      const hours = 168;
      const perHour = 12;
      const now = Date.now();
      const dense: { timestamp: Date; value: number }[] = [];
      for (let t = now - hours * 3600 * 1000; t <= now; t += 10_000) {
        dense.push({ timestamp: new Date(t), value: 20 + Math.sin(t / 1e6) * 5 });
      }

      const started = performance.now();
      const result = downsampleHistory(dense, hours, perHour);
      const elapsed = performance.now() - started;

      expect(result).toHaveLength(hours * perHour + 1);
      expect(result.every((point) => Number.isFinite(point.value))).toBe(true);
      expect(elapsed).toBeLessThan(250);
    });
  });

  describe('Gaps for unavailable states (show_gaps)', () => {
    const mockNow = new Date('2023-01-01T12:00:00Z');

    // At hours_to_show: 2 / points_per_hour: 2 this yields four 30-minute buckets:
    //   bucket 1 (10:00-10:30): 10 for 10 min, 12 for 20 min       → 11.33
    //   bucket 2 (10:30-11:00): 10 min valid, 20 min unavailable    → gap
    //   bucket 3 (11:00-11:30): 20 min unavailable, 10 min valid    → gap
    //   bucket 4 (11:30-12:00): 20 for 10 min, 22 for 20 min        → 21.33
    const buildHistory = (): { lu: number; s: string }[] => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      return [
        { lu: startTime.getTime() / 1000, s: '10' },
        { lu: new Date('2023-01-01T10:10:00Z').getTime() / 1000, s: '12' },
        { lu: new Date('2023-01-01T10:40:00Z').getTime() / 1000, s: 'unavailable' },
        { lu: new Date('2023-01-01T11:20:00Z').getTime() / 1000, s: '20' },
        { lu: new Date('2023-01-01T11:40:00Z').getTime() / 1000, s: '22' },
      ];
    };

    const gapConfig = { hours_to_show: 2, points_per_hour: 2, curve: 'linear' as const };

    const renderPath = async (extraConfig: Partial<BackgroundGraphEntitiesConfig>): Promise<Element | null> => {
      element.hass = hass;
      element.setConfig({ ...config, ...gapConfig, ...extraConfig });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;
      return element.shadowRoot?.querySelector('.graph-path') ?? null;
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should break the line into separate segments when show_gaps is enabled', async () => {
      const path = await renderPath({ show_gaps: true });

      expect(path, 'Graph path should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      expect(d).not.toBeNull();
      // Each contiguous run of defined points starts a new "moveto" command.
      expect(d?.match(/M/g)).toHaveLength(2);
    });

    it('should draw one continuous line for the same history by default', async () => {
      const path = await renderPath({});

      expect(path, 'Graph path should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      expect(d).not.toBeNull();
      expect(d?.match(/M/g)).toHaveLength(1);
    });

    it('should break the glow paths at the same gaps', async () => {
      await renderPath({ show_gaps: true, line_glow: true });

      const glowOuter = element.shadowRoot?.querySelector('.graph-path-glow-outer');
      const glowInner = element.shadowRoot?.querySelector('.graph-path-glow-inner');
      expect(glowOuter?.getAttribute('d')?.match(/M/g)).toHaveLength(2);
      expect(glowInner?.getAttribute('d')?.match(/M/g)).toHaveLength(2);
    });

    it('should render no graph at all when the entity was never available', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      (hass.callWS as Mock).mockResolvedValue({
        'sensor.test': [
          { lu: startTime.getTime() / 1000, s: 'unavailable' },
          { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: 'unknown' },
        ],
      });

      const path = await renderPath({ show_gaps: true });

      expect(path, 'No path should be drawn for an all-gap series').toBeNull();
      expect(element.shadowRoot?.querySelector('svg'), 'No svg should be created').toBeNull();
    });

    it('should still resolve value_source from the valid samples only', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        ...gapConfig,
        show_gaps: true,
        entities: [{ entity: 'sensor.test', value_source: 'max' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Max of the finite raw samples (10, 12, 20, 22) — the gap markers are ignored.
      expect(element.shadowRoot?.querySelector('.primary-value')?.textContent).toContain('22');
    });

    it('should not render edit-mode dots for gap markers', async () => {
      element.editMode = true;
      await renderPath({ show_gaps: true });

      const dots = element.shadowRoot?.querySelectorAll('.graph-dot');
      expect(dots?.length).toBeGreaterThan(0);
      dots?.forEach((dot) => {
        expect(Number(dot.getAttribute('cy'))).not.toBeNaN();
      });
    });
  });

  describe('Auto Icon Color Feature', () => {
    const mockNow = new Date('2023-01-01T11:30:00Z');

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should color the icon using the threshold matching the last data point', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '60' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 50, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(255, 0, 0)');
    });

    it('should fall back to icon_color when no history is available', async () => {
      (hass.callWS as Mock).mockResolvedValue({});

      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            icon_color: '#abcdef',
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: #abcdef');
    });

    it('should override explicit icon_color when data is available', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '60' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            icon_color: '#000000',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 50, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(255, 0, 0)');
    });

    it('should not apply auto color when auto_icon_color is disabled', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '60' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            icon_color: '#123456',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 50, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: #123456');
    });

    it('should color the icon using global thresholds when no entity overrides are present', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '60' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        color_thresholds: [
          { value: 0, color: '#00ff00' },
          { value: 50, color: '#ff0000' },
        ],
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(255, 0, 0)');
    });
  });

  describe('Value Source / Label Feature', () => {
    const mockNow = new Date('2023-01-01T11:30:00Z');

    // History yielding distinct latest/max/min after downsampling at 1 point/hour:
    //   bucket 1 (09:30-10:30): start=30 for 30min then 100 for 30min → 65
    //   bucket 2 (10:30-11:30): 100 for 30min then 10 for 30min → 55
    // Final downsampled history: [30, 65, 55] → max 65, min 30, latest 55.
    const buildHistory = (): { lu: number; s: string }[] => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      return [
        { lu: startTime.getTime() / 1000, s: '30' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '100' },
        { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '10' },
      ];
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should display the max history value when value_source is max', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'max' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('100');
    });

    it('should display the min history value when value_source is min', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'min' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('10');
    });

    it('should display the average history value when value_source is avg', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'avg' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Downsampled history [30, 65, 55] → mean = 50.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('50');
    });

    it('should display the median history value when value_source is median', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'median' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Downsampled history [30, 65, 55] → sorted [30, 55, 65] → median = 55.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('55');
    });

    it('should display the value_label after the primary value', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'max', value_label: '(peak)' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.value-label');
      expect(label).not.toBeNull();
      expect(label?.textContent).toBe('(peak)');
    });

    it('should infer precision from the current state string when display_precision is unset', async () => {
      // sensor reports one decimal; max from history should also render one decimal
      hass.states['sensor.temp'] = {
        entity_id: 'sensor.temp',
        state: '20.0',
        attributes: { friendly_name: 'Temp', unit_of_measurement: '°C' },
      };
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '20.0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '23.456' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.temp': historyData });

      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.temp', value_source: 'max' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      // Inferred precision = 1 (from "20.0"); raw max ~21.7 should render with 1 decimal
      expect(primary?.textContent).toMatch(/^\d+\.\d °C$/);
    });

    it('should fall back to current state when history is empty', async () => {
      (hass.callWS as Mock).mockResolvedValue({});

      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_source: 'max' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('123');
    });

    it('should ignore value_source for boolean/toggleable entities', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'switch.test', value_source: 'max', value_label: '(peak)' }],
      });
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.value-label');
      expect(label).toBeNull();
    });

    it('should ignore value_source when graph_entity differs from main entity', async () => {
      hass.states['sensor.power'] = {
        entity_id: 'sensor.power',
        state: '7',
        attributes: { friendly_name: 'Power', unit_of_measurement: 'W' },
      };
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.power': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            graph_entity: 'sensor.power',
            value_source: 'max',
            value_label: '(peak)',
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent).toContain('123');
      const label = element.shadowRoot?.querySelector('.value-label');
      expect(label).toBeNull();
    });
  });

  describe('History Aggregate Memoization', () => {
    // The memo is internal; reach in to prove scans don't repeat.
    interface Series {
      raw: { timestamp: Date; value: number }[];
      downsampled: { timestamp: Date; value: number }[];
    }
    interface PickAccess {
      _pickHistoryValue(h: Series | undefined, source: string, t?: (x: number) => number): number | undefined;
    }

    const buildSeries = (): Series => ({
      raw: [10, 50, 30].map((value, i) => ({ timestamp: new Date(i * 1000), value })),
      downsampled: [20, 40].map((value, i) => ({ timestamp: new Date(i * 1000), value })),
    });

    it('computes an aggregate once per series and serves repeats from the cache', () => {
      const el = element as unknown as PickAccess;
      const series = buildSeries();
      let calls = 0;
      const transform = (x: number) => {
        calls++;
        return x * 2;
      };
      expect(el._pickHistoryValue(series, 'max', transform)).toBe(100);
      expect(calls).toBe(3); // one transform call per raw sample
      expect(el._pickHistoryValue(series, 'max', transform)).toBe(100);
      expect(calls).toBe(3); // cached: no rescan
    });

    it('keeps separate entries per source and per transform on a shared series', () => {
      const el = element as unknown as PickAccess;
      const series = buildSeries();
      const double = (x: number) => x * 2;
      const negate = (x: number) => 0 - x;
      expect(el._pickHistoryValue(series, 'max', double)).toBe(100);
      expect(el._pickHistoryValue(series, 'max', negate)).toBe(-10);
      expect(el._pickHistoryValue(series, 'min', double)).toBe(20);
      expect(el._pickHistoryValue(series, 'latest', double)).toBe(80); // downsampled tail
      expect(el._pickHistoryValue(series, 'max')).toBe(50); // untransformed entry
      // The earlier entries must not have been overwritten.
      expect(el._pickHistoryValue(series, 'max', double)).toBe(100);
    });

    it('recomputes when the series object is replaced, as a fetch does', () => {
      const el = element as unknown as PickAccess;
      let calls = 0;
      const transform = (x: number) => {
        calls++;
        return x * 2;
      };
      expect(el._pickHistoryValue(buildSeries(), 'max', transform)).toBe(100);
      expect(el._pickHistoryValue(buildSeries(), 'max', transform)).toBe(100);
      expect(calls).toBe(6); // fresh object → fresh scan
    });

    it('caches an undefined result for an empty series', () => {
      const el = element as unknown as PickAccess;
      const empty: Series = { raw: [], downsampled: [] };
      expect(el._pickHistoryValue(empty, 'max')).toBeUndefined();
      expect(el._pickHistoryValue(empty, 'max')).toBeUndefined();
      expect(el._pickHistoryValue(undefined, 'max')).toBeUndefined();
    });
  });

  describe('Value Transform / Unit Override Feature', () => {
    const mockNow = new Date('2023-01-01T11:30:00Z');

    // Same history as the Value Source block: raw values [30, 100, 10],
    // downsampled at 1 point/hour → [30, 65, 55].
    const buildHistory = (): { lu: number; s: string }[] => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      return [
        { lu: startTime.getTime() / 1000, s: '30' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '100' },
        { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '10' },
      ];
    };

    const transformWarnings = (spy: ReturnType<typeof vi.spyOn>): unknown[][] =>
      spy.mock.calls.filter((call: unknown[]) => String(call[0]).includes('value_transform'));

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should apply value_transform to the displayed latest value and keep the entity unit', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x * 2' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('246 °C');
    });

    it('should apply the unit override with precision inferred from the raw state string', async () => {
      hass.states['sensor.wan'] = {
        entity_id: 'sensor.wan',
        state: '12.5',
        attributes: { friendly_name: 'WAN', unit_of_measurement: 'kB/s' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.wan', value_transform: 'x * 8', value_unit: 'kb/s' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Precision comes from the raw state "12.5" (1 decimal), not the transformed number.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('100.0 kb/s');
    });

    it('should apply the transform before max aggregation', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'max', value_transform: 'x * 2' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Raw history [30, 100, 10] × 2 → max 200.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('200 °C');
    });

    it('should aggregate over transformed samples for a decreasing transform', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_source: 'max', value_transform: '0 - x' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Raw [30, 100, 10] → [-30, -100, -10]: the max is -10, not the
      // transformed raw max (-100). Proves transform-then-aggregate.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('-10 °C');
    });

    it('should scale the graph y-domain by the transform', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test', value_transform: 'x * 8' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      // Downsampled [30, 65, 55] × 8 → extent [240, 520], 10% padding → [212, 548].
      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([212, 548]);
    });

    it('should evaluate auto_icon_color thresholds in transformed units', async () => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      const historyData = [
        { lu: startTime.getTime() / 1000, s: '0' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '60' },
      ];
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': historyData });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        color_thresholds: [
          { value: 0, color: '#00ff00' },
          { value: 100, color: '#ff0000' },
        ],
        entities: [{ entity: 'sensor.test', auto_icon_color: true, value_transform: 'x * 2' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      // Latest downsampled value 60 × 2 = 120 ≥ threshold 100 → pure red.
      // Untransformed 60 would interpolate between green and red instead.
      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(255, 0, 0)');
    });

    it('should sort by transformed value', async () => {
      hass.states['sensor.temp_a'] = {
        entity_id: 'sensor.temp_a',
        state: '15.5',
        attributes: { friendly_name: 'Z Temperature' },
      };
      hass.states['sensor.temp_b'] = {
        entity_id: 'sensor.temp_b',
        state: '35.2',
        attributes: { friendly_name: 'A Temperature' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.temp_a', value_transform: 'x * 10' }, 'sensor.temp_b'],
        sort: { method: 'value', numeric: true, reverse: false },
      });
      await element.updateComplete;

      // 15.5 × 10 = 155 outranks 35.2, inverting the raw order.
      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      expect(names).toEqual(['A Temperature', 'Z Temperature']);
    });

    it('should include transformed values and overridden units in the title average', async () => {
      hass.states['sensor.test1'] = {
        entity_id: 'sensor.test1',
        state: '10',
        attributes: { unit_of_measurement: 'kB/s' },
      };
      hass.states['sensor.test2'] = {
        entity_id: 'sensor.test2',
        state: '20',
        attributes: { unit_of_measurement: 'kb/s' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test1', value_transform: 'x * 8', value_unit: 'kb/s' }, 'sensor.test2'],
        average_in_title: true,
      });
      await element.updateComplete;

      // (10 × 8 + 20) / 2 = 50; the override makes both units kb/s, so it's shown.
      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('50 kb/s');
    });

    it('should key the minutes formatting off the effective unit', async () => {
      hass.states['sensor.duration_s'] = {
        entity_id: 'sensor.duration_s',
        state: '4500',
        attributes: { unit_of_measurement: 's' },
      };
      hass.states['sensor.duration_min'] = {
        entity_id: 'sensor.duration_min',
        state: '75',
        attributes: { unit_of_measurement: 'min' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          // Overriding *to* min opts into hours/minutes formatting of the transformed number
          { entity: 'sensor.duration_s', value_transform: 'x / 60', value_unit: 'min' },
          // Overriding *away* from min opts out of it
          { entity: 'sensor.duration_min', value_unit: 'm' },
        ],
      });
      await element.updateComplete;

      const values = Array.from(element.shadowRoot?.querySelectorAll('.primary-value') || []).map((el) =>
        el.textContent?.trim(),
      );
      expect(values).toEqual(['1h 15min', '75 m']);
    });

    it('should fall back untransformed and warn once for a throwing expression', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x.foo.bar' }],
      });
      await element.updateComplete;

      // Force additional renders; the warning must not repeat.
      element.hass = { ...hass };
      await element.updateComplete;
      element.hass = { ...hass };
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('123 °C');
      expect(transformWarnings(warnSpy)).toHaveLength(1);
      warnSpy.mockRestore();
    });

    it('should warn once at setConfig and ignore a non-compiling expression', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x ***' }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('123 °C');
      const warnings = transformWarnings(warnSpy);
      expect(warnings).toHaveLength(1);
      expect(String(warnings[0][0])).toContain('invalid value_transform');
      warnSpy.mockRestore();
    });

    it('should suppress the unit override when the transform is broken', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          // compile failure and runtime failure must both fall back to the raw
          // value AND the raw unit — never '123 Mb/s'
          { entity: 'sensor.test', value_transform: 'x @@@', value_unit: 'Mb/s' },
          { entity: 'sensor.test', value_transform: 'x.oops.deep', value_unit: 'Mb/s' },
        ],
      });
      await element.updateComplete;

      const values = Array.from(element.shadowRoot?.querySelectorAll('.primary-value') || []).map((el) =>
        el.textContent?.trim(),
      );
      expect(values).toEqual(['123 °C', '123 °C']);
      warnSpy.mockRestore();
    });

    it('should apply a transform ending in a line comment', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x * 8 // to bits' }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('984 °C');
    });

    it('should add decimals for magnitude-reducing transforms', async () => {
      hass.states['sensor.wan_up'] = {
        entity_id: 'sensor.wan_up',
        state: '50',
        attributes: { friendly_name: 'Upload', unit_of_measurement: 'kB/s' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.wan_up', value_transform: 'x / 125', value_unit: 'Mb/s' }],
      });
      await element.updateComplete;

      // Raw-string inference alone would give precision 0 → '0 Mb/s'.
      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('0.40 Mb/s');
    });

    it('should render an extremely small transformed value without throwing', async () => {
      hass.states['sensor.wan_up'] = {
        entity_id: 'sensor.wan_up',
        state: '50',
        attributes: { friendly_name: 'Upload', unit_of_measurement: 'kB/s' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        // Unclamped, the inferred precision would be 122 — past Intl.NumberFormat's
        // 100-digit ceiling, which throws and takes the whole row down.
        entities: [{ entity: 'sensor.wan_up', value_transform: 'x * 1e-123', value_unit: 'Mb/s' }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('0.00000000000000000000 Mb/s');
    });

    it('should exclude broken transforms from the title average', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      hass.states['sensor.test1'] = {
        entity_id: 'sensor.test1',
        state: '10',
        attributes: { unit_of_measurement: 'kB/s' },
      };
      hass.states['sensor.test2'] = {
        entity_id: 'sensor.test2',
        state: '20',
        attributes: { unit_of_measurement: 'Mb/s' },
      };
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test1', value_transform: 'x @@@', value_unit: 'Mb/s' }, 'sensor.test2'],
        average_in_title: true,
      });
      await element.updateComplete;

      // The raw kB/s value must not be averaged under the Mb/s label.
      const header = element.shadowRoot?.querySelector('.card-header');
      expect(header?.querySelector('.value')?.textContent?.trim()).toBe('20 Mb/s');
      warnSpy.mockRestore();
    });

    it('should give duplicate rows their own gradient', async () => {
      // Ids are document-wide, so a shared id makes the second row paint itself
      // with the first row's thresholds.
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#ff0000' },
              { value: 100, color: '#00ff00' },
            ],
          },
          {
            entity: 'sensor.test',
            name: 'Same entity again',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#0000ff' },
              { value: 100, color: '#ffff00' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const gradients = element.shadowRoot?.querySelectorAll('defs > *') as unknown as SVGGradientElement[];
      expect(gradients).toHaveLength(2);
      const ids = [...gradients].map((gradient) => gradient.getAttribute('id')!);
      expect(new Set(ids).size).toBe(2);

      const paths = element.shadowRoot?.querySelectorAll('path.graph-path');
      expect(paths).toHaveLength(2);
      expect(paths?.[0].getAttribute('stroke')).toBe(`url(#${ids[0]})`);
      expect(paths?.[1].getAttribute('stroke')).toBe(`url(#${ids[1]})`);

      const stopColors = (gradient: Element): (string | null)[] =>
        [...gradient.children].map((stop) => stop.getAttribute('stop-color'));
      const firstStops = stopColors(gradients[0]);
      const secondStops = stopColors(gradients[1]);
      expect(firstStops).toEqual(['#ff0000', '#00ff00']);
      expect(secondStops).toEqual(['#0000ff', '#ffff00']);
    });

    it('should apply each duplicate row its own transform to the graph', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [{ entity: 'sensor.test' }, { entity: 'sensor.test', value_transform: 'x * 8' }],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      // The last-rendered graph belongs to the second row; with find-by-id it
      // would wrongly use the first (untransformed) config → domain [9.5, 68.5].
      expect(scaleLinear).toHaveBeenCalled();
      const lastCall = vi.mocked(scaleLinear).mock.results.slice(-1)[0].value;
      expect(lastCall.domain()).toEqual([212, 548]);
    });

    it('should apply extra_value_transform and extra_value_unit independently of the row transform', async () => {
      hass.states['sensor.humidity'] = {
        entity_id: 'sensor.humidity',
        state: '45',
        attributes: { friendly_name: 'Humidity', unit_of_measurement: '%' },
      };
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          {
            entity: 'sensor.test',
            value_transform: 'x * 10',
            extra_value_entity: 'sensor.humidity',
            extra_value_name: 'Hum',
            extra_value_transform: 'x * 2',
            extra_value_unit: 'X',
          },
        ],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('1,230 °C');
      const extra = element.shadowRoot?.querySelector('.extra-value');
      expect(extra?.textContent?.trim()).toBe('Hum: 90 X');
    });

    it('should fall back to the raw extra value when its transform is broken', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      hass.states['sensor.humidity'] = {
        entity_id: 'sensor.humidity',
        state: '45',
        attributes: { friendly_name: 'Humidity', unit_of_measurement: '%' },
      };
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          {
            entity: 'sensor.test',
            extra_value_entity: 'sensor.humidity',
            extra_value_transform: 'x @@@',
            extra_value_unit: 'X',
          },
        ],
      });
      await element.updateComplete;

      // Raw value AND raw unit — never '45 X'.
      const extra = element.shadowRoot?.querySelector('.extra-value');
      expect(extra?.textContent?.trim()).toBe('45 %');
      warnSpy.mockRestore();
    });

    it('should add decimals for magnitude-reducing extra value transforms', async () => {
      hass.states['sensor.wan_e'] = {
        entity_id: 'sensor.wan_e',
        state: '50',
        attributes: { unit_of_measurement: 'kB/s' },
      };
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          {
            entity: 'sensor.test',
            extra_value_entity: 'sensor.wan_e',
            extra_value_transform: 'x / 125',
            extra_value_unit: 'Mb/s',
          },
        ],
      });
      await element.updateComplete;

      const extra = element.shadowRoot?.querySelector('.extra-value');
      expect(extra?.textContent?.trim()).toBe('0.40 Mb/s');
    });

    it('should suppress the unit when value_unit is false', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x * 2', value_unit: false }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('246');
    });

    it('should suppress the extra value unit when extra_value_unit is false', async () => {
      hass.states['sensor.humidity'] = {
        entity_id: 'sensor.humidity',
        state: '45',
        attributes: { unit_of_measurement: '%' },
      };
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', extra_value_entity: 'sensor.humidity', extra_value_unit: false }],
      });
      await element.updateComplete;

      const extra = element.shadowRoot?.querySelector('.extra-value');
      expect(extra?.textContent?.trim()).toBe('45');
    });

    it('should accept a transform pasted with surrounding quotes', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: "'x * 2'" }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('246 °C');
    });

    it('should leave special states untouched', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      hass.states['sensor.test'].state = 'unavailable';
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', value_transform: 'x * 8' }],
      });
      await element.updateComplete;

      const primary = element.shadowRoot?.querySelector('.primary-value');
      expect(primary?.textContent?.trim()).toBe('state.default.unavailable');
      expect(transformWarnings(warnSpy)).toHaveLength(0);
      warnSpy.mockRestore();
    });
  });

  describe('Auto Icon Color Source Option', () => {
    const mockNow = new Date('2023-01-01T11:30:00Z');

    // Same downsampled history as above: max 65, min 30, latest 55.
    // With thresholds {0: green, 60: red}: max=65 → red, min=30 → green, latest=55 → green.
    const buildHistory = (): { lu: number; s: string }[] => {
      const startTime = new Date(mockNow.getTime() - 2 * 3600 * 1000);
      return [
        { lu: startTime.getTime() / 1000, s: '30' },
        { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '100' },
        { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '10' },
      ];
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should color the icon using the max-of-history threshold', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            auto_icon_color_source: 'max',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 60, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(255, 0, 0)');
    });

    it('should color the icon using the min-of-history threshold', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            auto_icon_color_source: 'min',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 60, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toBe('color: rgb(43, 213, 0)');
    });

    it('should color the icon using the avg-of-history threshold', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            auto_icon_color_source: 'avg',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 60, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toContain('rgb(213, 43, 0)');
    });

    it('should color the icon using the median-of-history threshold', async () => {
      (hass.callWS as Mock).mockResolvedValue({ 'sensor.test': buildHistory() });

      element.hass = hass;
      element.setConfig({
        ...config,
        hours_to_show: 2,
        points_per_hour: 1,
        entities: [
          {
            entity: 'sensor.test',
            auto_icon_color: true,
            auto_icon_color_source: 'median',
            overwrite_graph_appearance: true,
            color_thresholds: [
              { value: 0, color: '#00ff00' },
              { value: 60, color: '#ff0000' },
            ],
          },
        ],
      });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('ha-state-icon');
      expect(icon?.getAttribute('style')).toContain('rgb(234, 21, 0)');
    });
  });

  describe('Hide Icon Feature', () => {
    it('should show icons by default', async () => {
      element.hass = hass;
      element.setConfig(config);
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row');
      expect(row?.classList.contains('no-icon')).toBe(false);
      expect(row?.querySelector('ha-state-icon')).not.toBeNull();
    });

    it('should hide icons when show_icon is false globally', async () => {
      element.hass = hass;
      element.setConfig({ ...config, show_icon: false });
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row');
      expect(row?.classList.contains('no-icon')).toBe(true);
      expect(row?.querySelector('ha-state-icon')).toBeNull();
    });

    it('should hide icons for specific entities', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [
          { entity: 'sensor.test', show_icon: false },
          { entity: 'sensor.show', show_icon: true },
        ],
      });
      // Add sensor.show to hass
      hass.states['sensor.show'] = {
        entity_id: 'sensor.show',
        state: '456',
        attributes: { friendly_name: 'Show Sensor' },
      };
      await element.updateComplete;

      const rows = element.shadowRoot?.querySelectorAll('.entity-row');
      expect(rows).toHaveLength(2);

      expect(rows?.[0].classList.contains('no-icon')).toBe(true);
      expect(rows?.[0].querySelector('ha-state-icon')).toBeNull();

      expect(rows?.[1].classList.contains('no-icon')).toBe(false);
      expect(rows?.[1].querySelector('ha-state-icon')).not.toBeNull();
    });

    it('should hide icon for unavailable entities when show_icon is false', async () => {
      element.hass = hass;
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.unavailable', show_icon: false }],
      });
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row.unavailable');
      expect(row).not.toBeNull();
      expect(row?.classList.contains('no-icon')).toBe(true);
      expect(row?.querySelector('ha-icon')).toBeNull();
    });
  });

  describe('Entity Sorting Feature', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      hass.states['sensor.temp_a'] = {
        entity_id: 'sensor.temp_a',
        state: '15.5',
        attributes: { friendly_name: 'Z Temperature' },
      };
      hass.states['sensor.temp_b'] = {
        entity_id: 'sensor.temp_b',
        state: '35.2',
        attributes: { friendly_name: 'A Temperature' },
      };
      hass.states['sensor.temp_c'] = {
        entity_id: 'sensor.temp_c',
        state: 'unavailable',
        attributes: { friendly_name: 'B Temperature' },
      };
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should sort by name ascending, regardless of availability', async () => {
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.temp_a', 'sensor.temp_b', 'sensor.temp_c'],
        sort: { method: 'name', reverse: false },
      });
      await element.updateComplete;

      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      // A Temperature first, B Temperature (unavailable) second, Z Temperature third
      expect(names).toEqual(['A Temperature', 'B Temperature', 'Z Temperature']);
    });

    it('should sort by name descending, regardless of availability', async () => {
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.temp_a', 'sensor.temp_b', 'sensor.temp_c'],
        sort: { method: 'name', reverse: true },
      });
      await element.updateComplete;

      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      // Z Temperature first, B Temperature (unavailable) second, A Temperature third
      expect(names).toEqual(['Z Temperature', 'B Temperature', 'A Temperature']);
    });

    it('should sort by numeric state ascending, with unavailable at the bottom', async () => {
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.temp_a', 'sensor.temp_b', 'sensor.temp_c'],
        sort: { method: 'state', numeric: true, reverse: false },
      });
      await element.updateComplete;

      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      // 15.5 (Z Temp) first, 35.2 (A Temp) second, unavailable (B Temp) last
      expect(names).toEqual(['Z Temperature', 'A Temperature', 'B Temperature']);
    });

    it('should sort by numeric state descending, with unavailable at the bottom', async () => {
      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.temp_a', 'sensor.temp_b', 'sensor.temp_c'],
        sort: { method: 'state', numeric: true, reverse: true },
      });
      await element.updateComplete;

      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      // 35.2 (A Temp) first, 15.5 (Z Temp) second, unavailable last
      expect(names).toEqual(['A Temperature', 'Z Temperature', 'B Temperature']);
    });

    it('should sort by value taking value_source into account', async () => {
      // Setup history so that sensor.temp_a has latest=15.5, max=50 after downsampling
      // sensor.temp_b has latest=35.2, max=30 after downsampling
      // If we sort by value (latest), temp_a < temp_b
      // If we sort by value (max), temp_a > temp_b
      const historyA = [{ lu: new Date().getTime() / 1000, s: '50' }];
      const historyB = [{ lu: new Date().getTime() / 1000, s: '30' }];
      (hass.callWS as Mock).mockImplementation((msg) => {
        if (msg.entity_ids && msg.entity_ids[0] === 'sensor.temp_a') {
          return Promise.resolve({ 'sensor.temp_a': historyA });
        }
        if (msg.entity_ids && msg.entity_ids[0] === 'sensor.temp_b') {
          return Promise.resolve({ 'sensor.temp_b': historyB });
        }
        return Promise.resolve({});
      });

      element.hass = hass;
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          { entity: 'sensor.temp_a', value_source: 'max' },
          { entity: 'sensor.temp_b', value_source: 'max' },
        ],
        sort: { method: 'value', numeric: true, reverse: true },
      });

      await element.updateComplete;
      await element.updateComplete; // wait for history fetch
      await flushFrames();
      await element.updateComplete;

      const names = Array.from(element.shadowRoot?.querySelectorAll('.entity-name') || []).map((el) =>
        el.textContent?.trim(),
      );
      // temp_a has max=50, temp_b has max=30. In reverse numeric sort: temp_a (Z Temperature) is first
      expect(names).toEqual(['Z Temperature', 'A Temperature']);
    });
  });

  describe('getStubConfig', () => {
    type Stub = { entities: { entity: string }[] };
    const stub = (h?: HomeAssistant, ids?: string[]): Stub =>
      (BackgroundGraphEntities as unknown as { getStubConfig(h?: HomeAssistant, ids?: string[]): Stub }).getStubConfig(
        h,
        ids,
      );

    beforeEach(() => {
      hass.states['sun.sun'] = { entity_id: 'sun.sun', state: 'above_horizon', attributes: {} };
    });

    it('should not pick an entity whose state is a word', () => {
      // sun.sun was hard-coded, and it has no numeric history, so the picker
      // preview showed a row and no graph at all.
      const picked = stub(hass, ['sun.sun', 'sensor.test']).entities[0].entity;
      expect(picked).toBe('sensor.test');
    });

    it('should prefer a sensor over another numeric domain', () => {
      hass.states['input_number.x'] = { entity_id: 'input_number.x', state: '5', attributes: {} };
      expect(stub(hass, ['input_number.x', 'sensor.test']).entities[0].entity).toBe('sensor.test');
    });

    it('should fall back to any numeric entity when no sensor is offered', () => {
      hass.states['input_number.x'] = { entity_id: 'input_number.x', state: '5', attributes: {} };
      expect(stub(hass, ['sun.sun', 'input_number.x']).entities[0].entity).toBe('input_number.x');
    });

    it('should search the whole state machine when no ids are offered', () => {
      expect(stub(hass).entities[0].entity).toBe('sensor.test');
    });

    it('should not throw before hass is set', () => {
      expect(() => stub()).not.toThrow();
      expect(stub().entities[0].entity).toBe('');
    });

    describe('on a typical install', () => {
      // The sun integration's timestamp sensors sort first and parseFloat read
      // their ISO state as 2026, so the preview showed "Sun Next dawn 2,026".
      const add = (id: string, state: string, attributes: Record<string, unknown> = {}) => {
        hass.states[id] = { entity_id: id, state, attributes };
      };

      beforeEach(() => {
        delete hass.states['sensor.test'];
        add('sensor.sun_next_dawn', '2026-09-26T04:52:11+00:00', { device_class: 'timestamp' });
        hass.entities['sensor.sun_next_dawn'] = { entity_id: 'sensor.sun_next_dawn', entity_category: 'diagnostic' };
        add('sensor.router_cpu', '12', { state_class: 'measurement' });
        hass.entities['sensor.router_cpu'] = { entity_id: 'sensor.router_cpu', entity_category: 'diagnostic' };
        add('sensor.grid_energy', '1834.2', { state_class: 'total_increasing', device_class: 'energy' });
        add('sensor.desk_power', '42.5', { state_class: 'measurement', device_class: 'power' });
        add('sensor.office_temperature', '21.5', { state_class: 'measurement', device_class: 'temperature' });
      });

      it('should prefer a suggested measurement sensor over a timestamp and a diagnostic', () => {
        expect(stub(hass).entities[0].entity).toBe('sensor.office_temperature');
      });

      it('should skip a suggested sensor that has no numeric state', () => {
        hass.states['sensor.office_temperature'].state = 'unavailable';
        expect(stub(hass).entities[0].entity).toBe('sensor.desk_power');
      });

      it('should fall back to a primary measurement sensor', () => {
        delete hass.states['sensor.office_temperature'];
        expect(stub(hass).entities[0].entity).toBe('sensor.desk_power');
      });

      it('should skip a hidden measurement sensor in that fallback', () => {
        delete hass.states['sensor.office_temperature'];
        hass.entities['sensor.desk_power'] = { entity_id: 'sensor.desk_power', hidden: true };
        // Falls through to "any numeric sensor", which takes the first in order.
        expect(stub(hass).entities[0].entity).toBe('sensor.router_cpu');
      });

      it('should fall back to any numeric sensor, but never a timestamp', () => {
        delete hass.states['sensor.office_temperature'];
        delete hass.states['sensor.desk_power'];
        expect(stub(hass).entities[0].entity).toBe('sensor.router_cpu');
        delete hass.states['sensor.router_cpu'];
        delete hass.states['sensor.grid_energy'];
        expect(stub(hass).entities[0].entity).toBe('sun.sun');
      });

      it('should honour the order of the ids Home Assistant offers within a tier', () => {
        add('sensor.bedroom_humidity', '48', { state_class: 'measurement', device_class: 'humidity' });
        expect(stub(hass, ['sensor.bedroom_humidity', 'sensor.office_temperature']).entities[0].entity).toBe(
          'sensor.bedroom_humidity',
        );
      });
    });

    it('should return nothing but the entities the user did not choose', () => {
      // hours_to_show only ever repeated the default.
      expect(Object.keys(stub(hass, ['sensor.test']))).toEqual(['entities']);
    });

    it('should produce a config the card accepts', () => {
      expect(() =>
        element.setConfig({ type: 'custom:background-graph-entities', ...stub(hass, ['sensor.test']) }),
      ).not.toThrow();
    });
  });

  describe('getEntitySuggestion', () => {
    const hook = (h: HomeAssistant, id: string) =>
      window.customCards?.find((card) => card.type === 'background-graph-entities')?.getEntitySuggestion?.(h, id);
    const suggest = (id: string) => hook(hass, id);
    const addSensor = (id: string, attributes: Record<string, unknown>) => {
      hass.states[id] = { entity_id: id, state: '21.5', attributes };
    };

    beforeEach(() => {
      addSensor('sensor.living_room_temperature', { state_class: 'measurement', device_class: 'temperature' });
    });

    it('should suggest the card for a smooth measurement sensor', () => {
      expect(suggest('sensor.living_room_temperature')?.config).toEqual({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.living_room_temperature' }],
      });
    });

    it('should suggest exactly the card the picker would otherwise create', () => {
      const { type, ...rest } = suggest('sensor.living_room_temperature')?.config ?? {};
      expect(type).toBe('custom:background-graph-entities');
      expect(rest).toEqual(
        (
          BackgroundGraphEntities as unknown as { getStubConfig(h?: HomeAssistant, ids?: string[]): unknown }
        ).getStubConfig(hass, ['sensor.living_room_temperature']),
      );
    });

    it('should produce a config the card accepts', () => {
      const config = suggest('sensor.living_room_temperature')?.config;
      expect(() => element.setConfig(config as unknown as BackgroundGraphEntitiesConfig)).not.toThrow();
    });

    it.each(['humidity', 'atmospheric_pressure', 'carbon_dioxide', 'pm25', 'pm10', 'moisture'])(
      'should suggest the card for %s',
      (deviceClass) => {
        addSensor('sensor.x', { state_class: 'measurement', device_class: deviceClass });
        expect(suggest('sensor.x')).not.toBeNull();
      },
    );

    it('should not suggest the card outside the sensor domain', () => {
      hass.states['input_number.temperature'] = {
        entity_id: 'input_number.temperature',
        state: '21',
        attributes: { state_class: 'measurement', device_class: 'temperature' },
      };
      expect(suggest('input_number.temperature')).toBeNull();
    });

    it.each([undefined, 'total', 'total_increasing'])(
      'should not suggest the card for state_class %s',
      (stateClass) => {
        addSensor('sensor.x', { state_class: stateClass, device_class: 'temperature' });
        expect(suggest('sensor.x')).toBeNull();
      },
    );

    it.each([undefined, 'power', 'current', 'energy', 'battery', 'signal_strength', 'pressure'])(
      'should not suggest the card for device_class %s',
      (deviceClass) => {
        addSensor('sensor.x', { state_class: 'measurement', device_class: deviceClass });
        expect(suggest('sensor.x')).toBeNull();
      },
    );

    it.each(['diagnostic', 'config'])('should not suggest the card for a %s entity', (category) => {
      hass.entities['sensor.living_room_temperature'] = {
        entity_id: 'sensor.living_room_temperature',
        entity_category: category as 'diagnostic' | 'config',
      };
      expect(suggest('sensor.living_room_temperature')).toBeNull();
    });

    it('should not suggest the card for a hidden entity', () => {
      hass.entities['sensor.living_room_temperature'] = { entity_id: 'sensor.living_room_temperature', hidden: true };
      expect(suggest('sensor.living_room_temperature')).toBeNull();
    });

    it('should suggest the card for a registry entry without a category', () => {
      hass.entities['sensor.living_room_temperature'] = {
        entity_id: 'sensor.living_room_temperature',
        entity_category: null,
        hidden: false,
      };
      expect(suggest('sensor.living_room_temperature')).not.toBeNull();
    });

    it('should return null rather than throw for missing data', () => {
      expect(suggest('sensor.missing')).toBeNull();
      addSensor('sensor.bare', {});
      expect(suggest('sensor.bare')).toBeNull();
      expect(hook({} as HomeAssistant, 'sensor.living_room_temperature')).toBeNull();
      expect(hook(undefined as unknown as HomeAssistant, 'sensor.living_room_temperature')).toBeNull();
      expect(suggest(undefined as unknown as string)).toBeNull();
    });
  });

  describe('getGridOptions', () => {
    const grid = (): Record<string, unknown> =>
      (element as unknown as { getGridOptions(): Record<string, unknown> }).getGridOptions();

    it('should describe a full-width card that may shrink to half', () => {
      element.setConfig(config);
      expect(grid().columns).toBe('full');
      expect(grid().min_columns).toBe(6);
      expect(grid().min_rows).toBe(1);
    });

    it('should let Home Assistant measure the height', () => {
      // The row count used to be worked out from the entity count, the row
      // height and the header - an estimate that is a second calculation
      // beside the one that paints the card, and drifts from it. A row that is
      // not rendered was then space the section reserved anyway, leaving the
      // card sitting above a gap.
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      expect(grid().rows).toBe('auto');

      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test', 'sensor.test', 'sensor.test'],
        title: 'Room',
        tile_style: true,
      });
      expect(grid().rows).toBe('auto');
    });

    it('should answer before a config arrives', () => {
      const fresh = document.createElement('background-graph-entities') as BackgroundGraphEntitiesType;
      const options = (fresh as unknown as { getGridOptions(): Record<string, unknown> }).getGridOptions();
      expect(options.rows).toBe('auto');
      expect(options.min_rows).toBe(1);
    });
  });

  describe('Keyboard access', () => {
    it('should make every row focusable and announce it as a button', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test', 'switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const rows = element.shadowRoot?.querySelectorAll('.entity-row');
      expect(rows).toHaveLength(2);
      rows?.forEach((row) => {
        expect(row.getAttribute('tabindex')).toBe('0');
        expect(row.getAttribute('role')).toBe('button');
      });
      expect(rows?.[0].getAttribute('aria-label')).toBe('Test Sensor');
    });

    it('should open more-info from the keyboard', async () => {
      element.setConfig(config);
      element.hass = hass;
      await element.updateComplete;

      const seen: string[] = [];
      element.addEventListener('hass-more-info', (ev) => seen.push((ev as CustomEvent).detail.entityId));

      const row = element.shadowRoot?.querySelector('.entity-row') as HTMLElement;
      row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      row.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      row.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));

      expect(seen).toEqual(['sensor.test', 'sensor.test']);
    });

    it('should leave keys that reached a nested control alone', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        tile_style: true,
        entities: ['switch.test'],
      });
      element.hass = hass;
      await element.updateComplete;

      const seen: string[] = [];
      element.addEventListener('hass-more-info', (ev) => seen.push((ev as CustomEvent).detail.entityId));

      // The icon container is the toggle; Enter there must toggle, not open more-info.
      const icon = element.shadowRoot?.querySelector('.icon-container') as HTMLElement;
      icon.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(seen).toEqual([]);
      expect(hass.callService).toHaveBeenCalledWith('homeassistant', 'toggle', { entity_id: 'switch.test' });
    });

    it('should keep an unresolvable row out of the tab order', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ name: 'Half-filled row' } as unknown as string],
      });
      element.hass = hass;
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row.unavailable');
      expect(row?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Redrawing on resize', () => {
    let observed: Element[];
    let fireResize: (() => void) | undefined;
    const mockNow = new Date('2023-01-01T11:30:00Z');

    beforeEach(() => {
      observed = [];
      fireResize = undefined;
      // jsdom has no ResizeObserver; this one just hands the callback back.
      (window as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
        constructor(callback: () => void) {
          fireResize = callback;
        }
        observe(target: Element) {
          observed.push(target);
        }
        disconnect() {}
        unobserve() {}
      };
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
      (hass.callWS as Mock).mockResolvedValue({
        'sensor.test': [
          { lu: new Date('2023-01-01T09:30:00Z').getTime() / 1000, s: '5' },
          { lu: new Date('2023-01-01T10:30:00Z').getTime() / 1000, s: '15' },
        ],
      });
    });

    afterEach(() => {
      vi.useRealTimers();
      delete (window as unknown as { ResizeObserver?: unknown }).ResizeObserver;
    });

    it('should observe itself while connected', async () => {
      // The element in the outer beforeEach was created before the stub existed.
      document.body.removeChild(element);
      document.body.appendChild(element);
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;

      expect(observed).toContain(element);
    });

    it('should redraw the graph at the new width', async () => {
      document.body.removeChild(element);
      document.body.appendChild(element);
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await flushFrames();

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 100 50');

      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 250 });
      fireResize!();
      await flushFrames();

      // Without a redraw the old viewBox is simply stretched, which is what
      // distorted the strokes.
      expect(element.shadowRoot?.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 250 50');
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 });
    });
  });

  describe('History window across a DST switch', () => {
    const originalTz = process.env.TZ;

    beforeEach(() => {
      // Europe/Berlin springs forward at 02:00 on 2024-03-31, so the calendar
      // day the card looks back over is only 23 real hours long.
      process.env.TZ = 'Europe/Berlin';
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-03-31T03:30:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
      process.env.TZ = originalTz;
    });

    it('should request exactly hours_to_show elapsed hours', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 24 });
      await element.updateComplete;
      await element.updateComplete;

      const [message] = (hass.callWS as Mock).mock.calls.find(([m]) => m?.type === 'history/history_during_period') as [
        { start_time: string; end_time: string },
      ];
      const span = new Date(message.end_time).getTime() - new Date(message.start_time).getTime();
      expect(span).toBe(24 * 60 * 60 * 1000);
    });

    it('should line the first bucket up with the start of the requested window', async () => {
      (hass.callWS as Mock).mockResolvedValue({
        'sensor.test': [{ lu: new Date('2024-03-31T02:00:00Z').getTime() / 1000, s: '5' }],
      });
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 24, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;

      const [message] = (hass.callWS as Mock).mock.calls.find(([m]) => m?.type === 'history/history_during_period') as [
        { start_time: string },
      ];
      const history = (element as unknown as { _history: Map<string, { downsampled: { timestamp: Date }[] }> })
        ._history;
      // The anchor point of the bucket grid has to be the moment the fetch
      // window opens, or every bucket is shifted by the DST hour.
      expect(history.get('sensor.test')?.downsampled[0].timestamp.toISOString()).toBe(
        new Date(message.start_time).toISOString(),
      );
    });
  });

  describe('Text states', () => {
    it('should not append a unit to a text state', async () => {
      hass.states['sun.sun'] = {
        entity_id: 'sun.sun',
        state: 'above_horizon',
        attributes: { friendly_name: 'Sun', unit_of_measurement: '°C' },
      };
      hass.states['climate.hall'] = {
        entity_id: 'climate.hall',
        state: 'heating',
        attributes: { friendly_name: 'Hall', unit_of_measurement: '°C' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sun.sun', 'climate.hall'],
      });
      element.hass = hass;
      await element.updateComplete;

      const values = element.shadowRoot?.querySelectorAll('.primary-value');
      expect(values?.[0].textContent?.trim()).toBe('above_horizon');
      expect(values?.[1].textContent?.trim()).toBe('heating');
    });

    it('should not turn a text state into "NaN min"', async () => {
      hass.states['sensor.timer'] = {
        entity_id: 'sensor.timer',
        state: 'idle',
        attributes: { friendly_name: 'Timer', unit_of_measurement: 'min' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.timer'] });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.primary-value')?.textContent?.trim()).toBe('idle');
    });

    it('should not append a unit to a companion text state', async () => {
      hass.states['sensor.mode'] = {
        entity_id: 'sensor.mode',
        state: 'eco',
        attributes: { friendly_name: 'Mode', unit_of_measurement: 'kWh' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test', extra_value_entity: 'sensor.mode' }],
      });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.extra-value')?.textContent?.trim()).toBe('eco');
    });

    it('should still format a numeric state with its unit', async () => {
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.primary-value')?.textContent?.trim()).toBe('123 °C');
    });
  });

  describe('Entity resolution', () => {
    it('names a row that has no entity key at all', () => {
      expect(resolveEntity(hass, undefined)).toEqual({ ok: false, reason: 'not_configured' });
      expect(resolveEntity(hass, '  ')).toEqual({ ok: false, reason: 'not_configured' });
    });

    it('names an entity that is not in hass', () => {
      expect(resolveEntity(hass, 'sensor.nope')).toEqual({
        ok: false,
        entityId: 'sensor.nope',
        reason: 'not_found',
      });
    });

    it('names an unavailable entity', () => {
      hass.states['sensor.gone'] = { entity_id: 'sensor.gone', state: 'unavailable', attributes: {} };
      expect(resolveEntity(hass, 'sensor.gone').ok).toBe(false);
      expect(resolveEntity(hass, 'sensor.gone')).toMatchObject({ reason: 'unavailable' });
    });

    it('names an entity from a domain the caller does not accept', () => {
      hass.states['light.lamp'] = { entity_id: 'light.lamp', state: 'on', attributes: {} };
      expect(resolveEntity(hass, 'light.lamp', { domains: ['sensor'] })).toMatchObject({ reason: 'wrong_domain' });
      expect(resolveEntity(hass, 'sensor.test', { domains: ['sensor'] }).ok).toBe(true);
    });

    it('names a non-numeric entity only when the caller asked for numbers', () => {
      hass.states['sun.sun'] = { entity_id: 'sun.sun', state: 'above_horizon', attributes: {} };
      expect(resolveEntity(hass, 'sun.sun').ok).toBe(true);
      expect(resolveEntity(hass, 'sun.sun', { numeric: true })).toMatchObject({ reason: 'not_numeric' });
    });

    it.each([
      '2026-09-26T04:52:11+00:00',
      '2026-09-26T04:52:11.123456+00:00',
      '2026-09-26',
      '04:52:11',
      '12 °C',
      '12,5',
      '0x',
      '',
      '   ',
      'NaN',
      'Infinity',
    ])('rejects %j as a number', (state) => {
      hass.states['sensor.x'] = { entity_id: 'sensor.x', state, attributes: {} };
      expect(resolveEntity(hass, 'sensor.x', { numeric: true })).toMatchObject({ reason: 'not_numeric' });
    });

    it.each(['0', '12', '12.5', '-3', '-0.25', '.5', '1e3', '1.5E-4', ' 21.5 ', '1834.200'])(
      'accepts %j as a number',
      (state) => {
        hass.states['sensor.x'] = { entity_id: 'sensor.x', state, attributes: {} };
        expect(resolveEntity(hass, 'sensor.x', { numeric: true }).ok).toBe(true);
      },
    );

    it('accepts on/off as numeric, because the card graphs it as 1/0', () => {
      hass.states['switch.ac'] = { entity_id: 'switch.ac', state: 'off', attributes: {} };
      expect(resolveEntity(hass, 'switch.ac', { numeric: true }).ok).toBe(true);
    });

    it('resolves a healthy entity to its state object', () => {
      const resolved = resolveEntity(hass, 'sensor.test');
      expect(resolved.ok).toBe(true);
      expect(resolved.ok && resolved.stateObj.state).toBe('123');
    });

    it('survives a hass that has not arrived yet', () => {
      expect(resolveEntity(undefined, 'sensor.test')).toMatchObject({ reason: 'not_found' });
    });
  });

  describe('Rows the card cannot resolve', () => {
    it('should render a warning row instead of crashing on a missing entity key', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        // A row without `entity` - hand-written YAML, or a half-filled editor row.
        entities: [{ name: 'Half-filled row' } as unknown as string, 'sensor.test'],
        sort: { method: 'name' },
      });
      element.hass = hass;
      await element.updateComplete;

      const rows = element.shadowRoot?.querySelectorAll('.entity-row');
      expect(rows).toHaveLength(2);
      const warning = element.shadowRoot?.querySelector('.entity-row.unavailable');
      expect(warning?.querySelector('.entity-value')?.textContent?.trim()).toBe('No entity configured');
      // Nothing to graph, so no container that the graph renderer could trip over.
      expect(warning?.querySelector('.graph-container')).toBeNull();
    });

    it('should not throw while sorting a row without an entity key', () => {
      element.hass = hass;
      // No name either, so the name comparator really does reach `undefined`,
      // and second in the list so it lands on the left-hand side of a compare.
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test', {} as unknown as string],
        sort: { method: 'name' },
      });
      expect(() => (element as unknown as { _getSortedEntities(): unknown })._getSortedEntities()).not.toThrow();
    });
  });

  describe('formatNumber', () => {
    it('falls back to English grouping when no locale is provided', () => {
      expect(formatNumber(1234567, undefined, 0)).toBe('1,234,567');
    });

    it('applies the requested fixed precision', () => {
      expect(formatNumber(1234.5, { language: 'en' }, 2)).toBe('1,234.50');
    });

    it('uses comma_decimal formatting', () => {
      expect(formatNumber(1234567.89, { language: 'en', number_format: 'comma_decimal' }, 2)).toBe('1,234,567.89');
    });

    it('uses decimal_comma formatting', () => {
      expect(formatNumber(1234567.89, { language: 'de', number_format: 'decimal_comma' }, 2)).toBe('1.234.567,89');
    });

    it('uses space_comma formatting', () => {
      // ICU uses a narrow no-break space (U+202F) as the French group separator;
      // normalize to a plain space so the assertion isn't brittle across ICU versions.
      const formatted = formatNumber(1234567.89, { language: 'fr', number_format: 'space_comma' }, 2).replace(
        /\s/g,
        ' ',
      );
      expect(formatted).toBe('1 234 567,89');
    });

    it('disables grouping for number_format "none"', () => {
      expect(formatNumber(1234567, { language: 'en', number_format: 'none' }, 0)).toBe('1234567');
    });
  });

  describe('compileValueTransform', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('compiles and applies a simple expression', () => {
      const transform = compileValueTransform('x * 8', 'sensor.test');
      expect(transform?.(12.5)).toBe(100);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('compiles an expression ending in a line comment', () => {
      const transform = compileValueTransform('x * 8 // convert to bits', 'sensor.test');
      expect(transform?.(2)).toBe(16);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('unwraps expressions pasted with surrounding quotes or whitespace', () => {
      // Quoted, the raw expression would evaluate to a string and fail as
      // non-numeric — a common paste mistake from YAML/JS examples.
      expect(compileValueTransform("'x / 125'", 'sensor.test')?.(250)).toBe(2);
      expect(compileValueTransform('"x * 2"', 'sensor.test')?.(3)).toBe(6);
      expect(compileValueTransform('  x * 2  ', 'sensor.test')?.(3)).toBe(6);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('returns undefined and warns on a syntax error', () => {
      expect(compileValueTransform('x ***', 'sensor.test')).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledOnce();
    });

    it('yields NaN and warns once on a runtime error', () => {
      // NaN is the existing gap marker; returning the input would silently mix
      // raw-unit values into a transformed series.
      const transform = compileValueTransform('x.foo.bar', 'sensor.test');
      expect(transform?.(5)).toBeNaN();
      expect(transform?.(6)).toBeNaN();
      expect(warnSpy).toHaveBeenCalledOnce();
    });

    it('yields NaN and warns once on a non-numeric result', () => {
      const transform = compileValueTransform('"nope"', 'sensor.test');
      expect(transform?.(5)).toBeNaN();
      expect(transform?.(6)).toBeNaN();
      expect(warnSpy).toHaveBeenCalledOnce();
    });

    it('passes non-finite inputs through without invoking the expression', () => {
      // A constant expression would return 42 if invoked; NaN in NaN out proves the bypass.
      const transform = compileValueTransform('42', 'sensor.test');
      expect(transform?.(NaN)).toBeNaN();
      expect(transform?.(Infinity)).toBe(Infinity);
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('Custom element registration', () => {
    it('does not register a placeholder ha-switch', () => {
      // Home Assistant ships ha-switch in a lazily loaded chunk. A placeholder from
      // this bundle can win the race and make HA's own define() throw, which breaks
      // every toggle and the settings pages.
      expect(customElements.get('ha-switch')).toBeUndefined();
    });

    it('lets Home Assistant define ha-switch after a toggle row has rendered', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      // Precondition, asserted here so this test fails on its own if the bundle ever
      // registers a placeholder again: the toggle the card just rendered must still be
      // an un-upgraded element waiting for Home Assistant's lazily loaded chunk.
      expect(customElements.get('ha-switch')).toBeUndefined();

      const toggle = element.shadowRoot?.querySelector<HaSwitch>('ha-switch');
      expect(toggle).not.toBeNull();
      expect(customElements.get(toggle!.localName)).toBeUndefined();
      // Lit wrote `checked` as a plain own property on the un-upgraded element.
      expect(Object.prototype.hasOwnProperty.call(toggle!, 'checked')).toBe(true);
      expect(toggle?.checked).toBe(true);

      // Home Assistant's own ha-switch is a LitElement with a reactive `checked`
      // property, so the upgrade installs a prototype accessor that would shadow the
      // own property set above unless ReactiveElement rescues it. Replay that upgrade
      // against exactly such a class. The tag name is unique to this test so no global
      // `ha-switch` registration leaks into the rest of the file and the tests stay
      // order-independent.
      const probeTag = 'ha-switch-upgrade-probe';
      expect(customElements.get(probeTag)).toBeUndefined();

      const container = document.createElement('div');
      document.body.appendChild(container);
      // Same binding the card uses: a property set before the element is defined.
      litRender(html`<ha-switch-upgrade-probe .checked=${true}></ha-switch-upgrade-probe>`, container);

      const probe = container.querySelector<HaSwitch>(probeTag);
      expect(probe).not.toBeNull();
      expect(Object.prototype.hasOwnProperty.call(probe!, 'checked')).toBe(true);

      class HaSwitchLike extends LitElement {
        static properties = { checked: { type: Boolean } };
        checked = false;
        protected render(): TemplateResult {
          return html`<slot></slot>`;
        }
      }
      expect(() => customElements.define(probeTag, HaSwitchLike)).not.toThrow();

      // The element is upgraded in place and keeps the property set before the upgrade,
      // even though the class declares a reactive `checked` that defaults to false.
      expect(probe).toBeInstanceOf(HaSwitchLike);
      await (probe as unknown as LitElement).updateComplete;
      expect(probe?.checked).toBe(true);
      // Guard against a vacuous pass: a fresh instance of the same class is false, so
      // `true` above can only come from the property set before the upgrade.
      expect(document.createElement(probeTag) as HaSwitch).toHaveProperty('checked', false);

      container.remove();
    });

    it('offers a live preview in the card picker', () => {
      const entry = (window.customCards ?? []).find((card) => card.type === 'background-graph-entities');
      expect(entry?.preview).toBe(true);
    });

    it('survives a second load of the bundle without a duplicate define or picker entry', async () => {
      // A duplicate Lovelace resource entry loads this bundle twice.
      const entriesBefore = (window.customCards ?? []).filter((card) => card.type === 'background-graph-entities');
      expect(entriesBefore).toHaveLength(1);

      vi.resetModules();
      await expect(import('../src/background-graph-entities')).resolves.toBeDefined();

      const entriesAfter = (window.customCards ?? []).filter((card) => card.type === 'background-graph-entities');
      expect(entriesAfter).toHaveLength(1);
    });

    it('registers the editor element only once when its module loads again', async () => {
      await import('../src/editor');
      expect(customElements.get('background-graph-entities-editor')).toBeDefined();

      vi.resetModules();
      await expect(import('../src/editor')).resolves.toBeDefined();
    });
  });

  describe('Non-positive config numbers', () => {
    const windowCalls = () =>
      (hass.callWS as Mock).mock.calls.filter(([message]) => message?.type === 'history/history_during_period') as [
        { start_time: string; end_time: string },
      ][];

    /** Hours between the requested window's bounds. */
    const requestedHours = (): number => {
      const [message] = windowCalls()[0];
      return (new Date(message.end_time).getTime() - new Date(message.start_time).getTime()) / 3_600_000;
    };

    it('falls back to the default when hours_to_show is negative', async () => {
      element.hass = hass;
      // `hours_to_show || DEFAULT` let -5 through, so the window ended before it
      // started and the card drew an empty graph with no hint why.
      element.setConfig({ ...config, hours_to_show: -5 });
      await element.updateComplete;
      await element.updateComplete;

      expect(requestedHours()).toBeCloseTo(24, 5);
    });

    // A guard, not a fix test: `0 || DEFAULT` already fell back. It is kept so a
    // future rewrite of the coercion cannot lose the documented zero case.
    it('falls back to the default when hours_to_show is zero', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 0 });
      await element.updateComplete;
      await element.updateComplete;

      expect(requestedHours()).toBeCloseTo(24, 5);
    });

    it('falls back to the default line width when line_width is negative', async () => {
      vi.useFakeTimers();
      try {
        const now = new Date('2023-01-01T12:00:00Z');
        vi.setSystemTime(now);
        (hass.callWS as Mock).mockResolvedValue({
          'sensor.test': [
            { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '5' },
            { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '15' },
          ],
        });
        element.hass = hass;
        element.setConfig({ ...config, line_width: -2, hours_to_show: 2, points_per_hour: 1 });
        await element.updateComplete;
        await element.updateComplete;
        await flushFrames();

        const path = element.shadowRoot?.querySelector('.graph-path');
        expect(path, 'Graph path should exist').not.toBeNull();
        // A negative stroke width is not a thinner line, it is invalid SVG - d3
        // wrote `stroke-width="-2"` out verbatim.
        expect(path?.getAttribute('stroke-width')).toBe('3');
      } finally {
        vi.useRealTimers();
      }
    });

    it('keeps refreshing on the default interval when update_interval is negative', async () => {
      vi.useFakeTimers();
      try {
        element.hass = hass;
        element.setConfig({ ...config, update_interval: -30 });
        await element.updateComplete;
        await element.updateComplete;
        const before = (hass.callWS as Mock).mock.calls.length;

        // `interval > 0` silently swallowed a negative value, which switched
        // refreshing off just as effectively as the documented 0.
        await vi.advanceTimersByTimeAsync(600 * 1000 + 10);
        expect((hass.callWS as Mock).mock.calls.length).toBeGreaterThan(before);
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("The card's own unavailable/unknown wording", () => {
    /**
     * `hass.localize` returns an empty string for a key it cannot resolve, which
     * is what the frontend does until the state translations have loaded. The
     * core keys are preferred whenever they resolve - they are the wording users
     * already know - and only then does the card fall back to its own bundle.
     */
    const withoutStateTranslations = (language: string): HomeAssistant => ({
      ...hass,
      language,
      localize: () => '',
    });

    it('names an unavailable state in the user language when HA cannot', async () => {
      hass.states['sensor.test'] = {
        entity_id: 'sensor.test',
        state: 'unavailable',
        attributes: { friendly_name: 'Test Sensor' },
      };
      element.setConfig(config);
      element.hass = withoutStateTranslations('de');
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('Nicht verfügbar');
    });

    it('names an unknown state in the user language when HA cannot', async () => {
      hass.states['sensor.test'] = {
        entity_id: 'sensor.test',
        state: 'unknown',
        attributes: { friendly_name: 'Test Sensor' },
      };
      element.setConfig(config);
      element.hass = withoutStateTranslations('fr');
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('Inconnu');
    });

    it('names a missing entity in the user language when HA cannot', async () => {
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.missing'] });
      element.hass = withoutStateTranslations('de');
      await element.updateComplete;

      const row = element.shadowRoot?.querySelector('.entity-row.unavailable');
      expect(row?.querySelector('.entity-value')?.textContent?.trim()).toBe('Nicht verfügbar');
    });

    it('names a missing companion entity in the user language when HA cannot', async () => {
      element.setConfig({
        ...config,
        entities: [{ entity: 'sensor.test', extra_value_entity: 'sensor.missing' }],
      });
      element.hass = withoutStateTranslations('fr');
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.extra-value')?.textContent?.trim()).toBe('Indisponible');
    });

    it("still prefers HA's own wording whenever it resolves", async () => {
      hass.states['sensor.test'] = {
        entity_id: 'sensor.test',
        state: 'unavailable',
        attributes: { friendly_name: 'Test Sensor' },
      };
      element.setConfig(config);
      element.hass = { ...hass, language: 'de', localize: () => 'Nicht bereit' };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('Nicht bereit');
    });
  });

  describe('Quoted config numbers', () => {
    const windowCalls = () =>
      (hass.callWS as Mock).mock.calls.filter(([message]) => message?.type === 'history/history_during_period') as [
        { start_time: string; end_time: string },
      ][];

    const requestedHours = (): number => {
      const [message] = windowCalls()[0];
      return (new Date(message.end_time).getTime() - new Date(message.start_time).getTime()) / 3_600_000;
    };

    /**
     * Quoting a number in YAML is legal and common, and `config.value || DEFAULT`
     * accepted it by coincidence. A `typeof value === 'number'` guard would have
     * reset every such config to the defaults on upgrade, so these numbers are
     * coerced before they are validated.
     */
    it('reads a quoted hours_to_show as the window it says', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: '12' as unknown as number });
      await element.updateComplete;
      await element.updateComplete;

      expect(requestedHours()).toBeCloseTo(12, 5);
    });

    it('reads a quoted line_width as that stroke width', async () => {
      vi.useFakeTimers();
      try {
        vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));
        (hass.callWS as Mock).mockResolvedValue({
          'sensor.test': [
            { lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '5' },
            { lu: new Date('2023-01-01T11:00:00Z').getTime() / 1000, s: '15' },
          ],
        });
        element.hass = hass;
        element.setConfig({
          ...config,
          line_width: '1' as unknown as number,
          hours_to_show: 2,
          points_per_hour: 1,
        });
        await element.updateComplete;
        await element.updateComplete;
        await flushFrames();

        expect(element.shadowRoot?.querySelector('.graph-path')?.getAttribute('stroke-width')).toBe('1');
      } finally {
        vi.useRealTimers();
      }
    });

    it('reads a quoted points_per_hour as that resolution', async () => {
      vi.useFakeTimers();
      try {
        vi.setSystemTime(new Date('2023-01-01T12:00:00Z'));
        (hass.callWS as Mock).mockResolvedValue({
          'sensor.test': [{ lu: new Date('2023-01-01T10:00:00Z').getTime() / 1000, s: '5' }],
        });

        /** The drawn path for one points_per_hour value, on its own card. */
        const graphPath = async (pointsPerHour: unknown): Promise<string> => {
          const card = document.createElement('background-graph-entities') as BackgroundGraphEntitiesType;
          document.body.appendChild(card);
          card.hass = hass;
          card.setConfig({ ...config, hours_to_show: 1, points_per_hour: pointsPerHour as number });
          await card.updateComplete;
          await card.updateComplete;
          await flushFrames();
          const drawn = card.shadowRoot?.querySelector('.graph-path')?.getAttribute('d') ?? '';
          card.remove();
          return drawn;
        };

        /**
         * How many curve segments the path is drawn from - one per downsampled
         * point. The coordinates themselves drift by a fraction of a pixel
         * between renders because the window ends at "now".
         */
        const segments = (drawn: string): number => (drawn.match(/C/g) ?? []).length;

        // A discarded string collapsed the resolution to the default of 1.
        expect(segments(await graphPath('6'))).toBe(segments(await graphPath(6)));
        expect(segments(await graphPath('6'))).toBeGreaterThan(segments(await graphPath(undefined)));
      } finally {
        vi.useRealTimers();
      }
    });

    it('reads a quoted update_interval as that interval', async () => {
      vi.useFakeTimers();
      try {
        element.hass = hass;
        element.setConfig({ ...config, update_interval: '12' as unknown as number });
        await element.updateComplete;
        await element.updateComplete;
        const before = (hass.callWS as Mock).mock.calls.length;

        await vi.advanceTimersByTimeAsync(12 * 1000 + 10);
        expect((hass.callWS as Mock).mock.calls.length).toBeGreaterThan(before);
      } finally {
        vi.useRealTimers();
      }
    });

    it('still switches refreshing off for a quoted zero', async () => {
      vi.useFakeTimers();
      try {
        element.hass = hass;
        element.setConfig({ ...config, update_interval: '0' as unknown as number });
        await element.updateComplete;
        await element.updateComplete;
        const before = (hass.callWS as Mock).mock.calls.length;

        await vi.advanceTimersByTimeAsync(600 * 1000 + 10);
        expect((hass.callWS as Mock).mock.calls.length).toBe(before);
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('Localized strings', () => {
    it('localizes the missing-entities error once hass is available', () => {
      element.hass = { ...hass, language: 'de' };
      expect(() => element.setConfig({ type: 'custom:background-graph-entities', entities: [] })).toThrow(
        'Du musst mindestens eine Entität angeben',
      );
    });

    it('keeps the English error when hass is not set yet', () => {
      expect(() => element.setConfig({ type: 'custom:background-graph-entities', entities: [] })).toThrow(
        'You need to define at least one entity',
      );
    });

    it('translates the duration units, not just the digits', async () => {
      hass.states['sensor.uptime'] = {
        entity_id: 'sensor.uptime',
        state: '75.5',
        attributes: { friendly_name: 'Uptime', unit_of_measurement: 'min' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.uptime'] });
      element.hass = { ...hass, language: 'de' };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.entity-value')?.textContent?.trim()).toBe('1 Std. 15 Min.');
    });

    it('names the toggle the way the row names it, translated', async () => {
      // The label skipped `friendly_name`, so a row reading "Test Switch"
      // announced itself to a screen reader as "switch.test umschalten".
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: [{ entity: 'switch.test' }] });
      element.hass = { ...hass, language: 'de' };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('ha-switch')?.getAttribute('aria-label')).toBe('Test Switch umschalten');
    });

    it('falls back to the entity id when the entity has no name at all', async () => {
      hass.states['switch.test'] = { entity_id: 'switch.test', state: 'on', attributes: {} };
      element.setConfig({ type: 'custom:background-graph-entities', entities: [{ entity: 'switch.test' }] });
      element.hass = { ...hass, language: 'de' };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('ha-switch')?.getAttribute('aria-label')).toBe('switch.test umschalten');
    });

    it('translates the tile-style toggle aria-label', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({
        type: 'custom:background-graph-entities',
        tile_style: true,
        entities: [{ entity: 'switch.test', name: 'Lampe' }],
      });
      element.hass = { ...hass, language: 'fr' };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.icon-container')?.getAttribute('aria-label')).toBe('Basculer Lampe');
    });
  });

  describe('Entity display names', () => {
    it('names a row with hass.formatEntityName when the core has it', async () => {
      const formatEntityName = vi.fn(() => 'Kitchen Test Sensor');
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      element.hass = { ...hass, formatEntityName };
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.name-text')?.textContent).toBe('Kitchen Test Sensor');
      expect(formatEntityName).toHaveBeenCalledWith(hass.states['sensor.test'], undefined);
    });

    it('keeps a configured name ahead of hass.formatEntityName', () => {
      const formatEntityName = vi.fn(() => 'Kitchen Test Sensor');
      expect(entityDisplayName({ ...hass, formatEntityName }, 'sensor.test', 'Mine')).toBe('Mine');
      expect(formatEntityName).not.toHaveBeenCalled();
    });

    it('falls back to the friendly name on a core without hass.formatEntityName', () => {
      expect(entityDisplayName(hass, 'sensor.test')).toBe('Test Sensor');
    });

    it('falls back to the entity id when there is no state or no name to show', () => {
      expect(entityDisplayName(hass, 'sensor.missing')).toBe('sensor.missing');
      expect(entityDisplayName(hass, undefined)).toBe('');
      expect(entityDisplayName({ ...hass, formatEntityName: () => '' }, 'sensor.test')).toBe('Test Sensor');
    });
  });

  describe('Truncated entity names', () => {
    const longName = 'A very long entity name that the card truncates with an ellipsis';

    it('exposes the full name as a title on a normal row', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test', name: longName }],
      });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.name-text')?.getAttribute('title')).toBe(longName);
    });

    it('exposes the full name as a title on a tile-style row', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        tile_style: true,
        entities: [{ entity: 'sensor.test', name: longName }],
      });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.name-text')?.getAttribute('title')).toBe(longName);
    });

    it('falls back to the friendly name for the title', async () => {
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.name-text')?.getAttribute('title')).toBe('Test Sensor');
    });

    it('exposes the name as a title on a problem row too', async () => {
      element.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.missing', name: longName }],
      });
      element.hass = hass;
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.name-text')?.getAttribute('title')).toBe(longName);
    });
  });
});
