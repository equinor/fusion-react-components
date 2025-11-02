import { useMemo, useContext, useEffect, useRef } from 'react';
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
 * When no custom name is provided, uses a simple default name for JSS
 * In production mode, returns a hash for shorter class names
 */
function generateUniqueName(customName?: string): string {
  if (process.env.NODE_ENV === 'production') {
    // In production: return a hash of name + scopeId (or just scopeId if no name)
    if (customName) {
      return simpleHash(`${customName}-${scopeId}`);
    }
    // Use a simple default name in production to avoid JSS issues
    return 'Styles';
  }

  // In development: return readable names
  if (customName) {
    return customName;
  }
  // Use a simple default name - JSS doesn't work well with long scopeIds as names
  // The scopeId is still used in the cache key to ensure uniqueness
  return 'Styles';
}

/**
 * Generate a cache key for stylesheet caching
 * Uses the scope ID to ensure isolation between different runtime scopes
 * This ensures that even without a custom name, different scopes get different cache entries
 */
function generateCacheKey(customName?: string): string {
  if (customName) {
    return `${customName}-${scopeId}`;
  }
  // Use scope ID for cache key to ensure uniqueness even without custom name
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
 * @returns A hook function that returns a Record<ClassKey, string>.
 *          The ClassKey type is inferred from the styles, ensuring type-safe access.
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
// Helper type to extract ClassKey from StyleRules
type ExtractClassKey<T> = T extends StyleRules<any, infer K> ? K : keyof T & string;

// Overload for callback functions - TypeScript infers return type from createStyles
export function makeStyles<
  Theme extends FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  SR extends Record<string, any> = Record<string, any>,
>(
  stylesOrCreator: (theme: Theme) => SR,
  options?: MakeStylesOptions,
): keyof Props extends never
  ? (props?: Props) => Record<ExtractClassKey<SR>, string>
  : (props: Props) => Record<ExtractClassKey<SR>, string>;
// Overload for direct StyleRules objects  
export function makeStyles<
  Theme extends FusionTheme = FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  SR extends Record<string, any> = Record<string, any>,
>(
  stylesOrCreator: SR,
  options?: MakeStylesOptions,
): keyof Props extends never
  ? (props?: Props) => Record<ExtractClassKey<SR>, string>
  : (props: Props) => Record<ExtractClassKey<SR>, string>;
// Implementation
export function makeStyles<
  Theme extends FusionTheme = FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string,
>(
  stylesOrCreator: Styles<Theme, Props, ClassKey>,
  options: MakeStylesOptions = {},
): keyof Props extends never
  ? (props?: Props) => Record<ClassKey, string>
  : (props: Props) => Record<ClassKey, string> {
  const { name, defaultTheme: optionsDefaultTheme = defaultTheme } = options;
  // Generate a unique name for this instance (stored in closure for this scope)
  // sheetName is used by JSS - should be simple to avoid issues
  const sheetName = generateUniqueName(name);
  // cacheKey is used for caching - includes scopeId for uniqueness
  const cacheKey = generateCacheKey(name);

  const useStyles = (props: Props = {} as Props): Record<ClassKey, string> => {
    // Get theme from context or use default
    const theme = useContext(ThemeContext) || optionsDefaultTheme;
    // Get JSS instance and class name generator from styles context
    const { jss, generateClassName } = useContext(StylesContext);

    // Store sheet info for cleanup - track if this is the first render
    const sheetInfoRef = useRef<{ cacheKey: string; instanceId?: string; isMounted: boolean } | null>(null);
    const isFirstRender = useRef(true);

    // Memoize class names to prevent unnecessary recalculations
    const classes = useMemo(() => {
      // Resolve styles: if it's a function, call it with theme; otherwise use directly
      const styles =
        typeof stylesOrCreator === 'function' ? stylesOrCreator(theme as Theme) : stylesOrCreator;

      // Get or create stylesheet from the sheet manager (handles caching)
      const sheetResult = defaultSheetManager.getOrCreateSheet(
        styles as StyleRules,
        theme,
        sheetName,
        jss,
        generateClassName,
        props,
        cacheKey,
        isFirstRender.current, // Only increment refs on first render
      );

      // On first render, store sheet info and increment refs
      if (isFirstRender.current) {
        sheetInfoRef.current = {
          cacheKey: sheetResult.cacheKey,
          instanceId: sheetResult.instanceId,
          isMounted: true,
        };
        isFirstRender.current = false;
      } else {
        // On subsequent renders, only update dynamic sheet if props changed
        // Clean up previous dynamic sheet if it exists
        if (sheetInfoRef.current?.instanceId) {
          defaultSheetManager.removeDynamicSheet(
            sheetInfoRef.current.cacheKey,
            sheetInfoRef.current.instanceId,
          );
        }
        // Update instanceId for new dynamic sheet
        if (sheetInfoRef.current) {
          sheetInfoRef.current.instanceId = sheetResult.instanceId;
        }
      }

      // Cast to Record<ClassKey, string> to preserve type information for createStyles
      // The ClassKey type is inferred from the styles object structure
      return sheetResult.classes as unknown as Record<ClassKey, string>;
    }, [theme, props, generateClassName, jss, stylesOrCreator]);

    // Cleanup on unmount - remove sheet reference
    useEffect(() => {
      return () => {
        // Clean up stylesheet when component unmounts
        if (sheetInfoRef.current?.isMounted) {
          defaultSheetManager.removeSheet(
            sheetInfoRef.current.cacheKey,
            sheetInfoRef.current.instanceId,
          );
          sheetInfoRef.current.isMounted = false;
        }
      };
    }, []);

    return classes;
  };

  // Type assertion: Return type depends on whether Props is required or optional
  // This allows TypeScript to infer the correct hook signature
  // Return type preserves ClassKey for type-safe access via createStyles
  return useStyles as keyof Props extends never
    ? (props?: Props) => Record<ClassKey, string>
    : (props: Props) => Record<ClassKey, string>;
};

export default makeStyles;
