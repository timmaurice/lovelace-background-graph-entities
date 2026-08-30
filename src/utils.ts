import type { FrontendLocaleData } from './types.js';

export const MS_IN_S = 1000;
export const S_IN_MIN = 60;
export const MIN_IN_H = 60;
export const MS_IN_H = MIN_IN_H * S_IN_MIN * MS_IN_S;

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

  // Create a combined list of states to calculate durations between them.
  // The last "state" is a virtual point at the current time to cap the duration of the last real state.
  const statesWithEndpoints = [...states, { timestamp: new Date(), value: states[states.length - 1]?.value ?? 0 }];

  const now = new Date();
  const startTime = new Date(now.getTime() - hours * MS_IN_H);
  const interval = MS_IN_H / pointsPerHour;
  const numBuckets = Math.ceil((now.getTime() - startTime.getTime()) / interval);

  const downsampled: { timestamp: Date; value: number }[] = [];
  // The first state is guaranteed by `include_start_time_state: true` to be the value at the start of the window.
  let lastValue = states.length > 0 ? states[0].value : 0;

  for (let i = 0; i < numBuckets; i++) {
    const bucketTimestamp = new Date(startTime.getTime() + (i + 1) * interval);
    let valueForBucket: number;

    const bucketStartTime = startTime.getTime() + i * interval;
    const bucketEndTime = bucketStartTime + interval;
    let weightedSum = 0;
    let validDuration = 0;
    let invalidDuration = 0;

    // Iterate through all state changes to calculate their weighted contribution to this bucket.
    for (let k = 0; k < statesWithEndpoints.length - 1; k++) {
      const currentState = statesWithEndpoints[k];
      const nextState = statesWithEndpoints[k + 1];

      // Determine the portion of the state's duration that falls within the current bucket.
      const start = Math.max(currentState.timestamp.getTime(), bucketStartTime);
      const end = Math.min(nextState.timestamp.getTime(), bucketEndTime);

      if (start < end) {
        const duration = end - start;
        // A non-finite value marks an `unavailable`/`unknown` period, which only
        // reaches this function when `show_gaps` is enabled. Its duration is
        // tracked separately so it can never poison the average with NaN.
        if (Number.isFinite(currentState.value)) {
          weightedSum += currentState.value * duration;
          validDuration += duration;
        } else {
          invalidDuration += duration;
        }
      }
    }

    const totalDurationInBucket = validDuration + invalidDuration;

    if (totalDurationInBucket > 0) {
      // A bucket that spends most of its time in an invalid state becomes a gap.
      // A minority sliver of invalid time is ignored, so a single blip cannot
      // punch a hole in an otherwise continuous line. When nothing is invalid
      // this reduces to the original time-weighted average.
      valueForBucket = invalidDuration > validDuration ? NaN : weightedSum / validDuration;
      // Find the last actual value at or before the end of this bucket to carry forward.
      // A NaN is carried forward on purpose: if the entity was last seen unavailable,
      // a following empty bucket is still inside that outage. (`??` only guards
      // null/undefined, so a NaN found here is kept, which is what we want.)
      lastValue = states.filter((s) => s.timestamp.getTime() <= bucketEndTime).pop()?.value ?? lastValue;
    } else {
      // If the bucket is empty, use the last known value.
      valueForBucket = lastValue;
    }

    downsampled.push({
      // Use the end of the bucket interval as the timestamp
      timestamp: bucketTimestamp,
      value: valueForBucket,
    });
  }

  // Add a point at the very beginning to anchor the graph.
  if (states.length > 0) {
    downsampled.unshift({ timestamp: startTime, value: states[0].value });
  }

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
