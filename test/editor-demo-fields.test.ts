import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import type { BackgroundGraphEntitiesEditor as EditorType } from '../src/editor';
import type { HomeAssistant } from '../src/types';

/**
 * The editor's `min` is only useful if it reaches the control the user actually
 * spins, and the editor's other tests can only read it back off the host - the
 * fields are unknown elements in jsdom, so nothing wraps anything. Here the demo
 * page's mocks are registered first, which is the only implementation of those
 * fields this repository owns, so the whole path is exercised: editor template
 * -> field element -> inner `<input>` -> the browser's own step behaviour.
 *
 * It lives in its own file because registering the mocks is global and the rest
 * of the editor suite depends on the fields staying unknown elements.
 */
import '../demo/mocks.js';

describe('The editor rendered with real field elements', () => {
  let editor: EditorType;

  beforeAll(async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    await import('../src/editor');
  });

  const innerInput = (configValue: string): HTMLInputElement => {
    const host = [...editor.shadowRoot!.querySelectorAll<HTMLElement & { configValue?: string }>('*')].find(
      (element) => element.configValue === configValue,
    );
    return host!.shadowRoot!.querySelector('input') as HTMLInputElement;
  };

  beforeEach(async () => {
    const hass = {
      states: {},
      entities: {},
      localize: (key: string) => key,
      language: 'en',
      themes: { darkMode: false },
      callWS: vi.fn().mockResolvedValue({}),
      callService: vi.fn().mockResolvedValue(true),
    } as unknown as HomeAssistant;

    editor = document.createElement('background-graph-entities-editor') as EditorType;
    editor.hass = hass;
    document.body.appendChild(editor);
    editor.setConfig({ type: 'custom:background-graph-entities', entities: ['sensor.test'] });
    await editor.updateComplete;
  });

  it('stops the spinner of a size field at its minimum', () => {
    // Not the attribute on the host: what the user can actually spin down to.
    for (const configValue of ['hours_to_show', 'line_width', 'points_per_hour']) {
      const input = innerInput(configValue);
      input.value = '1';
      input.stepDown();
      expect(input.value, configValue).toBe('1');
    }
  });

  it('lets the update interval spin down to the documented off switch, but no further', () => {
    const input = innerInput('update_interval');
    input.value = '1';
    input.stepDown();
    expect(input.value).toBe('0');
    input.stepDown();
    expect(input.value).toBe('0');
  });
});
