import { afterAll, beforeAll } from 'vitest';

/**
 * Vitest setup file
 *
 * Suppresses console warnings from dependencies that are expected and don't affect tests.
 */
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const message = String(args[0] || '');
    // Suppress Lit dev mode warnings (expected from @equinor/fusion-wc-theme)
    if (message.includes('Lit is in dev mode')) {
      return;
    }
    if (message.includes('Multiple versions of Lit loaded')) {
      return;
    }
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
