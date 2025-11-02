import { useContext, useMemo, type ReactNode } from 'react';
import type { ReactElement } from 'react';
import { styles as defaultTheme } from '@equinor/fusion-web-theme';
import { ThemeContext } from './utils/contexts';
import type { FusionTheme } from './theme';

import '@equinor/fusion-wc-theme';
import type ThemeElement from '@equinor/fusion-wc-theme';
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'fwc-theme': React.DetailedHTMLProps<React.HTMLAttributes<ThemeElement>, ThemeElement>;
    }
  }
}

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
  const { children, theme: localTheme } = props;
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
      {/* Wrap children in fwc-theme web component for theme application */}
      <fwc-theme>{children}</fwc-theme>
    </ThemeContext.Provider>
  );
}

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
