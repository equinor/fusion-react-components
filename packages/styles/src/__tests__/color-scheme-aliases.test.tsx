import { afterEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { StyleSheetManager } from 'styled-components';
// @ts-expect-error: EDS does not provide types for this
import edsVariables from '@equinor/eds-tokens/css/variables.css?raw';
import { colourSchemeAliasDeclarations } from '../color-scheme-aliases';
import { ThemeProvider } from '../ThemeProvider';

describe('colourSchemeAliasDeclarations', () => {
  it('extracts the EDS semantic aliases declared at the light root', () => {
    const aliases = colourSchemeAliasDeclarations(edsVariables);
    expect(aliases).toContain('--eds-color-bg-neutral-surface: var(--eds-color-neutral-2)');
    expect(aliases).toContain('--eds-color-text-neutral-strong: var(--eds-color-neutral-13)');
    // palette values are scheme-specific and must stay with EDS's own `[data-color-scheme]` blocks
    expect(aliases.every((alias) => /: var\(--eds-color-[\w-]+\)$/.test(alias))).toBe(true);
  });

  it('ignores declarations outside the light root blocks', () => {
    const source = [
      ':root, [data-color-scheme="light"] {',
      '  --eds-color-bg-floating: #fff;',
      '  --eds-color-bg-neutral-surface: var(--eds-color-neutral-2);',
      '}',
      '[data-color-scheme="dark"] {',
      '  --eds-color-neutral-2: #202223;',
      '}',
      '[data-color-appearance="accent"] {',
      '  --eds-color-bg-fill-muted-default: var(--eds-color-accent-3);',
      '}',
    ].join('\n');
    expect(colourSchemeAliasDeclarations(source)).toEqual([
      '--eds-color-bg-neutral-surface: var(--eds-color-neutral-2)',
    ]);
  });
});

describe('EdsTokens - nested colour scheme', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-color-scheme');
    document.body.removeAttribute('data-color-scheme');
  });

  it('re-declares semantic aliases on a dark body below a light root', () => {
    // portaled content renders in <body>; with a light <html> it must not inherit light aliases
    document.documentElement.setAttribute('data-color-scheme', 'light');
    document.body.setAttribute('data-color-scheme', 'dark');
    render(
      <StyleSheetManager disableCSSOMInjection>
        <ThemeProvider>
          <div />
        </ThemeProvider>
      </StyleSheetManager>,
    );

    const declared = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
      .filter((rule) => document.body.matches(rule.selectorText))
      .map((rule) => rule.style.getPropertyValue('--eds-color-bg-neutral-surface').trim())
      .filter(Boolean);

    expect(declared).toContain('var(--eds-color-neutral-2)');
  });
});
