import { describe, it, expect, beforeEach, afterEach, vi, Mock, beforeAll } from 'vitest';
import { HomeAssistant, BackgroundGraphEntitiesConfig } from '../src/types';
import type { BackgroundGraphEntities as BackgroundGraphEntitiesType } from '../src/background-graph-entities';

// Mock console.info before the module is imported to prevent version logging.
vi.spyOn(console, 'info').mockImplementation(() => {});

// Define a minimal interface for the ha-card element to satisfy TypeScript
interface HaCard extends HTMLElement {
  header?: string;
}

// Define a minimal interface for the ha-switch element
interface HaSwitch extends HTMLElement {
  checked?: boolean;
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
    vi.clearAllMocks();
  });

  describe('Basic Rendering and Configuration', () => {
    it('should create the component instance', () => {
      expect(element).toBeInstanceOf(BackgroundGraphEntities);
    });

    it('should render a ha-card with a title if provided', async () => {
      element.hass = hass;
      element.setConfig({ ...config, title: 'My Test Card' });
      await element.updateComplete;

      const card = element.shadowRoot?.querySelector<HaCard>('ha-card');
      expect(card).not.toBeNull();
      expect(card?.header).toBe('My Test Card');
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
      await new Promise((resolve) => requestAnimationFrame(resolve));

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

    it('should call the toggle service when the switch is clicked', async () => {
      hass.states['switch.test'] = {
        entity_id: 'switch.test',
        state: 'on',
        attributes: { friendly_name: 'Test Switch' },
      };
      element.setConfig({ type: 'custom:background-graph-entities', entities: ['switch.test'] });
      element.hass = hass;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('ha-switch');
      (toggle as HTMLElement).click();

      expect(hass.callService).toHaveBeenCalledWith('homeassistant', 'toggle', { entity_id: 'switch.test' });
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
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        setTimeout(() => cb(0), 1);
        return 0; // Return a dummy number to satisfy the return type
      });
    });

    afterEach(() => {
      vi.useRealTimers();
      // Restore the original requestAnimationFrame
      (window.requestAnimationFrame as Mock).mockRestore();
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
      await vi.runAllTimersAsync();

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg, 'SVG element should exist').not.toBeNull();

      const filter = svg?.querySelector('filter');
      expect(filter, 'Filter element should exist for line_glow').not.toBeNull();

      const filterId = filter?.getAttribute('id');
      expect(filterId).toBe('bge-glow-sensor.test');

      const path = svg?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      expect(path?.getAttribute('filter')).toBe(`url(#${filterId})`);
    });

    it('should not apply line_glow effect by default', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await vi.runAllTimersAsync();

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg, 'SVG element should exist').not.toBeNull();

      const filter = svg?.querySelector('filter');
      expect(filter, 'Filter element should not exist by default').toBeNull();

      const path = svg?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      expect(path?.getAttribute('filter'), 'Path should not have filter attribute').toBeNull();
    });

    it('should render a spline curve by default', async () => {
      element.hass = hass;
      element.setConfig({ ...config, hours_to_show: 2, points_per_hour: 1 });
      await element.updateComplete;
      await element.updateComplete;
      await vi.runAllTimersAsync();

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
      await vi.runAllTimersAsync();

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
      await vi.runAllTimersAsync();

      const path = element.shadowRoot?.querySelector('path');
      expect(path, 'Path element should exist').not.toBeNull();
      const d = path?.getAttribute('d');
      // curveStep uses straight line segments, which are 'L' commands. It should not use 'C'.
      expect(d, 'Path "d" attribute should not be null').not.toBeNull();
      expect(d).not.toContain('C');
      expect(d).toContain('L');
    });
  });

  describe('Downsampling Logic (_downsampleHistory)', () => {
    // Define a type that exposes the protected method for testing purposes.
    type TestableBackgroundGraphEntities = BackgroundGraphEntitiesType & {
      _downsampleHistory(
        states: { timestamp: Date; value: number }[],
        hours: number,
        pointsPerHour: number,
      ): { timestamp: Date; value: number }[];
    };

    let instance: TestableBackgroundGraphEntities;
    const hoursToShow = 2;
    const pointsPerHour = 2;
    const mockNow = new Date('2023-01-01T12:00:00Z');
    const startTime = new Date(mockNow.getTime() - hoursToShow * 3600 * 1000); // 10:00:00Z

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(mockNow);
      // The method is protected, so we cast to our test-specific type to access it.
      instance = new BackgroundGraphEntities() as TestableBackgroundGraphEntities;
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return raw states if pointsPerHour is 0', () => {
      const rawStates = [
        { timestamp: new Date('2023-01-01T11:00:00Z'), value: 10 },
        { timestamp: new Date('2023-01-01T11:30:00Z'), value: 20 },
      ];
      const result = instance._downsampleHistory(rawStates, hoursToShow, 0);
      expect(result).toEqual(rawStates);
    });

    it('should correctly downsample history into buckets', () => {
      const states = [
        { timestamp: startTime, value: 5 }, // Start time state
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 10 }, // Bucket 1 (10:00-10:30)
        { timestamp: new Date('2023-01-01T10:45:00Z'), value: 20 }, // Bucket 2 (10:30-11:00)
        { timestamp: new Date('2023-01-01T11:15:00Z'), value: 30 }, // Bucket 3 (11:00-11:30)
        { timestamp: new Date('2023-01-01T11:45:00Z'), value: 40 }, // Bucket 4 (11:30-12:00)
      ];

      const result = instance._downsampleHistory(states, hoursToShow, pointsPerHour);

      // Expected buckets (4 total: 2 hours * 2 points/hr)
      // 0. Anchor point at start time
      // 1. Bucket 10:00-10:30, timestamp 10:30, value 10
      // 2. Bucket 10:30-11:00, timestamp 11:00, value 20
      // 3. Bucket 11:00-11:30, timestamp 11:30, value 30
      // 4. Bucket 11:30-12:00, timestamp 12:00, value 40
      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ timestamp: startTime, value: 5 });
      expect(result[1]).toEqual({ timestamp: new Date('2023-01-01T10:30:00Z'), value: 10 });
      expect(result[2]).toEqual({ timestamp: new Date('2023-01-01T11:00:00Z'), value: 20 });
      expect(result[3]).toEqual({ timestamp: new Date('2023-01-01T11:30:00Z'), value: 30 });
      expect(result[4]).toEqual({ timestamp: new Date('2023-01-01T12:00:00Z'), value: 40 });
    });

    it('should use median for buckets with multiple values', () => {
      const states = [
        { timestamp: startTime, value: 5 },
        // Bucket 1 (10:00-10:30)
        { timestamp: new Date('2023-01-01T10:10:00Z'), value: 10 },
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 30 },
        { timestamp: new Date('2023-01-01T10:20:00Z'), value: 20 }, // Median should be 20
      ];

      const result = instance._downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result[1].value).toBe(20);
    });

    it('should carry forward the last known value for empty buckets', () => {
      const states = [
        { timestamp: startTime, value: 5 },
        { timestamp: new Date('2023-01-01T10:15:00Z'), value: 10 }, // Bucket 1 (10:00-10:30), last known value is 10
        // Bucket 2 (10:30-11:00) is empty
        { timestamp: new Date('2023-01-01T11:15:00Z'), value: 30 }, // Bucket 3 (11:00-11:30)
      ];

      const result = instance._downsampleHistory(states, hoursToShow, pointsPerHour);

      expect(result).toHaveLength(5);
      // Bucket 1 has value 10
      expect(result[1].value).toBe(10);
      // Bucket 2 is empty, should carry forward value 10
      expect(result[2].value).toBe(10);
      // Bucket 3 has value 30
      expect(result[3].value).toBe(30);
      // Bucket 4 is empty, should carry forward value 30
      expect(result[4].value).toBe(30);
    });
  });
});
