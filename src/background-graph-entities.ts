import { LitElement, TemplateResult, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceCardConfig,
  BackgroundGraphEntitiesConfig,
  EntityConfig,
  ColorThreshold,
} from './types.js';
import { extent } from 'd3-array';
import { scaleLinear, scaleTime, ScaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { line as d3Line, curveBasis, curveLinear, curveNatural, curveStep, CurveFactory } from 'd3-shape';
import styles from './styles/card.styles.scss';
import { downsampleHistory, MS_IN_S, S_IN_MIN } from './utils.js';

// Default configuration values
const DEFAULT_HOURS_TO_SHOW = 24;
const DEFAULT_LINE_WIDTH = 3;
const DEFAULT_LINE_OPACITY = 0.2;
const DEFAULT_POINTS_PER_HOUR = 1;
const DEFAULT_CURVE = 'spline';

// D3/Rendering constants
const Y_AXIS_PADDING_FACTOR = 0.1;
const GRAPH_DOT_RADIUS = 2;
const LINE_GLOW_STD_DEVIATION = 2.5;

// Other constants
const ELEMENT_NAME = 'background-graph-entities';
const EDITOR_ELEMENT_NAME = `${ELEMENT_NAME}-editor`;
const UNAVAILABLE_ICON = 'mdi:alert-circle-outline';
const UNAVAILABLE_TEXT = 'Unavailable';

const CURVE_FACTORIES = {
  linear: curveLinear,
  step: curveStep,
  spline: curveBasis,
  natural: curveNatural,
};

declare global {
  interface Window {
    customCards?: {
      type: string;
      name: string;
      description: string;
      documentationURL: string;
      preview?: boolean;
    }[];
  }
}

interface LovelaceCardHelpers {
  createCardElement(config: LovelaceCardConfig): Promise<LovelaceCard>;
}

interface CustomWindow extends Window {
  loadCardHelpers?: () => Promise<LovelaceCardHelpers>;
}

type LovelaceCardConstructor = {
  new (): LovelaceCard;
  getConfigElement(): Promise<LovelaceCardEditor>;
};

@customElement(ELEMENT_NAME)
export class BackgroundGraphEntities extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public editMode = false;
  @state() private _config!: BackgroundGraphEntitiesConfig;
  @state() private _entities: EntityConfig[] = [];
  @state() private _history: Map<string, { timestamp: Date; value: number }[]> = new Map();
  private _historyFetched = false;
  private _timerId?: number;

  private _renderRetryMap = new Map<HTMLElement, number>();

  public setConfig(config: BackgroundGraphEntitiesConfig): void {
    if (!config || !config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('You need to define at least one entity');
    }

    this._config = config;
    this._entities = config.entities.map((entityConf) =>
      typeof entityConf === 'string' ? { entity: entityConf } : entityConf,
    );

    // When config changes, we need to refetch history.
    this._historyFetched = false;
    this._history = new Map();
    this._setupUpdateInterval();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._setupUpdateInterval();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = undefined;
    }
    this._renderRetryMap.clear();
  }

  private _setupUpdateInterval(): void {
    if (this._timerId) clearInterval(this._timerId);
    if (!this._config) return;
    const interval = this._config.update_interval;
    if (interval) this._timerId = window.setInterval(() => this._fetchAndStoreAllHistory(), interval * MS_IN_S);
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // Ensure that the required Home Assistant components are loaded before creating the editor
    // by loading a core editor that uses them. This card requires Home Assistant 2023.4+
    // which provides `loadCardHelpers`.
    const loadHelpers = (window as CustomWindow).loadCardHelpers;
    if (!loadHelpers) {
      throw new Error('This card requires Home Assistant 2023.4+ and `loadCardHelpers` is not available.');
    }
    const helpers = await loadHelpers();
    // This is a trick to load the editor dependencies (e.g., ha-entity-picker)
    // by creating an instance of an entities card and triggering its editor to load.
    const entitiesCard = await helpers.createCardElement({ type: 'entities', entities: [] });
    await (entitiesCard.constructor as LovelaceCardConstructor).getConfigElement();

    await import('./editor.js');
    return document.createElement(EDITOR_ELEMENT_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      entities: [{ entity: 'sun.sun' }],
      hours_to_show: DEFAULT_HOURS_TO_SHOW,
    };
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (this._config && this.hass && !this._historyFetched) {
      this._historyFetched = true; // Prevent re-fetching on every subsequent update
      this._fetchAndStoreAllHistory();
    }

    // Rerender graphs when history data or edit mode changes.
    if (changedProperties.has('_history') || changedProperties.has('editMode')) {
      // Defer rendering to the next frame to ensure the DOM is fully updated.
      requestAnimationFrame(() => this._renderAllGraphs());
    }
  }

  private _getCurveFactory(): CurveFactory {
    const curveType = this._config?.curve || DEFAULT_CURVE;
    // Fallback to spline (curveBasis) if an invalid curve type is provided from the config.
    return CURVE_FACTORIES[curveType as keyof typeof CURVE_FACTORIES] ?? CURVE_FACTORIES.spline;
  }

  private _renderAllGraphs(): void {
    // If the component is no longer connected to the DOM, stop.
    if (!this.isConnected) return;

    const containers = this.renderRoot.querySelectorAll<HTMLElement>('.graph-container');
    if (!this._config?.entities) return;

    containers.forEach((container) => {
      const entityId = container.dataset.entityId;
      if (entityId) {
        const entityConfig = this._entities.find((e) => e.entity === entityId)!;
        const graphEntityId = entityConfig.graph_entity || entityId;
        const history = this._history.get(graphEntityId);
        this._renderD3Graph(container, history, entityConfig);
      }
    });
  }

  private _createGradient(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    yScale: ScaleLinear<number, number>,
    gradientId: string,
    thresholds: ColorThreshold[],
  ): string {
    const thresholdDomain = extent(thresholds, (t) => t.value) as [number, number];
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(thresholdDomain[0]))
      .attr('x2', 0)
      .attr('y2', yScale(thresholdDomain[1]));

    const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);
    sortedThresholds.forEach((threshold) => {
      const range = thresholdDomain[1] - thresholdDomain[0];
      const offset = range > 0 ? (threshold.value - thresholdDomain[0]) / range : 0;
      gradient
        .append('stop')
        .attr('offset', `${Math.max(0, Math.min(1, offset)) * 100}%`)
        .attr('stop-color', threshold.color);
    });

    return `url(#${gradientId})`;
  }

  private _setupGradient(
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    yScale: ScaleLinear<number, number>,
    gradientId: string,
    entityConfig?: EntityConfig,
  ): string {
    const isDarkMode = this.hass.themes?.darkMode ?? false;
    const defaultColor = isDarkMode ? 'white' : 'black';

    // Check for entity-specific appearance override first
    if (entityConfig?.overwrite_graph_appearance) {
      const entityThresholds = entityConfig.color_thresholds;
      if (entityThresholds && entityThresholds.length > 0) {
        return this._createGradient(svg, yScale, gradientId, entityThresholds);
      }
      // If no entity thresholds, use entity line color, or fall back to global, then default.
      return entityConfig.line_color ?? this._config.line_color ?? defaultColor;
    }

    // If no entity override, use global settings
    const globalThresholds = this._config.color_thresholds;
    if (globalThresholds && globalThresholds.length > 0) {
      return this._createGradient(svg, yScale, gradientId, globalThresholds);
    }

    // Fallback to global line color, then default.
    return this._config.line_color ?? defaultColor;
  }

  private _getDotColor(value: number, entityConfig?: EntityConfig): string {
    const isDarkMode = this.hass.themes?.darkMode ?? false;
    const defaultColor = isDarkMode ? 'white' : 'black';

    let thresholds: ColorThreshold[] | undefined;
    let lineColor: string | undefined;

    if (entityConfig?.overwrite_graph_appearance) {
      thresholds = entityConfig.color_thresholds;
      lineColor = entityConfig.line_color;
    }

    // If no entity-specific override, use global settings
    if (thresholds === undefined) {
      thresholds = this._config.color_thresholds;
    }
    if (lineColor === undefined) {
      lineColor = this._config.line_color;
    }

    // Use thresholds if available
    if (thresholds && thresholds.length > 0) {
      const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);
      // Find the last threshold that the value is greater than or equal to
      let color = sortedThresholds[0].color; // Default to the lowest threshold color
      for (const threshold of sortedThresholds) {
        if (value >= threshold.value) {
          color = threshold.color;
        } else {
          // Since thresholds are sorted, we can stop.
          break;
        }
      }
      return color;
    }

    // Fallback to line color, then default.
    return lineColor ?? defaultColor;
  }

  public getCardSize(): number {
    return this._config?.entities.length ? this._config.entities.length + 1 : 1;
  }

  private _openEntityPopup(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  private _toggleEntity(entityId: string): void {
    this.hass.callService('homeassistant', 'toggle', {
      entity_id: entityId,
    });
  }

  private _renderEntityRow(entityConfig: EntityConfig): TemplateResult {
    const stateObj = this.hass.states[entityConfig.entity];
    if (!stateObj) return this._renderUnavailableEntityRow(entityConfig);
    const entityDisplay = this.hass.entities[entityConfig.entity];
    const unit = stateObj.attributes.unit_of_measurement ?? '';
    const stateNum = parseFloat(stateObj.state);
    let displayValue: string;
    const isBooleanState = stateObj.state === 'on' || stateObj.state === 'off';
    const domain = entityConfig.entity.split('.')[0];
    const isToggleable = isBooleanState && !['binary_sensor', 'sensor', 'update'].includes(domain);
    const isTileStyle = this._config.tile_style === true;
    const isActive = isBooleanState && stateObj.state === 'on';
    const iconColor = entityConfig.icon_color;
    const showGraphState = entityConfig.show_graph_entity_state ?? false;
    const showIcon = entityConfig.show_icon ?? this._config.show_icon ?? true;

    let secondaryDisplayValue: string | undefined;
    if (entityConfig.graph_entity && showGraphState) {
      const graphStateObj = this.hass.states[entityConfig.graph_entity];
      if (graphStateObj) {
        const graphEntityDisplay = this.hass.entities[entityConfig.graph_entity];
        const graphUnit = graphStateObj.attributes.unit_of_measurement ?? '';
        const graphStateNum = parseFloat(graphStateObj.state);

        const graphDisplayPrecision = graphEntityDisplay?.display_precision;
        let graphValueToDisplay = graphStateObj.state;
        if (!isNaN(graphStateNum) && typeof graphDisplayPrecision === 'number') {
          graphValueToDisplay = graphStateNum.toFixed(graphDisplayPrecision);
        }
        secondaryDisplayValue = [graphValueToDisplay, graphUnit].filter(Boolean).join(' ');
      } else {
        secondaryDisplayValue = this.hass.localize('state.default.unavailable') || UNAVAILABLE_TEXT;
      }
    }

    const iconStyle = iconColor ? `color: ${iconColor}` : '';
    const handleKeyboardToggle = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        this._toggleEntity(entityConfig.entity);
      }
    };

    // Special formatting for time in minutes
    if (unit.toLowerCase() === 'min') {
      if (stateNum >= S_IN_MIN) {
        const hours = Math.floor(stateNum / S_IN_MIN);
        const minutes = stateNum % S_IN_MIN;
        displayValue = `${hours}h ${Math.floor(minutes)}min`;
      } else {
        displayValue = `${Math.floor(stateNum)} ${unit}`;
      }
    } else {
      const displayPrecision = entityDisplay?.display_precision;
      let valueToDisplay = stateObj.state;
      // Apply display_precision if available and state is numeric
      if (!isNaN(stateNum) && typeof displayPrecision === 'number') {
        valueToDisplay = stateNum.toFixed(displayPrecision);
      }
      displayValue = [valueToDisplay, unit].filter(Boolean).join(' ');
    }

    if (isTileStyle) {
      return html`
        <div
          class="entity-row ${showIcon ? '' : 'no-icon'}"
          style=${iconColor ? `--bge-icon-color: ${iconColor}` : ''}
          @click=${() => this._openEntityPopup(entityConfig.entity)}
        >
          ${showIcon
            ? html`
                <div
                  class="icon-container ${isBooleanState ? (isActive ? 'active' : 'inactive') : ''}"
                  role=${isToggleable ? 'button' : 'img'}
                  aria-label=${isToggleable ? `Toggle ${entityConfig.name || entityConfig.entity}` : ''}
                  aria-pressed=${isToggleable ? isActive : 'false'}
                  tabindex=${isToggleable ? '0' : '-1'}
                  @click=${(e: Event) => {
                    if (isToggleable) {
                      e.stopPropagation();
                      this._toggleEntity(entityConfig.entity);
                    }
                  }}
                  @keydown=${isToggleable ? handleKeyboardToggle : null}
                >
                  ${entityConfig.icon
                    ? html`<ha-icon class="entity-icon" .icon=${entityConfig.icon} style=${iconStyle}></ha-icon>`
                    : html`<ha-state-icon
                        class="entity-icon"
                        .hass=${this.hass}
                        .stateObj=${stateObj}
                        .stateColor=${isTileStyle}
                        style=${iconStyle}
                      ></ha-state-icon>`}
                </div>
              `
            : ''}
          <div class="entity-info">
            <div class="entity-name">
              ${entityConfig.name || stateObj.attributes.friendly_name || entityConfig.entity}
            </div>
            <div class="entity-value">
              <span class="primary-value">${displayValue}</span>
              ${secondaryDisplayValue ? html`<span class="secondary-value">· ${secondaryDisplayValue}</span>` : ''}
            </div>
          </div>
          <div class="graph-container" data-entity-id=${entityConfig.entity}></div>
        </div>
      `;
    }

    return html`
      <div class="entity-row ${showIcon ? '' : 'no-icon'}" @click=${() => this._openEntityPopup(entityConfig.entity)}>
        ${showIcon
          ? entityConfig.icon
            ? html`<ha-icon class="entity-icon" .icon=${entityConfig.icon} style=${iconStyle}></ha-icon>`
            : html`<ha-state-icon
                class="entity-icon"
                .hass=${this.hass}
                .stateObj=${stateObj}
                .stateColor=${isTileStyle}
                style=${iconStyle}
              ></ha-state-icon>`
          : ''}
        <div class="entity-name">
          ${entityConfig.name || stateObj.attributes.friendly_name || entityConfig.entity}
          ${isToggleable && !isTileStyle && secondaryDisplayValue
            ? html`<span class="secondary-value-inline">${secondaryDisplayValue}</span>`
            : ''}
        </div>
        <div class="graph-container" data-entity-id=${entityConfig.entity}></div>
        ${isToggleable && !isTileStyle
          ? html`
              <div class="entity-value entity-with-toggle">
                <ha-switch
                  aria-label=${`Toggle ${entityConfig.name || entityConfig.entity}`}
                  .checked=${stateObj.state === 'on'}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._toggleEntity(entityConfig.entity);
                  }}
                ></ha-switch>
              </div>
            `
          : html`<div class="entity-value">
              <span class="primary-value">${displayValue}</span>
              ${!isToggleable && secondaryDisplayValue
                ? html`<span class="secondary-value">· ${secondaryDisplayValue}</span>`
                : ''}
            </div>`}
      </div>
    `;
  }

  private _renderUnavailableEntityRow(entityConfig: EntityConfig): TemplateResult {
    const showIcon = entityConfig.show_icon ?? this._config.show_icon ?? true;
    return html`
      <div
        class="entity-row unavailable ${showIcon ? '' : 'no-icon'}"
        @click=${() => this._openEntityPopup(entityConfig.entity)}
      >
        ${showIcon ? html`<ha-icon class="entity-icon" icon=${UNAVAILABLE_ICON}></ha-icon>` : ''}
        <div class="entity-name">${entityConfig.name || entityConfig.entity}</div>
        <div class="graph-container" data-entity-id=${entityConfig.entity}></div>
        <div class="entity-value">${this.hass.localize('state.default.unavailable') || UNAVAILABLE_TEXT}</div>
      </div>
    `;
  }

  private _renderD3Graph(
    container: HTMLElement,
    history: { timestamp: Date; value: number }[] | undefined,
    entityConfig?: EntityConfig,
  ): void {
    const MAX_RETRIES = 10;
    const retryCount = this._renderRetryMap.get(container) || 0;

    if (!container.isConnected || container.clientWidth === 0 || container.clientHeight === 0) {
      if (retryCount < MAX_RETRIES) {
        this._renderRetryMap.set(container, retryCount + 1);
        // If container is not ready, retry shortly.
        requestAnimationFrame(() => this._renderD3Graph(container, history, entityConfig));
      }
      return;
    }

    // Reset retry count on successful render
    this._renderRetryMap.delete(container);

    // Clear any previous graph
    select(container).html('');

    if (!history || history.length === 0) {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const hoursToShow = this._config?.hours_to_show || DEFAULT_HOURS_TO_SHOW;
    const end = new Date();
    const start = new Date();
    start.setHours(end.getHours() - hoursToShow);

    const xDomain: [Date, Date] = [start, end];

    // Clone history to avoid mutating the state, and add a point at the end
    // to extend the graph to the current time.
    const processedHistory = [...history];
    const lastHistory = processedHistory[processedHistory.length - 1];
    if (lastHistory) {
      processedHistory.push({
        timestamp: end,
        value: lastHistory.value,
      });
    }

    if (processedHistory.length < 2) {
      return; // Not enough points to draw a line
    }

    const yDomain = extent(processedHistory, (d) => d.value) as [number, number];

    // Determine min and max from config, with entity override
    const graphMin =
      entityConfig?.overwrite_graph_appearance && entityConfig.graph_min !== undefined
        ? entityConfig.graph_min
        : this._config.graph_min;
    const graphMax =
      entityConfig?.overwrite_graph_appearance && entityConfig.graph_max !== undefined
        ? entityConfig.graph_max
        : this._config.graph_max;

    if (typeof graphMin === 'number') yDomain[0] = graphMin;
    if (typeof graphMax === 'number') yDomain[1] = graphMax;

    if (yDomain[0] === yDomain[1]) {
      yDomain[0] -= 1;
      yDomain[1] += 1;
    }

    const yPadding = (yDomain[1] - yDomain[0]) * Y_AXIS_PADDING_FACTOR; // Use padding only if bounds are not fixed
    if (typeof graphMin !== 'number') yDomain[0] -= yPadding;
    if (typeof graphMax !== 'number') yDomain[1] += yPadding;

    const xScale = scaleTime().domain(xDomain).range([0, width]);
    const yScale = scaleLinear().domain(yDomain).range([height, 0]);

    const svg = select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'none');

    const glowId = `bge-glow-${container.dataset.entityId}`;
    if (this._config.line_glow) {
      const defs = svg.append('defs');
      const filter = defs
        .append('filter')
        .attr('id', glowId)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      filter.append('feGaussianBlur').attr('stdDeviation', LINE_GLOW_STD_DEVIATION).attr('result', 'coloredBlur');

      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'coloredBlur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    }

    const gradientId = `bge-gradient-${container.dataset.entityId}`;
    const strokeColor = this._setupGradient(svg, yScale, gradientId, entityConfig);

    const lineGenerator = d3Line<{ timestamp: Date; value: number }>()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.value))
      .curve(this._getCurveFactory());

    svg
      .append('path')
      .datum(processedHistory)
      .attr('class', 'graph-path')
      .attr('d', lineGenerator)
      .attr('stroke', strokeColor)
      .attr(
        'stroke-opacity',
        entityConfig?.overwrite_graph_appearance && entityConfig.line_opacity !== undefined
          ? entityConfig.line_opacity
          : (this._config?.line_opacity ?? DEFAULT_LINE_OPACITY),
      )
      .attr('stroke-width', this._config?.line_width || DEFAULT_LINE_WIDTH)
      .attr('filter', this._config.line_glow ? `url(#${glowId})` : null);

    // The first point in history is an anchor at the start time, not a bucket.
    // We only want to show dots for the actual data buckets.
    const dotData = history.slice(1);
    if (this.editMode) {
      svg
        .selectAll('.graph-dot')
        .data(dotData)
        .enter()
        .append('circle')
        .attr('class', 'graph-dot')
        .attr('cx', (d) => xScale(d.timestamp))
        .attr('cy', (d) => yScale(d.value))
        .attr('r', GRAPH_DOT_RADIUS)
        .attr('fill', (d) => this._getDotColor(d.value, entityConfig));
    }
  }

  private async _fetchAndStoreAllHistory(): Promise<void> {
    if (this._entities.length === 0) {
      if (this._history.size > 0) this._history = new Map();
      return;
    }
    const newHistory = new Map<string, { timestamp: Date; value: number }[] | null>();
    const historyPromises = this._entities.map(async (entityConf) => {
      const entityId = entityConf.graph_entity || entityConf.entity;
      const history = await this._fetchHistory(entityId, entityConf.entity);
      newHistory.set(entityId, history);
    });
    await Promise.all(historyPromises);
    // Filter out null histories
    this._history = new Map(
      [...newHistory.entries()].filter(([, value]) => value !== null) as [
        string,
        { timestamp: Date; value: number }[],
      ][],
    );
  }

  private async _fetchHistory(
    entityId: string,
    mainEntityIdForLogging?: string,
  ): Promise<{ timestamp: Date; value: number }[] | null> {
    if (!this.hass?.callWS) return null;

    const hoursToShow = this._config?.hours_to_show || DEFAULT_HOURS_TO_SHOW;
    const pointsPerHour = this._config?.points_per_hour || DEFAULT_POINTS_PER_HOUR;

    const start = new Date();
    start.setHours(start.getHours() - hoursToShow);

    try {
      const history = await this.hass.callWS<{
        [key: string]: { s: string; lu: number }[];
      }>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: new Date().toISOString(),
        entity_ids: [entityId],
        minimal_response: true,
        no_attributes: true,
        include_start_time_state: true,
      });

      const states = history[entityId];
      if (!states) {
        return [];
      }

      const finalStates = states
        .map((s) => {
          let value: number;
          if (s.s === 'on') value = 1;
          else if (s.s === 'off') value = 0;
          else value = Number(s.s);
          return { timestamp: new Date(s.lu * MS_IN_S), value };
        })
        .filter((s) => !isNaN(s.value));
      return downsampleHistory(finalStates, hoursToShow, pointsPerHour);
    } catch (err) {
      console.error(`Error fetching history for ${mainEntityIdForLogging || entityId} (using ${entityId}):`, err);
      return null;
    }
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    return html`
      <ha-card .header=${this._config.title}>
        <div
          class="card-content ${this._config.tile_style ? 'tile' : ''} ${this._config.line_length === 'short'
            ? 'short'
            : ''}"
        >
          ${this._entities.map((entity) => this._renderEntityRow(entity))}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ${unsafeCSS(styles)}
  `;
}

if (typeof window !== 'undefined' && !customElements.get('ha-switch')) {
  // Define a placeholder if ha-switch is not available, to prevent rendering errors.
  // This is a fallback for environments where core components might not be loaded.
  customElements.define('ha-switch', class extends HTMLElement {});
}

if (typeof window !== 'undefined') {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: ELEMENT_NAME,
    name: 'Background Graph Entities',
    description: 'A card to display entities with a background graph.',
    documentationURL: 'https://github.com/timmaurice/lovelace-background-graph-entities',
  });
}
