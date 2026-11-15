import { describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { attributes } from '../src';
import { tokens } from '@equinor/eds-tokens';
import {
  type ColorStyleProperty,
  colorSchemeVariables,
  colorVariables,
  colors,
} from '../src/styles/colors';
import { elevationVariables } from '../src/styles/elevation';
import { spacingVariables } from '../src/styles/spacing';
import { typography, typographyVariables } from '../src/styles/typography';

const nativeColorScheme = 'color-scheme: only light';

describe('color scheme', () => {
  test('includes one standalone light-only declaration before the color variables', () => {
    expect(colorVariables[0]).toBe(nativeColorScheme);
    expect(attributes.filter((value) => value.startsWith('color-scheme:'))).toEqual([
      nativeColorScheme,
    ]);
  });

  test('keeps the color variable names and order', () => {
    expect(colorVariables.slice(1)).toHaveLength(75);
    expect(colorVariables.slice(1)).toMatchSnapshot();
  });

  test('maps colours to EDS 2.x variables without a literal fallback', () => {
    for (const [group, mapping] of Object.entries(colorSchemeVariables)) {
      const legacy = tokens.colors[group as keyof typeof tokens.colors] as Record<string, unknown>;
      const properties = colors[group as keyof typeof colors] as Record<string, ColorStyleProperty>;
      for (const [key, variable] of Object.entries(mapping)) {
        expect(legacy).toHaveProperty(key);
        expect(properties[key].getVariable('color')).toMatch(
          new RegExp(`^var\\(--fusion-color__${group}-${key},var\\(${variable}\\)\\)$`),
        );
      }
    }
  });

  test('keeps static brand colours', () => {
    expect(colors.infographic.primary__moss_green_100.getVariable('color')).toContain(
      '--eds_infographic_primary__moss_green_100',
    );
    expect(colors.logo.fill_positive.getVariable('color')).toContain('--eds_logo__fill_positive');
  });

  test('maps typography colours to EDS 2.x text variables', () => {
    expect(typography.heading.h1.getVariable('color')).toContain(
      'var(--eds-color-text-neutral-strong)',
    );
    expect(typography.paragraph.body_long_link.getVariable('color')).toContain(
      'var(--eds-color-text-accent-subtle)',
    );
    expect(typographyVariables.at(-1)).toBe(
      '--fusion-typography__base-color:var(--eds-color-text-neutral-strong)',
    );
  });

  test('aggregates the attributes from each style group', () => {
    expect(attributes).toEqual([
      ...colorVariables,
      ...elevationVariables,
      ...spacingVariables,
      ...typographyVariables,
    ]);
  });

  test('imports the built public entry point without accessing the DOM', () => {
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
            new URL('../dist/index.js', import.meta.url).href,
          )});
          if (!attributes.length) {
            throw new Error('Missing theme attributes');
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
