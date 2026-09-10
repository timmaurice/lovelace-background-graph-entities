import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, PASSWORD, USERNAME, ensureRunning, saveTokens, waitForFrontend } from './helpers/homeassistant';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * Signs in once and keeps the tokens, so the specs can talk to the websocket
 * API without every one of them logging in again. Home Assistant hands the
 * frontend its tokens through localStorage, so we take them from there rather
 * than inventing a second authentication path.
 *
 * `dist/` is what docker-compose serves as the Lovelace resource, so the bundle
 * is rebuilt first - otherwise the suite would grade yesterday's code.
 */
export default async function globalSetup(): Promise<void> {
  execFileSync('npm', ['run', 'build'], { cwd: REPO_ROOT, stdio: 'inherit' });
  ensureRunning();
  await waitForFrontend();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE_URL}/`);
    const username = page.getByRole('textbox', { name: 'Username' });
    await username.waitFor({ state: 'visible', timeout: 60_000 });
    await username.fill(USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    const keepLoggedIn = page.getByRole('checkbox', { name: /keep me logged in/i });
    if (!(await keepLoggedIn.isChecked().catch(() => true))) await keepLoggedIn.check();
    await page.getByRole('button', { name: /log in/i }).click();
    await page.waitForURL((url) => !url.pathname.startsWith('/auth/'), { timeout: 60_000 });

    const tokens = await page.waitForFunction(
      () => {
        const raw = window.localStorage.getItem('hassTokens');
        return raw ? JSON.parse(raw) : null;
      },
      undefined,
      { timeout: 30_000 },
    );
    saveTokens(await tokens.jsonValue());
    await page.context().storageState({ path: 'test/ha-e2e/.storage-state.json' });
  } finally {
    await browser.close();
  }
}
