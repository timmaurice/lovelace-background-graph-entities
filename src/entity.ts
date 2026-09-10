import type { HassEntity, HomeAssistant } from './types.js';

/**
 * Why an entity cannot be used, in the order the checks run. `not_configured`
 * covers a row that never got an `entity` key at all - hand-written YAML and a
 * half-filled editor row both produce one, and it used to crash the card.
 */
export type EntityProblem = 'not_configured' | 'not_found' | 'wrong_domain' | 'unavailable' | 'not_numeric';

export interface ResolveOptions {
  /** Restrict to these domains (`sensor`, `switch`, …). */
  domains?: string[];
  /** Require a state that parses to a finite number. */
  numeric?: boolean;
}

export type ResolvedEntity =
  { ok: true; entityId: string; stateObj: HassEntity } | { ok: false; entityId?: string; reason: EntityProblem };

/**
 * Resolves a configured entity id against `hass` and names the problem when it
 * cannot be resolved, so callers can render a warning instead of throwing or
 * silently drawing nothing.
 */
export function resolveEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  options: ResolveOptions = {},
): ResolvedEntity {
  if (!entityId || typeof entityId !== 'string' || !entityId.trim()) {
    return { ok: false, reason: 'not_configured' };
  }

  const stateObj = hass?.states?.[entityId];
  if (!stateObj) return { ok: false, entityId, reason: 'not_found' };

  if (options.domains && !options.domains.includes(entityId.split('.')[0])) {
    return { ok: false, entityId, reason: 'wrong_domain' };
  }

  if (stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
    return { ok: false, entityId, reason: 'unavailable' };
  }

  // `on`/`off` count as numeric: the card graphs them as 1/0.
  if (options.numeric && !isGraphableNumber(stateObj)) {
    return { ok: false, entityId, reason: 'not_numeric' };
  }

  return { ok: true, entityId, stateObj };
}

/** Whether a state is something the card can put on a y-axis. */
export function isGraphableNumber(stateObj: HassEntity): boolean {
  if (stateObj.state === 'on' || stateObj.state === 'off') return true;
  return Number.isFinite(parseFloat(stateObj.state));
}
