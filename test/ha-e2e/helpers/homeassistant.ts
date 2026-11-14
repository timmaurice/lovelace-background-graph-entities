/**
 * Talks to the Home Assistant the repository's docker-compose provides.
 *
 * The suite deliberately uses that instance instead of booting one of its own:
 * it serves `dist/` as `/local/background-graph-entities/`, which is what makes
 * an end-to-end assertion worth more than a mock. A fresh clone has no
 * `ha-config/`, so global setup onboards the instance and registers the bundle
 * as a Lovelace resource itself (see `ensureOnboarded` / `ensureBundleResource`);
 * an instance that is already set up is left alone. Everything the suite writes
 * goes into a dashboard of its own, so a manual playground stays intact.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const E2E_DIR = resolve(here, '..');
const REPO_ROOT = resolve(E2E_DIR, '../..');
const TOKEN_FILE = resolve(E2E_DIR, '.auth.json');

/** Read from the compose file so the suite cannot drift from the environment. */
function portFromCompose(): string {
  const compose = readFileSync(resolve(REPO_ROOT, 'docker-compose.yml'), 'utf8');
  const match = compose.match(/'(\d+):8123'/) ?? compose.match(/"(\d+):8123"/);
  if (!match) throw new Error('No published Home Assistant port found in docker-compose.yml');
  return match[1];
}

export const PORT = process.env.HA_E2E_PORT ?? portFromCompose();
export const BASE_URL = `http://127.0.0.1:${PORT}`;
export const USERNAME = process.env.HA_E2E_USER ?? 'admin';
export const PASSWORD = process.env.HA_E2E_PASSWORD ?? 'password';

/** Brings the repository's own compose environment up if it is not running. */
export function ensureRunning(): void {
  execFileSync('docker', ['compose', 'up', '-d'], { cwd: REPO_ROOT, stdio: 'inherit' });
}

export async function waitForFrontend(timeoutMs = 180_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      // Not /api/onboarding: that endpoint is gone once onboarding is done.
      const res = await fetch(`${BASE_URL}/manifest.json`);
      if (res.ok) return;
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Home Assistant did not answer at ${BASE_URL} within ${timeoutMs}ms`);
}

/** Same value the frontend uses as OAuth client id: the instance's own origin. */
const CLIENT_ID = `${BASE_URL}/`;

/**
 * Onboards a brand new Home Assistant (no `ha-config/` yet) through the same
 * REST API the onboarding page uses, so a clean checkout needs no committed
 * `.storage`. Does nothing when onboarding is already finished.
 */
export async function ensureOnboarded(): Promise<void> {
  const status = await fetch(`${BASE_URL}/api/onboarding`);
  // 404: onboarding endpoint is gone once every step is done.
  if (status.status === 404) return;
  const steps = (await status.json()) as { step: string; done: boolean }[];
  const pending = (name: string) => steps.some((s) => s.step === name && !s.done);

  const json = (body: unknown, token?: string): RequestInit => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });

  const exchange = async (authCode: string): Promise<string> => {
    const tokenRes = await fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'authorization_code', code: authCode, client_id: CLIENT_ID }),
    });
    if (!tokenRes.ok) throw new Error(`onboarding token exchange failed: ${tokenRes.status}`);
    return ((await tokenRes.json()) as { access_token: string }).access_token;
  };

  let token: string;
  if (pending('user')) {
    const res = await fetch(
      `${BASE_URL}/api/onboarding/users`,
      json({ client_id: CLIENT_ID, name: 'Admin', username: USERNAME, password: PASSWORD, language: 'en' }),
    );
    if (!res.ok) throw new Error(`onboarding user step failed: ${res.status} ${await res.text()}`);
    token = await exchange(((await res.json()) as { auth_code: string }).auth_code);
  } else {
    // A previous run was aborted after creating the user. The onboarding API
    // hands out no token for that step a second time, so sign in instead and
    // finish the remaining steps - no need to wipe ha-config/ by hand.
    token = await exchange(await loginForAuthCode(json));
  }

  for (const [step, body] of [
    ['core_config', {}],
    ['analytics', {}],
    ['integration', { client_id: CLIENT_ID, redirect_uri: CLIENT_ID }],
  ] as const) {
    if (!pending(step)) continue;
    const res = await fetch(`${BASE_URL}/api/onboarding/${step}`, json(body, token));
    if (!res.ok) throw new Error(`onboarding step ${step} failed: ${res.status} ${await res.text()}`);
  }
}

/** Signs in through the login flow API with the suite's credentials and returns an auth code. */
async function loginForAuthCode(json: (body: unknown) => RequestInit): Promise<string> {
  const start = await fetch(
    `${BASE_URL}/auth/login_flow`,
    json({ client_id: CLIENT_ID, handler: ['homeassistant', null], redirect_uri: CLIENT_ID }),
  );
  if (!start.ok) throw new Error(`login flow could not be started: ${start.status}`);
  const { flow_id } = (await start.json()) as { flow_id: string };
  const done = await fetch(
    `${BASE_URL}/auth/login_flow/${flow_id}`,
    json({ client_id: CLIENT_ID, username: USERNAME, password: PASSWORD }),
  );
  const result = (await done.json()) as { type?: string; result?: string };
  if (!done.ok || result.type !== 'create_entry' || !result.result) {
    throw new Error(
      `Onboarding is partly done and signing in as "${USERNAME}" failed; ` +
        'set HA_E2E_USER/HA_E2E_PASSWORD to the existing credentials or remove ha-config/.',
    );
  }
  return result.result;
}

/** Registers the built bundle as a Lovelace resource unless the instance has it already. */
export async function ensureBundleResource(): Promise<void> {
  const prefix = '/local/background-graph-entities/';
  const existing = await resources();
  if (existing.some((r) => r.url.startsWith(prefix))) return;
  await callWebsocket({
    type: 'lovelace/resources/create',
    res_type: 'module',
    url: `${prefix}background-graph-entities.js`,
  });
}

export interface Tokens {
  access_token: string;
}

export function saveTokens(tokens: Tokens): void {
  writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

export function readTokens(): Tokens {
  if (!existsSync(TOKEN_FILE)) throw new Error('No token file - did global setup run?');
  return JSON.parse(readFileSync(TOKEN_FILE, 'utf8')) as Tokens;
}

/**
 * Sends one command over the websocket API and returns its result. Node ships a
 * WebSocket client, so this needs no dependency, and it is the same API the
 * frontend itself speaks.
 */
export async function callWebsocket<T = unknown>(message: Record<string, unknown>): Promise<T> {
  const token = readTokens().access_token;
  const socket = new WebSocket(`ws://127.0.0.1:${PORT}/api/websocket`);

  return new Promise<T>((resolve_, reject) => {
    const fail = (reason: string) => {
      socket.close();
      reject(new Error(reason));
    };
    const timer = setTimeout(() => fail('websocket timed out'), 30_000);

    socket.addEventListener('error', () => fail('websocket error'));
    socket.addEventListener('message', (event) => {
      const payload = JSON.parse(String(event.data)) as Record<string, unknown>;
      switch (payload.type) {
        case 'auth_required':
          socket.send(JSON.stringify({ type: 'auth', access_token: token }));
          return;
        case 'auth_invalid':
          clearTimeout(timer);
          fail('websocket authentication was refused');
          return;
        case 'auth_ok':
          socket.send(JSON.stringify({ id: 1, ...message }));
          return;
        case 'result': {
          clearTimeout(timer);
          socket.close();
          if (payload.success) resolve_(payload.result as T);
          else reject(new Error(`websocket command failed: ${JSON.stringify(payload.error)}`));
        }
      }
    });
  });
}

