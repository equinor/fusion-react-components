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
 * const styles = createStyles({
 *   root: { color: 'red' },
 *   button: { padding: '10px' }
 * });
 * ```
 */
export const createStyles = <ClassKey extends string, Props extends {}>(
  styles?: StyleRules<Props, ClassKey>,
): StyleRules<Props, ClassKey> | never => styles as unknown as StyleRules<Props, ClassKey>;
