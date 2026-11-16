import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tokens } from '@equinor/eds-tokens';
import { describe, expect, it } from 'vitest';
import {
  classicColourDeclarations,
  classicColourSchemeStyles,
  classicColourVariables,
  classicOverlayColour,
  classicOverlayColours,
  classicOverlayTextStyles,
  classicScrimColour,
} from '../index';

const require = createRequire(import.meta.url);
const edsCss = readFileSync(require.resolve('@equinor/eds-tokens/css/variables.css'), 'utf8');

/** Every `--eds_*` property the classic `@equinor/eds-tokens` JS values read. */
const classicProperties = [
  ...new Set([...JSON.stringify(tokens).matchAll(/var\((--eds_[a-z0-9_]+)/g)].map(([, n]) => n)),
];

const deliberatelyUnmapped =
  /^--eds_(infographic_|logo__|interactive__pressed_overlay_|ui_background__semitransparent$)/;

describe('classic EDS colour mapping', () => {
  it('maps every classic colour property except brand palettes and pressed overlays', () => {
    const mapped = new Set([
      ...Object.keys(classicColourVariables),
      ...Object.keys(classicOverlayColours),
    ]);
    const missing = classicProperties.filter(
      (name) => !mapped.has(name) && !deliberatelyUnmapped.test(name),
    );
    expect(classicProperties.length).toBeGreaterThan(100);
    expect(missing).toEqual([]);
    for (const name of mapped) expect(classicProperties).toContain(name);
  });

  it('only targets EDS colour variables defined by @equinor/eds-tokens', () => {
    const targets = [
      ...Object.values(classicColourVariables),
      ...Object.values(classicOverlayColours).flatMap((value) =>
        [...value.matchAll(/var\((--eds-[a-z0-9-]+)\)/g)].map(([, n]) => n),
      ),
    ];
    for (const target of targets) {
      expect(target).toMatch(/^--eds-color-/);
      expect(edsCss).toContain(`${target}:`);
    }
  });

  it('declares EDS variables only, without literal colours or fallbacks', () => {
    for (const line of classicColourDeclarations().split('\n')) {
      expect(line).toMatch(
        /^--eds_[a-z0-9_]+: (var\(--eds-color-[a-z0-9-]+\)|color-mix\(in srgb, var\(--eds-color-[a-z0-9-]+\) \d+%, transparent\));$/,
      );
    }
  });

  it('keeps the classic scrim translucent and the overlay dark', () => {
    // --eds-color-bg-backdrop is opaque, so it must be mixed with transparency.
    expect(classicScrimColour).toBe(
      'color-mix(in srgb, var(--eds-color-bg-backdrop) 60%, transparent)',
    );
    expect(classicOverlayColour).toBe(
      'color-mix(in srgb, var(--eds-color-bg-neutral-canvas) 90%, transparent)',
    );
    expect(classicOverlayColours).toEqual({
      '--eds_ui_background__scrim': classicScrimColour,
      '--eds_ui_background__overlay': classicOverlayColour,
    });
    expect(classicColourDeclarations()).not.toContain('var(--eds-color-bg-backdrop);');
  });

  it('gives overlay components light text from a dark-only property', () => {
    const css = classicOverlayTextStyles.replace(/\s/g, '');
    expect(css).toBe(
      '[role="tooltip"],[role="alert"][popover]{--eds_text__static_icons__primary_white:var(--eds_text__static_icons__default);}',
    );
    // The referenced property is mapped in dark mode only, so light mode keeps the classic white.
    expect(classicColourVariables['--eds_text__static_icons__default']).toBe(
      '--eds-color-text-neutral-strong',
    );
    expect(classicColourSchemeStyles().replace(/\s/g, '')).toContain(css);
  });

  it('applies the mapping in dark mode only and resets it in nested light mode', () => {
    const css = classicColourSchemeStyles().replace(/\s/g, '');
    const declarations = classicColourDeclarations().replace(/\s/g, '');
    expect(css).toContain(`[data-color-scheme="dark"]{${declarations}}`);
    expect(css).toContain(
      `@media(prefers-color-scheme:dark){:root:not([data-color-scheme="light"]){${declarations}}}`,
    );
    expect(css).toContain('[data-color-scheme="light"]{--eds_text__static_icons__default:initial;');
    expect(css).not.toMatch(/(^|})(:root|html)[,{]/);
  });
});
