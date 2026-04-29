import { mockHassBase, demoConfigs } from './data.js';

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}

const setupDemos = async () => {
  await customElements.whenDefined('background-graph-entities');

  const now = Date.now() / 1000;
  const generateHistory = (finalValue, variance) => {
    const data = [];
    let currentVal = Number(finalValue);
    for (let i = 0; i <= 24; i++) {
      data.push({
        s: String(currentVal),
        lu: now - i * 3600,
      });
      currentVal = currentVal + (Math.random() * variance - variance / 2);
    }
    return data.reverse();
  };

  const mockHass = {
    ...mockHassBase,
    callWS: async () => ({
      'sensor.bedroom': generateHistory(mockHassBase.states['sensor.bedroom'].state, 0.5),
      'sensor.living_room': generateHistory(mockHassBase.states['sensor.living_room'].state, 0.3),
      'sensor.outside': generateHistory(mockHassBase.states['sensor.outside'].state, 1.5),
      'sensor.humidity': generateHistory(mockHassBase.states['sensor.humidity'].state, 2),
      'switch.ac': generateHistory(1, 0),
    }),
    callService: async (domain, service, serviceData) => {
      console.log(`Called service ${domain}.${service}`, serviceData);
      showToast(`Called service: ${domain}.${service} on ${serviceData.entity_id}`);

      if (domain === 'homeassistant' && service === 'toggle') {
        const eid = serviceData.entity_id;
        if (mockHass.states[eid]) {
          const currentState = mockHass.states[eid].state;
          mockHass.states[eid] = {
            ...mockHass.states[eid],
            state: currentState === 'on' ? 'off' : currentState === 'off' ? 'on' : currentState,
          };
          updateAllCards();
        }
      }
    },
  };

  const updateAllCards = () => {
    document.querySelectorAll('background-graph-entities').forEach((c) => {
      c.hass = { ...mockHass };
    });
  };

  const grid = document.getElementById('demo-grid');
  demoConfigs.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'demo-wrapper';

    const cardContainer = document.createElement('div');
    cardContainer.className = 'demo-card-container';
    if (item.theme === 'dark') {
      cardContainer.classList.add('dark-mode');
      cardContainer.classList.add('dark-mode-bg');
    }

    const title = document.createElement('div');
    title.className = 'demo-title';
    title.textContent = item.name;
    cardContainer.appendChild(title);

    if (item.description) {
      const desc = document.createElement('p');
      desc.className = 'demo-description';
      desc.textContent = item.description;
      cardContainer.appendChild(desc);
    }

    const cardSlot = document.createElement('div');
    cardSlot.className = 'card-container';

    const card = document.createElement('background-graph-entities');
    card.hass = { ...mockHass };
    card.setConfig(item.config);
    cardSlot.appendChild(card);
    cardContainer.appendChild(cardSlot);

    const configContainer = document.createElement('div');
    configContainer.className = 'demo-config-container';

    const codeWrapper = document.createElement('div');
    codeWrapper.className = 'code-wrapper';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-button';
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    copyBtn.title = 'Copy to clipboard';
    copyBtn.innerHTML = '<span class="mdi mdi-content-copy"></span>';

    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(item.config, null, 2);

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.textContent).then(() => {
        showToast('Config copied to clipboard!');
      });
    });

    codeWrapper.appendChild(copyBtn);
    codeWrapper.appendChild(pre);
    configContainer.appendChild(codeWrapper);

    wrapper.appendChild(cardContainer);
    wrapper.appendChild(configContainer);
    grid.appendChild(wrapper);
  });

  const liveEditor = document.getElementById('live-editor');
  const livePreview = document.getElementById('live-preview');
  const liveYaml = document.getElementById('live-yaml');
  const liveCopyBtn = document.getElementById('live-copy-button');

  if (liveCopyBtn) {
    liveCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(liveYaml.textContent).then(() => {
        showToast('Config copied to clipboard!');
      });
    });
  }

  let playgroundConfig = {
    type: 'custom:background-graph-entities',
    title: 'Playground Preview',
    entities: ['sensor.bedroom'],
    line_color: '#E01A4F',
  };

  const storedConfig = localStorage.getItem('bge_playground_config');
  if (storedConfig) {
    try {
      playgroundConfig = JSON.parse(storedConfig);
    } catch (e) {
      console.warn('Failed to parse stored playground config:', e);
    }
  }

  const updatePlayground = (config) => {
    livePreview.setConfig(config);
    livePreview.hass = { ...mockHass };
    liveYaml.textContent = JSON.stringify(config, null, 2);
  };

  liveEditor.hass = { ...mockHass };
  liveEditor.setConfig(playgroundConfig);
  updatePlayground(playgroundConfig);

  let previousConfig = JSON.parse(JSON.stringify(playgroundConfig));

  liveEditor.addEventListener('config-changed', (e) => {
    const newConfig = e.detail.config;
    if (newConfig.entities.length < previousConfig.entities.length) {
      showToast('Removing entities is disabled in the demo.');
      liveEditor.setConfig(previousConfig);
      return;
    }
    previousConfig = JSON.parse(JSON.stringify(newConfig));
    updatePlayground(newConfig);
    localStorage.setItem('bge_playground_config', JSON.stringify(newConfig));
  });

  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleContainer = themeToggle.parentElement;

  // Handle clicks on the text/label
  themeToggleContainer.addEventListener('click', (e) => {
    if (e.target !== themeToggle) {
      themeToggle.toggle();
    }
  });

  // Handle the state change (regardless of where the click came from)
  themeToggle.addEventListener('change', () => {
    const isDark = themeToggle.checked;
    console.log('Theme changed, isDark:', isDark);

    document.body.classList.toggle('dark-mode-page', isDark);

    // Update card containers
    document.querySelectorAll('.demo-card-container').forEach((el) => {
      el.classList.toggle('dark-mode', isDark);
      el.classList.toggle('dark-mode-bg', isDark);
    });

    // Update editor containers
    document.querySelectorAll('.demo-editor-container').forEach((el) => {
      el.classList.toggle('dark-mode', isDark);
    });

    updateAllCards();
  });

  document.getElementById('reset-config-button').addEventListener('click', () => {
    localStorage.removeItem('bge_playground_config');
    location.reload();
  });
};

setupDemos();
