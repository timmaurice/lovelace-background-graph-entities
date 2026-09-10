import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import wcPlugin from 'eslint-plugin-wc';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    // The -ha variants are the Home Assistant suite's report and trace output.
    // They are gitignored but not eslint-ignored, so the first retained trace
    // put a minified copy of the trace viewer in front of the linter and broke
    // `npm run lint` - a required gate - until the directory was deleted.
    ignores: [
      'dist/**',
      'playwright-report/**',
      'playwright-report-ha/**',
      'test-results/**',
      'test-results-ha/**',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    plugins: {
      lit: litPlugin,
      wc: wcPlugin,
    },
    rules: {
      ...litPlugin.configs.recommended.rules,
      ...wcPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['demo/**/*.js', 'test/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  prettierConfig,
);
