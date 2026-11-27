import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { type Browser, chromium } from 'playwright';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { tokens } from '@equinor/eds-tokens';
import { classicColourSchemeStyles } from '../../packages/styles/src/classic-colours';
import { applyColorScheme, resolveColorScheme, type StorybookColorScheme } from './color-scheme';

const require = createRequire(import.meta.url);
const previewHead = readFileSync(new URL('./preview-head.html', import.meta.url), 'utf8');
// Same styles as the preview: the EDS tokens and the classic colour mapping (both injected by
// ThemeProvider).
const stylesheets = `${readFileSync(require.resolve('@equinor/eds-tokens/css/variables'), 'utf8')}
${classicColourSchemeStyles()}`;
// Classic EDS 2.x components read these `var(--eds_*, <light value>)` token values.
const classicSurface = tokens.colors.ui.background__default.rgba;
const classicScrim = tokens.colors.ui.background__scrim.rgba;
const classicOverlay = tokens.colors.ui.background__overlay.rgba;
const classicWhite = tokens.colors.text.static_icons__primary_white.rgba;
const classicPrimary = tokens.colors.interactive.primary__resting.rgba;

test('preview head does not force a colour scheme', () => {
  const markup = previewHead.replace(/<!--[\s\S]*?-->/g, '');
  expect(markup).not.toMatch(/<html\b|data-color-scheme|color-scheme:|<script/);
});

test.each([
  ['light', false, 'light'],
  ['light', true, 'light'],
  ['dark', false, 'dark'],
  ['system', false, 'light'],
  ['system', true, 'dark'],
] as const)('resolves %s with prefers dark %s to %s', (scheme, prefersDark, result) => {
  expect(resolveColorScheme(scheme, prefersDark)).toBe(result);
});

describe('applyColorScheme', () => {
  const createMatchMedia = (matches: boolean) => {
    const listeners = new Set<() => void>();
    const query = {
      matches,
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    } as unknown as MediaQueryList;
    const change = (next: boolean) => {
      (query as { matches: boolean }).matches = next;
      for (const listener of listeners) listener();
    };
    return { matchMedia: vi.fn(() => query), change, listeners };
  };
  const createRoot = () => {
    const attributes = new Map<string, string>();
    return {
      setAttribute: (name: string, value: string) => attributes.set(name, value),
      get scheme() {
        return attributes.get('data-color-scheme');
      },
    };
  };

  test('always sets an explicit scheme and follows OS changes while system is selected', () => {
    const { matchMedia, change, listeners } = createMatchMedia(true);
    const root = createRoot();
    const stop = applyColorScheme(root as unknown as HTMLElement, 'system', matchMedia);
    expect(root.scheme).toBe('dark');
    change(false);
    expect(root.scheme).toBe('light');
    stop();
    expect(listeners.size).toBe(0);
  });

  test('ignores OS changes for an explicit scheme', () => {
    const { matchMedia, change, listeners } = createMatchMedia(false);
    const root = createRoot();
    applyColorScheme(root as unknown as HTMLElement, 'dark', matchMedia);
    change(true);
    expect(root.scheme).toBe('dark');
    expect(listeners.size).toBe(0);
  });
});

