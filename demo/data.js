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
  },
  entities: {
    'sensor.bedroom': { entity_id: 'sensor.bedroom', icon: 'mdi:bed' },
    'sensor.living_room': { entity_id: 'sensor.living_room', icon: 'mdi:sofa' },
    'sensor.outside': { entity_id: 'sensor.outside', icon: 'mdi:thermometer' },
    'sensor.humidity': { entity_id: 'sensor.humidity', icon: 'mdi:water-percent' },
    'switch.ac': { entity_id: 'switch.ac', icon: 'mdi:air-conditioner' },
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
