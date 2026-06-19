import type { FrontendLocaleData } from './types.js';

export const MS_IN_S = 1000;
export const S_IN_MIN = 60;
export const MIN_IN_H = 60;
export const MS_IN_H = MIN_IN_H * S_IN_MIN * MS_IN_S;

/**
 * Downsamples historical data into evenly spaced buckets using a time-weighted average.
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
    let totalDurationInBucket = 0;

    // Iterate through all state changes to calculate their weighted contribution to this bucket.
    for (let k = 0; k < statesWithEndpoints.length - 1; k++) {
      const currentState = statesWithEndpoints[k];
      const nextState = statesWithEndpoints[k + 1];

      // Determine the portion of the state's duration that falls within the current bucket.
      const start = Math.max(currentState.timestamp.getTime(), bucketStartTime);
      const end = Math.min(nextState.timestamp.getTime(), bucketEndTime);

      if (start < end) {
        const duration = end - start;
        weightedSum += currentState.value * duration;
        totalDurationInBucket += duration;
      }
    }

    if (totalDurationInBucket > 0) {
      valueForBucket = weightedSum / totalDurationInBucket;
      // Find the last actual value at or before the end of this bucket to carry forward.
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
