import type { StyleRules } from './types';

/**
 * Type-safe helper function for creating style rules
 *
 * This function provides better TypeScript inference for style objects.
 * It's mainly a type assertion helper that ensures proper typing.
 *
 * @template ClassKey - The string literal type for class keys
 * @template Props - The props type for dynamic styles
 *
 * @param styles - Optional style rules object
 * @returns The same styles object with proper type inference, or never if styles is undefined
 *
 * @example
 * ```tsx
 * import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
 *
 * const useStyles = makeStyles((theme) =>
 *   createStyles({
 *     root: {
 *       color: theme.colors.text.static_icons__default.getVariable('color'),
 *     },
 *     button: {
 *       padding: theme.spacing.comfortable.medium.getVariable('padding'),
 *     }
 *   }),
 *   { name: 'MyComponent' }
 * );
 *
 * function Component() {
 *   const classes = useStyles();
 *   return (
 *     <div className={classes.root}>
 *       <button className={classes.button}>Click me</button>
 *     </div>
 *   );
 * }
 * ```
 */
// Overload to preserve literal key types from object literals
// This overload preserves exact key types when using object literals
export function createStyles<
  // biome-ignore lint/suspicious/noExplicitAny: T needs to accept any record shape to preserve exact literal key types from object literals
  T extends Record<string, any>,
>(styles: T): T;
// Fallback for dynamic styles with explicit Props type
// This overload handles StyleRules with explicit Props and ClassKey types
export function createStyles<ClassKey extends string, Props extends {} = {}>(
  styles?: StyleRules<Props, ClassKey>,
): StyleRules<Props, ClassKey> | never;
// Implementation
// Type assertion is safe because StyleRules is compatible with Record<string, any>
export function createStyles<
  ClassKey extends string,
  Props extends {} = {},
  // biome-ignore lint/suspicious/noExplicitAny: Union type needs Record<string, any> to accept both StyleRules and plain objects for overload compatibility
>(styles?: StyleRules<Props, ClassKey> | Record<string, any>): StyleRules<Props, ClassKey> | never {
  return styles as unknown as StyleRules<Props, ClassKey>;
}
