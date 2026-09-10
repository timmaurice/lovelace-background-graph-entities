import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import type { BackgroundGraphEntitiesConfig, HomeAssistant } from '../src/types';
import type { BackgroundGraphEntitiesEditor as EditorType } from '../src/editor';

vi.spyOn(console, 'info').mockImplementation(() => {});
window.requestAnimationFrame = vi.fn().mockImplementation((cb) => setTimeout(() => cb(0), 0) as unknown as number);

/**
 * The visual editor has no coverage in the static end-to-end page - that page
 * mocks four elements and none of the editor's inputs - and a real Home
 * Assistant is the only other place it renders. These tests drive it in jsdom
 * instead: the inputs are unknown elements there, but the properties Lit sets on
 * them and the `config-changed` events the handlers fire are exactly what a
 * dashboard sees.
 */
interface EditorInput extends HTMLElement {
  configValue?: string;
  value?: string | number;
  placeholder?: string;
  checked?: boolean;
  type?: string;
}

describe('BackgroundGraphEntitiesEditor', () => {
  let editor: EditorType;
  let hass: HomeAssistant;
  let changes: BackgroundGraphEntitiesConfig[];

  beforeAll(async () => {
    await import('../src/editor');
  });

  const field = (configValue: string): EditorInput =>
    [...editor.shadowRoot!.querySelectorAll<EditorInput>('*')].find(
      (element) => element.configValue === configValue,
    ) as EditorInput;

  const fieldByDataField = (dataField: string): EditorInput =>
    editor.shadowRoot!.querySelector<EditorInput>(`[data-field="${dataField}"]`) as EditorInput;

  /** What a dashboard would receive from the last edit. */
  const lastConfig = (): BackgroundGraphEntitiesConfig => changes[changes.length - 1];

  const change = (element: EditorInput, value: string | number): void => {
    element.value = value;
    element.dispatchEvent(new Event('change'));
  };

  beforeEach(async () => {
    hass = {
      states: {
        'sensor.test': {
          entity_id: 'sensor.test',
          state: '21.5',
          attributes: { friendly_name: 'Test Sensor', unit_of_measurement: '°C' },
        },
      },
      entities: {},
      localize: (key: string) => key,
      language: 'en',
      themes: { darkMode: false },
      callWS: vi.fn().mockResolvedValue({}),
      callService: vi.fn().mockResolvedValue(true),
    };

    changes = [];
    editor = document.createElement('background-graph-entities-editor') as EditorType;
    editor.hass = hass;
    editor.addEventListener('config-changed', (event) => {
      changes.push((event as CustomEvent<{ config: BackgroundGraphEntitiesConfig }>).detail.config);
    });
    document.body.appendChild(editor);
  });

  describe('setConfig', () => {
    it('normalises string entities into objects', async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;

      const config = (editor as unknown as { _config: { entities: { entity: string }[] } })._config;
      expect(config.entities).toEqual([{ entity: 'sensor.test' }]);
    });

    it('drops a null entity rather than rendering a broken row', async () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: [null as unknown as string, 'sensor.test'],
      });
      await editor.updateComplete;

      const config = (editor as unknown as { _config: { entities: unknown[] } })._config;
      expect(config.entities).toHaveLength(1);
    });

    it('renders without a config', async () => {
      await editor.updateComplete;
      expect(editor.shadowRoot?.textContent).toBeTruthy();
    });
  });

  describe('Defaults stay out of the saved config', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;
    });

    it('offers the theme-dependent line colour as a placeholder, not a value', () => {
      const input = field('line_color');
      expect(input.value).toBe('');
      expect(input.placeholder).toBe('black');
    });

    it('offers the same colour for a dark theme', async () => {
      editor.hass = { ...hass, themes: { darkMode: true } };
      await editor.updateComplete;
      expect(field('line_color').placeholder).toBe('white');
    });

    it('never writes the default line colour into the config', () => {
      // Blurring the field is enough to fire `change`; with the default
      // prefilled that wrote `line_color: black` and the card stopped following
      // the theme from then on.
      const input = field('line_color');
      change(input, String(input.value));

      expect(lastConfig()).not.toHaveProperty('line_color');
    });

    it('keeps a colour the user actually typed', () => {
      change(field('line_color'), '#ff0000');
      expect(lastConfig().line_color).toBe('#ff0000');
    });

    it('offers the numeric defaults as placeholders too', () => {
      expect(field('hours_to_show').value).toBe('');
      expect(field('hours_to_show').placeholder).toBe('24');
      expect(field('update_interval').placeholder).toBe('600');
      expect(field('points_per_hour').placeholder).toBe('1');
      expect(field('line_width').placeholder).toBe('3');
    });

    it('deletes a key when its field is cleared', () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'], title: 'Kitchen' });
      change(field('title'), '');
      expect(lastConfig()).not.toHaveProperty('title');
    });

    it('deletes a numeric key when its field is cleared', () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'], hours_to_show: 48 });
      const input = field('hours_to_show');
      input.type = 'number';
      change(input, '');
      expect(lastConfig()).not.toHaveProperty('hours_to_show');
    });
  });

  describe('Entity list', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;
    });

    it('adds an empty row', () => {
      (editor as unknown as { _addEntity(): void })._addEntity();
      expect(lastConfig().entities).toEqual([{ entity: 'sensor.test' }, { entity: '' }]);
    });

    it('removes a row', () => {
      (editor as unknown as { _removeEntity(index: number): void })._removeEntity(0);
      expect(lastConfig().entities).toEqual([]);
    });

    it('reorders rows on drop', () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.a', 'sensor.b', 'sensor.c'],
      });
      const internal = editor as unknown as {
        _handleDragStart(ev: DragEvent, index: number): void;
        _handleDragOver(ev: DragEvent, index: number): void;
        _handleDrop(ev: DragEvent): void;
      };
      const ev = { preventDefault: () => {}, dataTransfer: null } as unknown as DragEvent;
      internal._handleDragStart(ev, 2);
      internal._handleDragOver(ev, 0);
      internal._handleDrop(ev);

      expect(lastConfig().entities).toEqual([{ entity: 'sensor.c' }, { entity: 'sensor.a' }, { entity: 'sensor.b' }]);
    });
  });

  describe('Per-entity fields', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      (editor as unknown as { _editEntity(index: number): void })._editEntity(0);
      await editor.updateComplete;
    });

    it('trims what the user typed', () => {
      const input = fieldByDataField('name');
      input.dataset.index = '0';
      change(input, '  Kitchen  ');
      expect((lastConfig().entities[0] as { name: string }).name).toBe('Kitchen');
    });

    it('deletes a per-entity key when the field is emptied', () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test', name: 'Kitchen' }],
      });
      const input = fieldByDataField('name');
      input.dataset.index = '0';
      change(input, '');
      expect(lastConfig().entities[0]).toEqual({ entity: 'sensor.test' });
    });

    it('clears every override when the appearance override is switched off', () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: [
          {
            entity: 'sensor.test',
            overwrite_graph_appearance: true,
            line_color: '#ff0000',
            line_opacity: 0.5,
            graph_min: 0,
            graph_max: 100,
            color_thresholds: [{ value: 0, color: '#000000' }],
          },
        ],
      });
      const target = Object.assign(document.createElement('ha-switch'), { checked: false });
      target.dataset.index = '0';
      (editor as unknown as { _overwriteAppearanceChanged(ev: Event): void })._overwriteAppearanceChanged({
        target,
      } as unknown as Event);

      expect(lastConfig().entities[0]).toEqual({ entity: 'sensor.test' });
    });
  });

  describe('Colour thresholds', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;
    });

    it('seeds one threshold when the colour mode switches', () => {
      (editor as unknown as { _handleColorModeChange(ev: Event, index?: number | null): void })._handleColorModeChange({
        target: { value: 'threshold' },
      } as unknown as Event);

      expect(lastConfig().color_thresholds).toEqual([{ value: 0, color: '#000000' }]);
    });

    it('drops the thresholds again when switching back to a single colour', () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test'],
        color_thresholds: [{ value: 0, color: '#000000' }],
      });
      (editor as unknown as { _handleColorModeChange(ev: Event, index?: number | null): void })._handleColorModeChange({
        target: { value: 'single' },
      } as unknown as Event);

      expect(lastConfig()).not.toHaveProperty('color_thresholds');
    });

    it('removes the key rather than leaving an empty list', () => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: ['sensor.test'],
        color_thresholds: [{ value: 0, color: '#000000' }],
      });
      (editor as unknown as { _removeThreshold(i: number, e?: number | null): void })._removeThreshold(0);

      expect(lastConfig()).not.toHaveProperty('color_thresholds');
    });
  });

  describe('Sorting', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;
    });

    const sortChange = (configValue: string, value: unknown, tagName = 'ha-select'): void => {
      const target = Object.assign(document.createElement(tagName), { configValue, value });
      (editor as unknown as { _sortValueChanged(ev: Event): void })._sortValueChanged({
        target,
        detail: { value },
      } as unknown as Event);
    };

    it('writes a sort method', () => {
      sortChange('sort_method', 'name');
      expect(lastConfig().sort).toEqual({ method: 'name' });
    });

    it('drops the sort object again when the method goes back to none', () => {
      sortChange('sort_method', 'name');
      sortChange('sort_method', 'none');
      expect(lastConfig()).not.toHaveProperty('sort');
    });

    it('stores only the non-default numeric flag', () => {
      sortChange('sort_method', 'name');
      sortChange('sort_numeric', true, 'ha-switch');
      expect(lastConfig().sort).toEqual({ method: 'name' });
    });
  });

  describe('Numeric bounds', () => {
    beforeEach(async () => {
      editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
      await editor.updateComplete;
    });

    it('stops the spinners at a usable minimum', () => {
      // Bare `type="number"` fields let a user spin down past zero, and the card
      // read `hours_to_show || DEFAULT`, so -5 drew an empty graph.
      // This reads the host attribute only; that it reaches the control the user
      // spins is covered in editor-demo-fields.test.ts, where the fields are real
      // elements instead of jsdom's unknown ones.
      expect(field('hours_to_show').getAttribute('min')).toBe('1');
      expect(field('line_width').getAttribute('min')).toBe('1');
      expect(field('points_per_hour').getAttribute('min')).toBe('1');
      // 0 is the documented way to switch refreshing off, so it stays reachable.
      expect(field('update_interval').getAttribute('min')).toBe('0');
    });

    it('clamps a typed negative hour count to the minimum', () => {
      change(field('hours_to_show'), '-5');
      expect(lastConfig().hours_to_show).toBe(1);
    });

    it('clamps a typed zero to the minimum', () => {
      change(field('points_per_hour'), '0');
      expect(lastConfig().points_per_hour).toBe(1);
    });

    it('still allows switching refreshing off', () => {
      change(field('update_interval'), '0');
      expect(lastConfig().update_interval).toBe(0);
    });

    it('does not answer a negative update interval by switching refreshing off', () => {
      // 0 is not this field's floor, it is its "never refresh" mode. Clamping
      // onto it turned a typo into a permanently stale card - and disagreed with
      // the card, which reads -30 as the 600s default.
      change(field('update_interval'), '-30');
      expect(lastConfig()).not.toHaveProperty('update_interval');
    });

    it('keeps a value the user legitimately typed', () => {
      change(field('hours_to_show'), '48');
      expect(lastConfig().hours_to_show).toBe(48);
    });

    it('leaves the graph bounds free to go negative', () => {
      change(field('graph_min'), '-20');
      expect(lastConfig().graph_min).toBe(-20);
    });

    it('stores a global number field as a number, not as the raw input string', () => {
      // A guard, not a fix test: the global handler already reads both the `type`
      // property and the attribute. It is the twin of the per-entity case below,
      // which did not, and it is kept so the two cannot drift apart again.
      change(field('hours_to_show'), '12');
      expect(typeof lastConfig().hours_to_show).toBe('number');
    });
  });

  describe('Per-entity numeric fields', () => {
    const openEntityEditor = async (): Promise<void> => {
      editor.setConfig({
        type: 'custom:background-graph-entities',
        entities: [{ entity: 'sensor.test', overwrite_graph_appearance: true }],
      });
      (editor as unknown as { _editEntity(index: number): void })._editEntity(0);
      await editor.updateComplete;
    };

    it('stores a per-entity graph bound as a number, not as the raw input string', async () => {
      // The twin of the global handler, and the one the coercion missed: the
      // card drops a bound that is not a number, so a bound set here never
      // reached the graph at all.
      await openEntityEditor();
      change(fieldByDataField('graph_min'), '-20');

      const entity = lastConfig().entities[0] as { graph_min?: number };
      expect(entity.graph_min).toBe(-20);
      expect(typeof entity.graph_min).toBe('number');
    });

    it('stores a per-entity upper bound as a number too', async () => {
      await openEntityEditor();
      change(fieldByDataField('graph_max'), '80');

      expect((lastConfig().entities[0] as { graph_max?: number }).graph_max).toBe(80);
    });
  });

  describe('The frame before hass arrives', () => {
    it('shows no untranslatable prose, because there is no hass to localize with', async () => {
      const bare = document.createElement('background-graph-entities-editor') as EditorType;
      document.body.appendChild(bare);
      await bare.updateComplete;

      // English prose here reached a German dashboard's editor DOM. It cannot be
      // localized without `hass`, so it must not be words at all.
      expect(bare.shadowRoot?.textContent?.trim()).toBe('');
      expect(bare.shadowRoot?.querySelector('ha-circular-progress')).not.toBeNull();
      bare.remove();
    });

    it('renders the real editor as soon as hass is there, config or not', async () => {
      // `_config` is initialised at declaration and `setConfig` throws before
      // assigning, so a missing `_config` never gates this render - only `hass`.
      await editor.updateComplete;
      expect(editor.shadowRoot?.querySelector('ha-circular-progress')).toBeNull();
      expect(field('hours_to_show')).toBeTruthy();
    });
  });
});
