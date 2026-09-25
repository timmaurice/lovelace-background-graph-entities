import type { FrontendLocaleData, HomeAssistant } from './types.js';

export const MS_IN_S = 1000;
export const S_IN_MIN = 60;
export const MIN_IN_H = 60;
export const MS_IN_H = MIN_IN_H * S_IN_MIN * MS_IN_S;

/**
 * Reads a config number that may legally arrive as a string: YAML quoting is the
 * user's choice, so `hours_to_show: "12"` is valid config. Anything unreadable
 * as a finite number yields `undefined` so the caller applies its own default.
 */
export function coerceNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Config numbers that describe a size or a window are only usable above zero.
 * The card read them as `config.value || DEFAULT`, which let a negative through
 * - `hours_to_show: -5` opened a window that ended before it started and drew
 * nothing at all.
 *
 * Coerce first, then validate: `|| DEFAULT` accepted a quoted `"12"`, so
 * rejecting every non-`number` would silently reset existing config.
 */
export function positiveOr(value: number | string | undefined, fallback: number): number {
  const parsed = coerceNumber(value);
  return parsed !== undefined && parsed > 0 ? parsed : fallback;
}

/**
 * Downsamples historical data into evenly spaced buckets using a time-weighted average.
 *
 * Samples with a non-finite value represent `unavailable`/`unknown` periods (the
 * card only produces them when `show_gaps` is enabled). They are excluded from
 * the average, and a bucket dominated by them is emitted as `NaN` so the graph
 * can be drawn with a break instead of a flat carried-forward line.
 */
export function downsampleHistory(
  states: { timestamp: Date; value: number }[],
  hours: number,
  pointsPerHour: number,
): { timestamp: Date; value: number }[] {
  if (pointsPerHour <= 0 || states.length === 0) {
    return states; // Return raw states if downsampling is disabled or no data
  }

  const now = new Date();
  const windowStart = now.getTime() - hours * MS_IN_H;
  const windowEnd = now.getTime();
  const interval = MS_IN_H / pointsPerHour;
  const numBuckets = Math.ceil((windowEnd - windowStart) / interval);

  // Accumulate per bucket in one pass over the states. Walking every state for
  // every bucket is quadratic, which a week of dense recorder data turns into
  // most of a second per entity.
  const weightedSum = new Float64Array(numBuckets);
  const validDuration = new Float64Array(numBuckets);
  const invalidDuration = new Float64Array(numBuckets);

  for (let k = 0; k < states.length; k++) {
    const value = states[k].value;
    // A state lasts until the next one; the last one lasts until now.
    const segmentStart = Math.max(states[k].timestamp.getTime(), windowStart);
    const segmentEnd = k + 1 < states.length ? states[k + 1].timestamp.getTime() : windowEnd;
    if (segmentEnd <= segmentStart) continue;

    const firstBucket = Math.floor((segmentStart - windowStart) / interval);
    const lastBucket = Math.min(numBuckets - 1, Math.floor((segmentEnd - windowStart) / interval));
    for (let b = Math.max(0, firstBucket); b <= lastBucket; b++) {
      const bucketStartTime = windowStart + b * interval;
      const duration = Math.min(segmentEnd, bucketStartTime + interval) - Math.max(segmentStart, bucketStartTime);
      if (duration <= 0) continue;
      // A non-finite value marks an `unavailable`/`unknown` period, which only
      // reaches this function when `show_gaps` is enabled. Its duration is
      // tracked separately so it can never poison the average with NaN.
      if (Number.isFinite(value)) {
        weightedSum[b] += value * duration;
        validDuration[b] += duration;
      } else {
        invalidDuration[b] += duration;
      }
    }
  }

  const downsampled: { timestamp: Date; value: number }[] = [];
  // The first state is guaranteed by `include_start_time_state: true` to be the value at the start of the window.
  let lastValue = states[0].value;
  // States arrive sorted, so the carry-forward value only ever moves forward -
  // a cursor replaces the per-bucket scan the old code did over all states.
  let cursor = 0;

  for (let i = 0; i < numBuckets; i++) {
    const bucketEndTime = windowStart + (i + 1) * interval;
    let valueForBucket: number;

    if (validDuration[i] + invalidDuration[i] > 0) {
      // A bucket that spends most of its time in an invalid state becomes a gap.
      // A minority sliver of invalid time is ignored, so a single blip cannot
      // punch a hole in an otherwise continuous line. When nothing is invalid
      // this reduces to the original time-weighted average.
      valueForBucket = invalidDuration[i] > validDuration[i] ? NaN : weightedSum[i] / validDuration[i];
      // Carry the last actual value at or before the end of this bucket forward.
      // A NaN is carried forward on purpose: if the entity was last seen
      // unavailable, a following empty bucket is still inside that outage.
      while (cursor < states.length && states[cursor].timestamp.getTime() <= bucketEndTime) {
        lastValue = states[cursor].value;
        cursor++;
      }
    } else {
      // If the bucket is empty, use the last known value.
      valueForBucket = lastValue;
    }

    downsampled.push({
      // Use the end of the bucket interval as the timestamp
      timestamp: new Date(bucketEndTime),
      value: valueForBucket,
    });
  }

  // Add a point at the very beginning to anchor the graph.
  downsampled.unshift({ timestamp: new Date(windowStart), value: states[0].value });

  return downsampled;
}

