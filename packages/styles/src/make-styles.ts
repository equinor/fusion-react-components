import { useMemo, useContext, useEffect } from 'react';
import { type FusionTheme, theme as defaultTheme } from './theme';
import type { Styles, StyleRules } from './types';
import { ThemeContext, StylesContext } from './utils/contexts';
import { defaultSheetManager, type ClassNameMap } from './utils/sheet-manager';

export type { ClassNameMap };

/**
 * Unique identifier for this module/runtime scope
 * Generated once when the module loads to ensure isolation between dynamically loaded apps
 * All makeStyles instances without a custom name will share this scope ID and reuse the same stylesheet
 */
const scopeId = `jss-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

/**
 * Generate a simple hash from a string (for production mode)
 * Returns a short alphanumeric hash
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to base36 and take first 8 characters for shorter hash
  return Math.abs(hash).toString(36).substring(0, 8);
}

/**
 * Generate a unique name for a makeStyles instance
 * Uses the scope ID to ensure isolation between different runtime scopes
 * When no custom name is provided, uses the scope ID so all instances share the same stylesheet
 * In production mode, returns a hash for shorter class names
 */
function generateUniqueName(customName?: string): string {
  if (process.env.NODE_ENV === 'production') {
    // In production: return a hash of name + scopeId (or just scopeId if no name)
    if (customName) {
      return simpleHash(`${customName}-${scopeId}`);
    }
    return simpleHash(scopeId);
  }

  // In development: return readable names
  if (customName) {
    return customName;
  }
  // Use scope ID directly - all makeStyles calls without a name will share the same stylesheet
  return scopeId;
}

/**
 * Options for configuring the makeStyles hook
 */
export interface MakeStylesOptions {
  /** Name prefix for generated class names (used for debugging) */
  name?: string;
  /** Default theme to use when no ThemeProvider is present */
  defaultTheme?: unknown;
}

/**
 * Creates a styles hook using JSS
 *
 * This function returns a hook that generates CSS class names from style definitions.
 * Styles can be static objects or functions that receive theme/props and return styles.
 *
 * @template Theme - The theme type (defaults to FusionTheme, but can be extended)
 * @template Props - The props type for dynamic styles
 * @template ClassKey - The class key type (auto-inferred from styles)
 *
 * @param stylesOrCreator - Either a static styles object or a function that receives theme and returns styles
 * @param options - Configuration options for the styles hook
 *
 * @returns A hook function that returns a ClassNameMap.
 *          If Props is empty, the hook accepts optional props.
 *          Otherwise, props are required.
 *
 * @example
 * ```tsx
 * const useStyles = makeStyles({
 *   root: { color: 'red' },
 *   button: { padding: '10px' }
 * });
 *
 * function Component() {
 *   const classes = useStyles();
 *   return <div className={classes.root}>Hello</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * const useStyles = makeStyles((theme) => ({
 *   root: { color: theme.colors.primary }
 * }));
 *
 * function Component() {
 *   const classes = useStyles();
 *   return <div className={classes.root}>Hello</div>;
 * }
 * ```
 */
export const makeStyles = <
  Theme extends FusionTheme = FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string,
>(
  stylesOrCreator: Styles<Theme, Props, ClassKey>,
  options: MakeStylesOptions = {},
): keyof Props extends never ? (props?: Props) => ClassNameMap : (props: Props) => ClassNameMap => {
  const { name, defaultTheme: optionsDefaultTheme = defaultTheme } = options;
  // Generate a unique name for this instance (stored in closure for this scope)
  const sheetName = generateUniqueName(name);

  const useStyles = (props: Props = {} as Props): ClassNameMap => {
    // Get theme from context or use default
    const theme = useContext(ThemeContext) || optionsDefaultTheme;
    // Get JSS instance and class name generator from styles context
    const { jss, generateClassName } = useContext(StylesContext);

    // Memoize class names to prevent unnecessary recalculations
    const classes = useMemo(() => {
      // Resolve styles: if it's a function, call it with theme; otherwise use directly
      const styles =
        typeof stylesOrCreator === 'function' ? stylesOrCreator(theme as Theme) : stylesOrCreator;

      // Get or create stylesheet from the sheet manager (handles caching)
      return defaultSheetManager.getOrCreateSheet(
        styles as StyleRules,
        theme,
        sheetName,
        jss,
        generateClassName,
        props,
      );
    }, [theme, props, generateClassName, jss, stylesOrCreator]);

    // Cleanup on unmount (currently no-op, but reserved for future cleanup logic)
    useEffect(() => {
      return () => {
        // Future: Could add cleanup logic here if needed (e.g., removing unused sheets)
      };
    }, []);

    return classes;
  };

  // Type assertion: Return type depends on whether Props is required or optional
  // This allows TypeScript to infer the correct hook signature
  return useStyles as keyof Props extends never
    ? (props?: Props) => ClassNameMap
    : (props: Props) => ClassNameMap;
};

export default makeStyles;
