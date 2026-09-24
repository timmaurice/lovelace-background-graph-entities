import { vi } from 'vitest';

// Mock for window.customCards
if (typeof window !== 'undefined') {
  window.customCards = [];
}

// Minimal type definitions to satisfy the linter and type-checker for the mock.
interface LovelaceCard {
  constructor: {
    getConfigElement: () => void;
  };
}

interface LovelaceCardHelpers {
  createCardElement: (config: object) => Promise<LovelaceCard>;
}

// Mock for Home Assistant helpers
interface CustomWindow extends Window {
  loadCardHelpers?: () => Promise<LovelaceCardHelpers>;
}

// Guarded like customCards above: a suite that only reads source text runs without a DOM.
if (typeof window !== 'undefined') {
  (window as CustomWindow).loadCardHelpers = vi.fn().mockResolvedValue({
    createCardElement: vi.fn().mockResolvedValue({ constructor: { getConfigElement: vi.fn() } }),
  });
}
