// A basic representation of the Home Assistant object
export interface HomeAssistant {
  states: { [entity_id: string]: HassEntity };
  entities: { [entity_id: string]: HassEntityRegistryDisplayEntry };
  localize: (key: string, ...args: unknown[]) => string;
  language: string;
  // The user's locale settings from HA. Drives number formatting (thousands
  // separators / decimal mark) via `number_format`. Optional because older
  // hass objects and test mocks may omit it; formatters fall back to `language`.
  locale?: FrontendLocaleData;
  callWS: <T>(message: { type: string; [key: string]: unknown }) => Promise<T>;
  callService: (domain: string, service: string, serviceData?: object) => Promise<unknown>;
  themes?: {
    darkMode?: boolean;
    [key: string]: unknown;
  };
  // You can expand this with more properties from the hass object if needed
}

// The user-selectable number format from HA's profile (hass.locale.number_format).
// Mirrors the frontend's NumberFormat enum so we can honor the user's chosen
// grouping/decimal separators instead of always using en-US-style formatting.
export type NumberFormat = 'language' | 'system' | 'comma_decimal' | 'decimal_comma' | 'space_comma' | 'none';

export interface FrontendLocaleData {
  language: string;
  number_format?: NumberFormat;
}

// A basic representation of a Home Assistant entity state object
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
}

export interface HassEntityRegistryDisplayEntry {
  entity_id: string;
  display_precision?: number;
}

// A basic representation of a Lovelace card
export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  editMode?: boolean;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

// A basic representation of a Lovelace card configuration
export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

export interface ColorThreshold {
  value: number;
  color: string;
}

export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  auto_icon_color?: boolean;
  auto_icon_color_source?: 'latest' | 'max' | 'min' | 'avg' | 'median';
  value_source?: 'latest' | 'max' | 'min' | 'avg' | 'median';
  value_label?: string;
  graph_entity?: string;
  show_graph_entity_state?: boolean;
  overwrite_graph_appearance?: boolean;
  line_color?: string;
  line_opacity?: number;
  color_thresholds?: ColorThreshold[];
  graph_min?: number;
  graph_max?: number;
  show_icon?: boolean;
}

export interface SortConfig {
  method?: 'none' | 'name' | 'state' | 'value';
  reverse?: boolean;
  numeric?: boolean;
}

export interface BackgroundGraphEntitiesConfig extends LovelaceCardConfig {
  title?: string;
  entities: (string | EntityConfig)[];
  hours_to_show?: number;
  line_length?: 'short' | 'long';
  line_color?: string;
  line_width?: number;
  line_opacity?: number;
  points_per_hour?: number;
  update_interval?: number;
  color_thresholds?: ColorThreshold[];
  curve?: 'spline' | 'linear' | 'natural' | 'step';
  line_glow?: boolean;
  tile_style?: boolean;
  graph_min?: number;
  graph_max?: number;
  show_icon?: boolean;
  sort?: SortConfig;
  average_in_title?: boolean;
}
