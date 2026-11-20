/** Colour scheme options offered in the Storybook toolbar. */
export type StorybookColorScheme = 'light' | 'dark' | 'system';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Value for `data-color-scheme` on `<html>`.
 *
 * The Fusion portal always passes an explicit `data-color-scheme`, so `system` is resolved from
 * `prefers-color-scheme` instead of removing the attribute, as the portal does.
 */
export const resolveColorScheme = (
  scheme: StorybookColorScheme,
  prefersDark: boolean,
): 'light' | 'dark' => (scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme);

/**
 * Writes the resolved scheme to `root` and, while `system` is selected, follows OS changes.
 *
 * Setting it on the document root mirrors how the Fusion portal passes the scheme down, so
 * stories exercise inheritance, including content portaled to `document.body`.
 *
 * @returns cleanup that stops following OS changes
 */
export const applyColorScheme = (
  root: HTMLElement,
  scheme: StorybookColorScheme,
  matchMedia: (query: string) => MediaQueryList = window.matchMedia.bind(window),
): (() => void) => {
  const query = matchMedia(DARK_QUERY);
  const update = () => root.setAttribute('data-color-scheme', resolveColorScheme(scheme, query.matches));
  update();
  if (scheme !== 'system') return () => {};
  query.addEventListener('change', update);
  return () => query.removeEventListener('change', update);
};
