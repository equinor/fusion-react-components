import { defineConfig } from 'vitest/config';
import { name, version } from './package.json';

export default defineConfig({
  resolve: {
    alias: [
      // styled-components only injects client-side styles from its `browser` build, but vitest
      // resolves the Node build (via `module`), so global styles would never reach the jsdom DOM.
      {
        find: /^styled-components$/,
        replacement: 'styled-components/dist/styled-components.browser.esm.js',
      },
    ],
  },
  test: {
    include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.md', '**/node_modules/**'],
    name: `${name}@${version}`,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/__tests__/**', 'src/index.ts'],
    },
  },
  esbuild: {
    sourcemap: false,
    // Suppress sourcemap warnings
    logOverride: {
      'this-is-undefined-in-esm': 'silent',
    },
  },
  logLevel: 'warn',
});
