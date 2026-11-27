import { useContext, useMemo, type ReactElement, type ReactNode } from 'react';
import { styles as defaultTheme } from '@equinor/fusion-web-theme';
import { ThemeContext } from './utils/contexts';
import type { FusionTheme } from './theme';
import { EdsTokens } from './EdsTokens';

import '@equinor/fusion-wc-theme';
import type ThemeElement from '@equinor/fusion-wc-theme';
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'fwc-theme': React.DetailedHTMLProps<React.HTMLAttributes<ThemeElement>, ThemeElement> & {
        'color-scheme'?: ColorScheme;
      };
    }
  }
}

/**
 * Colour scheme applied by {@link ThemeProvider}.
 *
 * - `light` / `dark` force the EDS colour scheme for the provider subtree.
 * - `system` follows the user's `prefers-color-scheme` setting.
 */
export type ColorScheme = 'light' | 'dark' | 'system';

/**
 * Props for the ThemeProvider component
 *
 * @template T - Extended theme type that extends FusionTheme
 */
export interface ThemeProviderProps<T extends FusionTheme = FusionTheme> {
  /** Child components that will receive the theme context */
  children?: ReactNode;
  /** Theme object or function that receives outer theme and returns new theme */
  theme?: T | Partial<T> | ((outerTheme: T | null) => T);
  /**
   * Colour scheme for this subtree, resolved by the `fwc-theme` wrapper.
   *
   * When omitted, no attribute is set and the subtree inherits the scheme from its
   * ancestors (for example `data-color-scheme` on `<html>` set by the portal), or follows
   * `prefers-color-scheme` when no ancestor sets one.
   */
  colorScheme?: ColorScheme;
}

/**
 * Provides theme values to child components
 *
 * This component wraps children with a theme context and the fwc-theme web component.
 * When nested, the theme can be a function that receives the outer theme and returns
 * a merged or customized theme.
 *
 * Supports extending FusionTheme with custom properties for application-specific themes.
 *
 * @template T - Extended theme type that extends FusionTheme
 * @param props - Theme provider configuration
 * @returns A React element that provides theme context to children
 *
 * @example
 * ```tsx
 * <ThemeProvider theme={myTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Force dark mode, or follow the operating system setting
 * <ThemeProvider colorScheme="dark"><App /></ThemeProvider>
 * <ThemeProvider colorScheme="system"><App /></ThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Nested theme with function
 * <ThemeProvider theme={baseTheme}>
 *   <ThemeProvider theme={(outer) => ({ ...outer, custom: true })}>
 *     <App />
 *   </ThemeProvider>
 * </ThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Extended theme with custom properties
 * interface MyAppTheme extends FusionTheme {
 *   customProperty: string;
 * }
 *
 * const extendedTheme: MyAppTheme = {
 *   ...theme,
 *   customProperty: 'value'
 * };
 *
 * <ThemeProvider<MyAppTheme> theme={extendedTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider<T extends FusionTheme = FusionTheme>(
  props: ThemeProviderProps<T>,
): ReactElement {
  const { children, theme: localTheme, colorScheme } = props;
  // Get theme from parent ThemeProvider (if nested)
  const outerTheme = useContext(ThemeContext) as T | null;

  // Resolve theme: if function, call with outer theme; otherwise use directly or default
  // Memoization prevents unnecessary re-renders when dependencies haven't changed
  const theme = useMemo((): T => {
    if (typeof localTheme === 'function') {
      // Theme function receives outer theme and returns new theme (enables theme composition)
      // This allows nested themes to extend or override parent themes
      return localTheme(outerTheme);
    }
    // Use provided theme as-is, or fall back to default theme
    // Partial themes will be merged at the type level, but runtime uses provided theme directly
    // Type casting is safe because TypeScript ensures type compatibility
    return (localTheme ?? defaultTheme) as T;
  }, [localTheme, outerTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {/* Only add eds variables once, when there is no outer theme yet */}
      {outerTheme === null && <EdsTokens />}

      {/* Wrap children in fwc-theme web component for theme application */}
      <fwc-theme color-scheme={colorScheme}>{children}</fwc-theme>
    </ThemeContext.Provider>
  );
}

ThemeProvider.displayName = 'ThemeProvider';

/**
 * Hook to access the current theme from ThemeProvider context
 *
 * Supports extended themes that extend FusionTheme. When used with an extended theme,
 * the generic type parameter should match the theme type used in ThemeProvider.
 *
 * @template Theme - The type of the theme (defaults to FusionTheme, but can be extended)
 * @returns The current theme value or null if no ThemeProvider is present
 *
 * @example
 * ```tsx
 * function Component() {
 *   const theme = useTheme();
 *   if (!theme) {
 *     return <div>No theme available</div>;
 *   }
 *   return (
 *     <div style={{
 *       color: theme.colors.text.static_icons__default.getVariable('color')
 *     }}>
 *       Hello
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With extended theme type
 * interface MyAppTheme extends FusionTheme {
 *   customProperty: string;
 * }
 *
 * function Component() {
 *   const theme = useTheme<MyAppTheme>();
 *   return <div>{theme?.customProperty}</div>;
 * }
 * ```
 */
export function useTheme<Theme extends FusionTheme = FusionTheme>(): Theme | null {
  const theme = useContext(ThemeContext);
  return theme as Theme | null;
}

export default ThemeProvider;
