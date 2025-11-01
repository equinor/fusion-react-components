import { defineConfig } from 'vitest/config';
import { name, version } from './package.json';

export default defineConfig({
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
