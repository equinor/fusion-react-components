import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { attributes } from '../src';
import { colors, colorVariables, ColorStyleProperty } from '../src/styles/colors';
import { elevationVariables } from '../src/styles/elevation';
import { spacingVariables } from '../src/styles/spacing';
import { typographyVariables } from '../src/styles/typography';

const nativeColorScheme = 'color-scheme: only light';

describe('native control color scheme', () => {
  test('includes one standalone light-only declaration before the color variables', () => {
    expect(colorVariables[0]).toBe(nativeColorScheme);
    expect(colorVariables.filter((value) => value.startsWith('color-scheme:'))).toEqual([
      nativeColorScheme,
    ]);
  });

  test('preserves the previous color variable values and order', () => {
    const previousVariables = Object.values(colors).reduce(
      (current, value) => current.concat(ColorStyleProperty.extractVariables(value)),
      [] as string[],
    );

    expect(previousVariables.length).toBeGreaterThan(0);
    expect(colorVariables.slice(1)).toEqual(previousVariables);
  });

  test('inherits the declaration exactly once in aggregate attributes', () => {
    expect(attributes.filter((value) => value.startsWith('color-scheme:'))).toEqual([
      nativeColorScheme,
    ]);
    expect(attributes).toEqual([
      ...colorVariables,
      ...elevationVariables,
      ...spacingVariables,
      ...typographyVariables,
    ]);
  });

  test('imports the public entry point without accessing the DOM', () => {
    const result = spawnSync(
      process.execPath,
      [
        '--eval',
        `
          for (const name of ['document', 'window']) {
            Object.defineProperty(globalThis, name, {
              get() { throw new Error('Unexpected DOM access: ' + name); },
            });
          }
          const { attributes } = await import(${JSON.stringify(
            new URL('../src/index.ts', import.meta.url).href,
          )});
          if (!attributes.includes(${JSON.stringify(nativeColorScheme)})) {
            throw new Error('Missing native color scheme declaration');
          }
        `,
      ],
      { encoding: 'utf8' },
    );

    expect(result.error).toBeUndefined();
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
  });
});
