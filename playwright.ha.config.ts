import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './test/ha-e2e/helpers/homeassistant';

/**
 * The Home Assistant driven end-to-end suite.
 *
 * `playwright.config.ts` is a different thing: it renders the card into a static
 * page against a hand-written `hass` mock, which is fast but can never see how
 * the real frontend loads the bundle. This config drives the Home Assistant the
 * repository's own docker-compose provides - real dashboards, real entities,
 * real `ha-switch`.
 */
export default defineConfig({
  testDir: './test/ha-e2e',
  testMatch: '**/*.spec.ts',
  // Spec FILES run in parallel - each has its own dashboard and its own
  // entities. Tests inside a file stay serial: they share the fixtures that
  // beforeAll/afterAll set up, and splitting them across workers would let one
  // worker's cleanup pull the ground out from under another's test.
  fullyParallel: false,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'list' : [['list'], ['html', { outputFolder: 'playwright-report-ha', open: 'never' }]],
  timeout: 90_000,
  outputDir: 'test-results-ha',
  globalSetup: './test/ha-e2e/global-setup.ts',
  use: {
    baseURL: BASE_URL,
    storageState: 'test/ha-e2e/.storage-state.json',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