export interface StateObject {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

/** Puts a state on the bus, the way any client would. */
export async function setState(
  entityId: string,
  state: string,
  attributes: Record<string, unknown> = {},
): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/states/${entityId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${readTokens().access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state, attributes }),
  });
  if (!res.ok) throw new Error(`setting ${entityId} failed: ${res.status} ${await res.text()}`);
}

export async function getState(entityId: string): Promise<StateObject | null> {
  const res = await fetch(`${BASE_URL}/api/states/${entityId}`, {
    headers: { Authorization: `Bearer ${readTokens().access_token}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as StateObject;
}

export async function removeState(entityId: string): Promise<void> {
  await fetch(`${BASE_URL}/api/states/${entityId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${readTokens().access_token}` },
  });
}

/**
 * Gives the caller its own dashboard.
 *
 * Every spec file asks for a different name, so specs can run in parallel
 * without fighting over one dashboard - and none of them touches whatever the
 * manual test instance has on its own dashboards. Going through a dashboard we
 * created ourselves is also the only reliable path: since 2026.9 `/lovelace/0`
 * redirects to the new home panel.
 */
export async function useDashboard(name: string, config: Record<string, unknown>): Promise<string> {
  const urlPath = `e2e-${name}`;
  const dashboards = await callWebsocket<{ url_path: string }[]>({
    type: 'lovelace/dashboards/list',
  });
  if (!dashboards.some((dashboard) => dashboard.url_path === urlPath)) {
    await callWebsocket({
      type: 'lovelace/dashboards/create',
      url_path: urlPath,
      title: `E2E ${name}`,
      mode: 'storage',
      show_in_sidebar: false,
    });
  }
  await callWebsocket({ type: 'lovelace/config/save', url_path: urlPath, config });
  return urlPath;
}

/** The Lovelace resources Home Assistant has persisted. */
export async function resources(): Promise<{ id: string; url: string }[]> {
  return callWebsocket({ type: 'lovelace/resources' });
}