/**
 * Maps HA's `number_format` setting to the locale(s) Intl.NumberFormat should
 * use. Mirrors the Home Assistant frontend's `numberFormatToLocale` so the card
 * matches the separators users see elsewhere in HA.
 */
const numberFormatToLocale = (localeOptions: FrontendLocaleData): string | string[] | undefined => {
  switch (localeOptions.number_format) {
    case 'comma_decimal':
      return ['en-US', 'en']; // 1,234,567.89
    case 'decimal_comma':
      return ['de', 'es', 'it']; // 1.234.567,89
    case 'space_comma':
      return ['fr', 'sv', 'cs']; // 1 234 567,89
    case 'system':
      return undefined; // defer to the browser/runtime default
    default:
      return localeOptions.language; // 'language' (or unset) → use the UI language
  }
};

/**
 * Formats a number using the user's HA locale, so thousands separators and the
 * decimal mark match the rest of the HA UI. `precision` (when provided) sets a
 * fixed number of fraction digits, matching the prior `toFixed` behavior while
 * adding grouping. `number_format: 'none'` disables grouping entirely, the same
 * as HA's own formatter.
 *
 * Falls back to a language-only locale when `locale` is absent (older hass
 * objects / test mocks).
 */
export const formatNumber = (value: number, locale: FrontendLocaleData | undefined, precision?: number): string => {
  const effectiveLocale: FrontendLocaleData = locale ?? { language: 'en' };
  const options: Intl.NumberFormatOptions = {};
  if (precision !== undefined) {
    options.minimumFractionDigits = precision;
    options.maximumFractionDigits = precision;
  }
  if (effectiveLocale.number_format === 'none') {
    options.useGrouping = false;
  }
  return new Intl.NumberFormat(numberFormatToLocale(effectiveLocale), options).format(value);
};

export type ValueTransform = (x: number) => number;

/**
 * Compiles a `value_transform` config expression (e.g. `x * 8`) into a function.
 *
 * The expression is config-author-supplied JS evaluated in the viewer's browser
 * (same trust model as apexcharts-card's `transform`), so failures must never
 * break the card: a compile error returns `undefined` (treated as no transform),
 * and a runtime error or non-numeric result yields NaN — an already-handled gap
 * marker — rather than the raw input, which would silently mix raw-unit values
 * into an otherwise transformed series. Each failure mode warns once, not per
 * render frame. Non-finite inputs (NaN gap markers, unavailable states) bypass
 * the expression so gaps survive intact.
 */
export function compileValueTransform(expression: string, entityId: string): ValueTransform | undefined {
  let expr = expression.trim();
  // A pasted expression sometimes arrives wrapped in its YAML/JS quotes
  // ('x / 125'); as JS that evaluates to a string, not a number — unwrap it.
  const first = expr[0];
  if (expr.length >= 2 && (first === "'" || first === '"') && expr.endsWith(first)) {
    expr = expr.slice(1, -1).trim();
  }
  let fn: (x: number) => unknown;
  try {
    // The newlines let an expression end in a `// comment` without swallowing
    // the closing parenthesis.
    fn = new Function('x', `"use strict"; return (\n${expr}\n);`) as (x: number) => unknown;
  } catch (e) {
    console.warn(`background-graph-entities: invalid value_transform for ${entityId}: "${expression}"`, e);
    return undefined;
  }
  let warned = false;
  return (x: number): number => {
    if (!Number.isFinite(x)) return x;
    try {
      const result = fn(x);
      if (typeof result === 'number' && Number.isFinite(result)) return result;
      if (!warned) {
        warned = true;
        console.warn(`background-graph-entities: value_transform for ${entityId} returned a non-numeric result`);
      }
    } catch (e) {
      if (!warned) {
        warned = true;
        console.warn(`background-graph-entities: value_transform for ${entityId} threw`, e);
      }
    }
    return NaN;
  };
}

/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param node The element to dispatch the event from.
 * @param type The name of the event.
 * @param detail The detail value to pass with the event.
 * @param options The options for the event.
 */
export const fireEvent = <T>(node: HTMLElement, type: string, detail?: T, options?: CustomEventInit<T>): void => {
  const event = new CustomEvent(type, { bubbles: true, cancelable: false, composed: true, ...options, detail });
  node.dispatchEvent(event);
};

/**
 * An entity's display name: a configured `name` wins, then `hass.formatEntityName` - the
 * helper HA's own cards name entities with - and, on a core without it (before 2026.4),
 * the friendly name. The entity id is the last resort, also for an entity HA doesn't know.
 */
export function entityDisplayName(
  hass: Pick<HomeAssistant, 'states' | 'formatEntityName'>,
  entityId: string | undefined,
  name?: string,
): string {
  if (name) return name;
  const stateObj = entityId ? hass.states[entityId] : undefined;
  if (!stateObj) return entityId ?? '';
  return hass.formatEntityName?.(stateObj, undefined) || stateObj.attributes.friendly_name || stateObj.entity_id;
}
