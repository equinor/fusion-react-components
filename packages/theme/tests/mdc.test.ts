import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { mdcColorSchemeVariables, mdcColorVariables } from '../src';

const require = createRequire(import.meta.url);
// `fusion-react-styles` installs the EDS tokens and renders them with this mapping.
const stylesPackage = fileURLToPath(new URL('../../styles', import.meta.url));
const edsCss = readFileSync(
  require.resolve('@equinor/eds-tokens/css/variables.css', {
    paths: [stylesPackage],
  }),
  'utf8',
);

describe('mdc colour variables', () => {
  test('maps every property to an EDS colour variable', () => {
    for (const variable of Object.values(mdcColorSchemeVariables)) {
      expect(edsCss).toContain(`${variable}:`);
    }
  });

  test('uses EDS variables without literal colours or fallbacks', () => {
    for (const declaration of mdcColorVariables) {
      expect(declaration).toMatch(/^--mdc-[a-z-]+:var\(--eds-color-[a-z-]+\)$/);
    }
  });
});
