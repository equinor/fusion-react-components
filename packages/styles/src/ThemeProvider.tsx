import { useContext, useMemo, type ReactNode } from 'react';
import type { ReactElement } from 'react';
import { styles as defaultTheme } from '@equinor/fusion-web-theme';
import { ThemeContext } from './utils/contexts';

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
 */
export interface ThemeProviderProps {
  /** Child components that will receive the theme context */
  children?: ReactNode;
  /** Theme object or function that receives outer theme and returns new theme */
  theme: unknown | ((outerTheme: unknown) => unknown);
}

/**
 * Provides theme values to child components
 *
 * This component wraps children with a theme context and the fwc-theme web component.
 * When nested, the theme can be a function that receives the outer theme and returns
 * a merged or customized theme.
 *
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
 */
export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const { children, theme: localTheme } = props;
  // Get theme from parent ThemeProvider (if nested)
  const outerTheme = useContext(ThemeContext);

  // Resolve theme: if function, call with outer theme; otherwise use directly or default
  const theme = useMemo(() => {
    if (typeof localTheme === 'function') {
      // Theme function receives outer theme and returns new theme (enables theme composition)
      return localTheme(outerTheme);
    }
    // Use provided theme or fall back to default
    return localTheme ?? defaultTheme;
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
 * @template Theme - The type of the theme (defaults to unknown)
 * @returns The current theme value or null if no ThemeProvider is present
 *
 * @example
 * ```tsx
 * function Component() {
 *   const theme = useTheme<MyTheme>();
 *   return <div style={{ color: theme?.colors.primary }}>Hello</div>;
 * }
 * ```
 */
export function useTheme<Theme = unknown>(): Theme | null {
  const theme = useContext(ThemeContext);
  return theme as Theme | null;
}

export default ThemeProvider;