describe('EDS colours and classic components follow the toolbar colour scheme', () => {
  let browser: Browser;
  beforeAll(async () => {
    browser = await chromium.launch();
  });
  afterAll(async () => {
    await browser?.close();
  });

  /** Renders the preview body and a nested subtree the way the decorator and ThemeProvider do. */
  const render = async (scheme: StorybookColorScheme, prefers: 'light' | 'dark') => {
    const page = await browser.newPage({ colorScheme: prefers });
    try {
      await page.route('**/*', (route) => route.abort());
      await page.setContent(
        `<!doctype html><html lang="en" data-color-scheme="${resolveColorScheme(scheme, prefers === 'dark')}">` +
          `<head><style>${stylesheets}</style>${previewHead}</head>` +
          '<body><fwc-theme>' +
          '<div id="classic" style="background-color: var(--eds-color-bg-neutral-canvas)"></div>' +
          `<div id="mapped" style="background-color: ${classicSurface}"></div>` +
          `<div id="scrim" style="background-color: ${classicScrim}"></div>` +
          `<div data-color-scheme="light"><div id="nested" style="background-color: ${classicSurface}"></div></div>` +
          '<div id="surface" style="background-color: var(--eds-color-bg-neutral-surface)"></div>' +
          '</fwc-theme></body></html>',
      );
      const background = (selector: string) =>
        page.$eval(selector, (el) => getComputedStyle(el).backgroundColor);
      return {
        body: await background('body'),
        classic: await background('#classic'),
        mapped: await background('#mapped'),
        scrim: await background('#scrim'),
        nested: await background('#nested'),
        surface: await background('#surface'),
      };
    } finally {
      await page.close();
    }
  };

  test.each([
    ['system', 'light', 'light'],
    ['system', 'dark', 'dark'],
    ['light', 'dark', 'light'],
    ['dark', 'light', 'dark'],
  ] as const)('%s with prefers-color-scheme: %s renders %s', async (scheme, prefers, result) => {
    const light = await render('light', 'light');
    const dark = await render('dark', 'dark');
    expect(light.classic).not.toBe(dark.classic);
    // Classic components keep their light values in light mode and follow the mapping in dark.
    expect(light.mapped).toBe(light.surface);
    expect(dark.mapped).toBe(dark.surface);
    expect(dark.nested).toBe(light.mapped);
    expect(light.scrim).toBe('rgba(0, 0, 0, 0.4)');
    expect(dark.scrim).toMatch(/\/ 0\.6\)$/);
    expect(light.body).toBe(light.surface);
    expect(dark.body).toBe(dark.surface);
    expect(light.body).not.toBe(dark.body);
    expect(await render(scheme, prefers)).toEqual(result === 'light' ? light : dark);
  });
});

describe('classic white text stays readable on its background', () => {
  let browser: Browser;
  beforeAll(async () => {
    browser = await chromium.launch();
  });
  afterAll(async () => {
    await browser?.close();
  });

  // Same colour declarations as the classic Tooltip, Snackbar and contained Button.
  const overlay = `background-color: ${classicOverlay}; color: ${classicWhite}`;
  const button = `background-color: ${classicPrimary}; color: ${classicWhite}`;

  /** Returns the WCAG contrast of each element's text against its background over the page. */
  const contrasts = async (scheme: 'light' | 'dark') => {
    const page = await browser.newPage();
    try {
      await page.route('**/*', (route) => route.abort());
      await page.setContent(
        `<!doctype html><html lang="en" data-color-scheme="${scheme}">` +
          `<head><style>${stylesheets}</style>${previewHead}</head><body>` +
          `<div id="tooltip" role="tooltip" style="${overlay}">Tooltip</div>` +
          `<div id="snackbar" role="alert" popover="manual" style="${overlay}">Snackbar</div>` +
          `<button id="button" style="${button}">Button</button>` +
          `<div data-color-scheme="light"><div id="nested" role="tooltip" style="${overlay}">Tooltip</div></div>` +
          '</body></html>',
      );
      return await page.evaluate(() => {
        const context = document.createElement('canvas').getContext('2d', {
          willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        // Composites the colours over each other and returns the resulting relative luminance.
        const luminance = (...colours: string[]) => {
          context.clearRect(0, 0, 1, 1);
          for (const colour of colours) {
            context.fillStyle = colour;
            context.fillRect(0, 0, 1, 1);
          }
          const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].map((value) => {
            const channel = value / 255;
            return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const page = getComputedStyle(document.body).backgroundColor;
        return Object.fromEntries(
          ['tooltip', 'snackbar', 'button', 'nested'].map((id) => {
            const style = getComputedStyle(document.getElementById(id) as HTMLElement);
            const background = luminance(page, style.backgroundColor);
            const text = luminance(page, style.backgroundColor, style.color);
            const [high, low] = text > background ? [text, background] : [background, text];
            return [id, { contrast: (high + 0.05) / (low + 0.05), lightText: text > background }];
          }),
        );
      });
    } finally {
      await page.close();
    }
  };

  test.each(['light', 'dark'] as const)('%s', async (scheme) => {
    const result = await contrasts(scheme);
    for (const { contrast } of Object.values(result)) expect(contrast).toBeGreaterThanOrEqual(4.5);
    // Tooltips and snackbars are dark surfaces with light text in both schemes.
    expect(result.tooltip.lightText).toBe(true);
    expect(result.snackbar.lightText).toBe(true);
    expect(result.nested.lightText).toBe(true);
  });
});
