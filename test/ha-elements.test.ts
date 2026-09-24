// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Home Assistant only defines the elements it ships, so a tag it has removed renders as an
 * empty unknown element with no error anywhere - the editor's pre-hass spinner was
 * `ha-circular-progress` for years after HA dropped it. Read as text, so every branch counts.
 */
const root = join(__dirname, '..');

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|scss)$/.test(entry.name) ? [path] : [];
  });

const sources = sourceFiles(join(root, 'src')).map((path) => ({
  path: path.slice(root.length + 1),
  text: readFileSync(path, 'utf8'),
}));

// Gone from the frontend as of tag 20260826.7. `ha-radio` is exact: `ha-radio-group`,
// `ha-radio-option` and `ha-radio-list-item` still exist. mwc-* and paper-* are only HA's
// internal base classes, if present at all, and never registered for cards to rely on.
const REMOVED = [
  'ha-circular-progress',
  'ha-textfield',
  'ha-fab',
  'ha-radio',
  'mwc-[a-z][a-z0-9-]*',
  'paper-[a-z][a-z0-9-]*',
];

// An element reference is an opening tag or a quoted tag name (querySelector, customElements.get).
// CSS custom properties such as `--paper-card-background-color` are neither.
const usages = (text: string, pattern: string): string[] =>
  [...text.matchAll(new RegExp(`(?:<|['"\`])(${pattern})(?![\\w-])`, 'g'))].map((match) => match[1]);

describe('Home Assistant elements the card renders', () => {
  it('never uses an element Home Assistant has removed', () => {
    const found = sources.flatMap(({ path, text }) =>
      REMOVED.flatMap((pattern) => usages(text, pattern).map((tag) => `${path}: <${tag}>`)),
    );
    expect(found).toEqual([]);
  });

  it('has a demo mock for every ha-* element it renders', () => {
    // The demo page is the only place outside a real HA where the editor is visible; an
    // unmocked tag there is an empty box, which is how the demo drifted from the editor before.
    const mocks = readFileSync(join(root, 'demo', 'mocks.js'), 'utf8');
    const registered = new Set([...mocks.matchAll(/customElements\.define\('(ha-[a-z0-9-]+)'/g)].map((m) => m[1]));
    const rendered = new Set(sources.flatMap(({ text }) => [...text.matchAll(/<(ha-[a-z0-9-]+)/g)].map((m) => m[1])));

    expect(rendered.size).toBeGreaterThan(0);
    expect([...rendered].filter((tag) => !registered.has(tag)).sort()).toEqual([]);
  });
});
