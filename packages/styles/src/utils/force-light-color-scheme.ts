import { useLayoutEffect } from 'react';

/**
 * Attribute EDS reads to pick a colour scheme. Setting it to `light` on `<html>` makes
 * `@equinor/eds-tokens` ignore `prefers-color-scheme: dark`, and also covers portals/overlays
 * mounted under `<body>`.
 *
 * @see https://eds.equinor.com/docs/foundation/colour/getting_started/#colour-scheme-detection
 */
const COLOR_SCHEME_ATTRIBUTE = 'data-color-scheme';

// Reference count so several root ThemeProviders (or StrictMode double effects) share one
// override and the original value is only restored when the last one unmounts.
let activeCount = 0;
let previousValue: string | null = null;

/**
 * Forces the EDS light colour scheme on `document.documentElement` while mounted.
 *
 * Always overrides any existing `data-color-scheme` value, and restores the previous value
 * (or removes the attribute if it was absent) when the last consumer unmounts.
 *
 * TEMPORARY: Fusion does not support dark mode yet, so the OS/browser dark preference must not
 * load dark EDS variables. Remove once dark mode is supported (equinor/fusion-core-tasks#2120).
 *
 * @param enabled - Only the outermost ThemeProvider should enable the override.
 */
export const useForceLightColorScheme = (enabled: boolean): void => {
  // Layout effect applies the attribute before the browser paints, avoiding a dark flash.
  useLayoutEffect(() => {
    if (!enabled || typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    if (activeCount === 0) {
      previousValue = root.getAttribute(COLOR_SCHEME_ATTRIBUTE);
    }
    activeCount++;
    root.setAttribute(COLOR_SCHEME_ATTRIBUTE, 'light');

    return () => {
      activeCount--;
      if (activeCount > 0) {
        return;
      }
      if (previousValue === null) {
        root.removeAttribute(COLOR_SCHEME_ATTRIBUTE);
      } else {
        root.setAttribute(COLOR_SCHEME_ATTRIBUTE, previousValue);
      }
      previousValue = null;
    };
  }, [enabled]);
};
