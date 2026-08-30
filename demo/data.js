/**
 * Static data and configurations for the demo.
 */

export const mockHassBase = {
  states: {
    'sensor.bedroom': {
      entity_id: 'sensor.bedroom',
      state: '23.5',
      attributes: { friendly_name: 'Bedroom', unit_of_measurement: '°C' },
    },
    'sensor.living_room': {
      entity_id: 'sensor.living_room',
      state: '22.8',
      attributes: { friendly_name: 'Living Room', unit_of_measurement: '°C' },
    },
    'sensor.outside': {
      entity_id: 'sensor.outside',
      state: '18.4',
      attributes: { friendly_name: 'Outside', unit_of_measurement: '°C' },
    },
    'sensor.humidity': {
      entity_id: 'sensor.humidity',
      state: '45',
      attributes: { friendly_name: 'Humidity', unit_of_measurement: '%' },
    },
    'switch.ac': {
      entity_id: 'switch.ac',
      state: 'on',
      attributes: { friendly_name: 'Air Conditioner' },
    },
    'sensor.wan_download': {
      entity_id: 'sensor.wan_download',
      state: '12.5',
      attributes: { friendly_name: 'WAN Download', unit_of_measurement: 'kB/s' },
    },
    // A sensor whose history contains an `unavailable` stretch, used by the
    // `show_gaps` examples below.
    'sensor.flaky_probe': {
      entity_id: 'sensor.flaky_probe',
      state: '22.0',
      attributes: { friendly_name: 'Flaky Probe', unit_of_measurement: '°C' },
    },
  },
  entities: {
    'sensor.bedroom': { entity_id: 'sensor.bedroom', icon: 'mdi:bed' },
    'sensor.living_room': { entity_id: 'sensor.living_room', icon: 'mdi:sofa' },
    'sensor.outside': { entity_id: 'sensor.outside', icon: 'mdi:thermometer' },
    'sensor.humidity': { entity_id: 'sensor.humidity', icon: 'mdi:water-percent' },
    'switch.ac': { entity_id: 'switch.ac', icon: 'mdi:air-conditioner' },
    'sensor.wan_download': { entity_id: 'sensor.wan_download', icon: 'mdi:download-network' },
    'sensor.flaky_probe': { entity_id: 'sensor.flaky_probe', icon: 'mdi:thermometer-alert' },
  },
};

export const demoConfigs = [
  {
    name: 'Default (Minimal)',
    config: {
      type: 'custom:background-graph-entities',
      entities: ['sensor.bedroom', 'sensor.living_room', 'sensor.outside'],
    },
  },
  {
    name: 'Tile Style & Entity Actions',
    description: 'Click on the Air Conditioner to test the toggle service!',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Climate Controls',
      tile_style: true,
      entities: ['sensor.bedroom', { entity: 'switch.ac', name: 'AC Toggle', graph_entity: 'sensor.outside' }],
    },
  },
  {
    name: 'Standard Style & Entity Toggles',
    description: 'Click the switch on the right side to test the toggle service!',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Standard Controls',
      entities: ['sensor.bedroom', { entity: 'switch.ac', name: 'AC Toggle', graph_entity: 'sensor.living_room' }],
    },
  },
  {
    name: 'Advanced Appearance Settings',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Visual Tweaks',
      line_width: 8,
      line_length: 'short',
      line_opacity: 0.8,
      line_glow: true,
      curve: 'step',
      entities: ['sensor.bedroom'],
    },
  },
  {
    name: 'Color Thresholds (Global & Override)',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Temperature Heatmap',
      color_thresholds: [
        { value: 20, color: '#00f' },
        { value: 24, color: '#0f0' },
        { value: 28, color: '#f00' },
      ],
      entities: [
        'sensor.bedroom',
        {
          entity: 'sensor.living_room',
          overwrite_graph_appearance: true,
          color_thresholds: [
            { value: 23, color: 'purple' },
            { value: 25, color: 'yellow' },
          ],
        },
        {
          entity: 'sensor.humidity',
          name: 'Living Room Humidity',
          overwrite_graph_appearance: true,
          color_thresholds: [
            { value: 30, color: 'brown' },
            { value: 45, color: 'teal' },
            { value: 60, color: 'blue' },
          ],
        },
      ],
    },
  },
  {
    name: 'Alternative Graph Entity & Secondary Info',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Multi-Sensor Data',
      entities: [
        {
          entity: 'sensor.bedroom',
          graph_entity: 'sensor.humidity',
          show_graph_entity_state: true,
          icon: 'mdi:home-thermometer',
          icon_color: '#ff9800',
          name: 'Master Bedroom',
        },
      ],
    },
  },
  {
    name: 'Layout Options (Min/Max Bounds & No Icon)',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Compact Bounds',
      show_icon: false,
      graph_min: 20,
      graph_max: 30,
      entities: [{ entity: 'sensor.bedroom', show_icon: true }, 'sensor.outside'],
    },
  },
  {
    name: 'Dynamic Sources & Labels',
    description: 'Use different sources for values and automatic icon colors.',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Advanced Data Sources',
      color_thresholds: [
        { value: 22, color: '#03a9f4' },
        { value: 23, color: '#4caf50' },
        { value: 24, color: '#ff5252' },
      ],
      entities: [
        {
          entity: 'sensor.bedroom',
          name: 'Latest Value',
          auto_icon_color: true,
        },
        {
          entity: 'sensor.bedroom',
          name: 'Maximum Value',
          value_label: 'Daily Max',
          auto_icon_color: true,
          value_source: 'max',
          auto_icon_color_source: 'max',
        },
        {
          entity: 'sensor.bedroom',
          name: 'Minimum Value',
          value_label: 'Daily Min',
          auto_icon_color: true,
          value_source: 'min',
          auto_icon_color_source: 'min',
        },
      ],
    },
  },
  {
    name: 'Value Transform & Unit Override',
    description:
      'The WAN sensor reports kB/s; value_transform (x * 8) and value_unit render it as kb/s, with the same sensor shown in Mb/s as an extra value.',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Network',
      entities: [
        {
          entity: 'sensor.wan_download',
          name: 'Download',
          value_transform: 'x * 8',
          value_unit: 'kb/s',
          extra_value_entity: 'sensor.wan_download',
          extra_value_transform: 'x / 125',
          extra_value_unit: 'Mb/s',
        },
      ],
    },
  },
  {
    name: 'Unavailable States: Default',
    description:
      'The Flaky Probe was unavailable for 6 hours in the middle of the window. By default the line holds the last known value across it, which reads as a flat measurement that never actually happened.',
    config: {
      type: 'custom:background-graph-entities',
      title: 'show_gaps: false (default)',
      hours_to_show: 24,
      points_per_hour: 1,
      curve: 'linear',
      line_width: 4,
      line_opacity: 0.4,
      entities: ['sensor.flaky_probe'],
    },
  },
  {
    name: 'Unavailable States: show_gaps',
    description:
      'The exact same history with show_gaps enabled. The line breaks for the unavailable stretch instead of inventing a value for it.',
    config: {
      type: 'custom:background-graph-entities',
      title: 'show_gaps: true',
      hours_to_show: 24,
      points_per_hour: 1,
      curve: 'linear',
      line_width: 4,
      line_opacity: 0.4,
      show_gaps: true,
      entities: ['sensor.flaky_probe'],
    },
  },
  {
    name: 'Dark Mode Example',
    description: 'The card respects standard Home Assistant theme variables.',
    theme: 'dark',
    config: {
      type: 'custom:background-graph-entities',
      title: 'Night Mode',
      entities: ['sensor.bedroom', 'sensor.outside'],
    },
  },
];
