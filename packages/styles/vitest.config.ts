import { defineConfig } from 'vitest/config';
import { name, version } from './package.json';

export default defineConfig({
  resolve: {
    // jsdom tests resolve the Node build, which never injects <style> tags into the document
    alias: {
      'styled-components': 'styled-components/dist/styled-components.browser.esm.js',
    },
  },
  test: {
    include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.md', '**/node_modules/**'],
    name: `${name}@${version}`,
    environment: 'jsdom',
    // vitest stubs CSS as empty by default, including the raw EDS token source
    css: { include: [/@equinor\/eds-tokens/] },
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
