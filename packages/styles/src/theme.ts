import { type StyleProperty, styles as theme } from '@equinor/fusion-web-theme';

/**
 * Recursive type that allows deep partial merging with the base theme
 *
 * Supports:
 * - Top-level StyleProperty values
 * - Nested objects that can be partially merged
 * - Deep nested structures for partial theme extensions
 * - Extending Record types by adding new keys
 */
export type StyleDefinition = {
  [key: string]: StyleProperty | StyleDefinition | Record<string, unknown>;
};

/**
 * Type representing the Fusion theme structure
 *
 * This type is inferred from the imported theme object, ensuring type safety
 * when using theme values in makeStyles functions.
 *
 * Can be extended with custom properties by providing a type parameter.
 * The extension will be merged with the base theme at both type and runtime level.
 *
 * For top-level properties:
 * ```ts
 * type MyTheme = FusionTheme<{ customProperty: string }>;
 * ```
 *
 * For nested properties like colors, the extension merges with base properties:
 * ```ts
 * type MyTheme = FusionTheme<{ colors: { primary: ColorStyleProperty } }>;
 * // Result: colors contains both base theme colors AND primary
 * ```
 *
 * @template T - Additional properties to combine with the base Fusion theme
 */
export type FusionTheme<T extends StyleDefinition = StyleDefinition> = typeof theme & T;

/**
 * Deep merge helper function for runtime theme merging
 *
 * Recursively merges two objects, handling:
 * - Nested objects (merges recursively)
 * - Record types (spreads existing entries and merges new ones)
 * - StyleProperty instances (replaces instead of merging)
 * - Primitives (replaces with source value)
 *
 * @template T - The target object type
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns A new object with merged properties
 *
 * @internal This is an internal utility function used by createTheme
 */
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue) &&
      // Check if it's not a StyleProperty instance (they have a 'value' property)
      // StyleProperty instances should be replaced, not merged
      !('value' in targetValue && 'css' in targetValue && 'getAttributes' in targetValue)
    ) {
      // Both are objects - merge recursively
      // For Record types, this will spread existing entries and merge new ones
      // Nested objects are merged deeply to allow partial theme extensions
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>,
      ) as T[Extract<keyof T, string>];
    } else {
      // Replace with source value (for primitives or StyleProperty instances)
      // StyleProperty instances and primitives are replaced, not merged
      result[key] = sourceValue as T[Extract<keyof T, string>];
    }
  }
  return result;
}

/**
 * Creates a new theme by merging custom properties with a base theme
 *
 * Supports deep merging for nested properties like colors, typography, etc.
 * When no baseTheme is provided, uses the default Fusion theme.
 *
 * @template T - The extension type that extends StyleDefinition
 * @param customTheme - Partial theme extension to merge with base theme
 * @param baseTheme - Optional base theme to merge with (defaults to default Fusion theme)
 * @returns A new theme with base theme and custom properties merged
 *
 * @example
 * ```ts
 * const myTheme = createTheme({
 *   colors: {
 *     primary: new ColorStyleProperty(...)
 *   }
 * });
 * ```
 *
 * @example
 * ```ts
 * // Merge with a custom base theme (e.g., from outer ThemeProvider)
 * const extendedTheme = createTheme({
 *   colors: {
 *     ui: { background__danger: newColor }
 *   }
 * }, outerTheme);
 * ```
 */
export const createTheme = <T extends StyleDefinition = StyleDefinition>(
  customTheme?: T,
  baseTheme?: FusionTheme,
): FusionTheme<T> => {
  const base = baseTheme ?? theme;
  if (!customTheme) {
    return base as FusionTheme<T>;
  }
  return deepMerge(base, customTheme) as FusionTheme<T>;
};

/**
 * Default Fusion theme object
 *
 * This is the default theme used when no ThemeProvider is present.
 * It contains all the design tokens, colors, spacing, typography, etc.
 */
export { theme };
