/**
 * Creates a class name generator function for JSS
 *
 * This generator creates unique class names with optional seed prefixes.
 * The seed prefix is crucial for isolating styles in nested StylesProviders,
 * preventing class name collisions in dynamically loaded modules.
 *
 * Format:
 * - Development: `{seed}-{classNamePrefix}-{ruleKey}-{counter}`
 * - Production: `{seed}jss{counter}` (shorter for bundle size)
 *
 * @param seed - Optional seed prefix for class names (e.g., "my-module")
 * @returns A function that generates unique class names for each rule
 *
 * @example
 * ```tsx
 * const generate = createGenerateClassName('my-module');
 * generate({ key: 'root' }); // "my-module-makeStyles-root-1"
 * generate({ key: 'button' }); // "my-module-makeStyles-button-2"
 * ```
 */
export function createGenerateClassName(seed = '') {
  // Counter for unique class names (incremented per rule)
  let ruleCounter = 0;
  // Prefix with seed if provided (for scoping/isolation)
  const seedPrefix = seed ? `${seed}-` : '';

  return (rule: { key: string }, sheet?: unknown) => {
    // Extract name from sheet options (check both 'name' and 'classNamePrefix' for compatibility)
    // JSS may store it as either 'name' or 'classNamePrefix'
    const sheetOptions = sheet as
      | { options?: { name?: string; classNamePrefix?: string; link?: boolean } }
      | undefined;
    const classNamePrefix = sheetOptions?.options?.name || sheetOptions?.options?.classNamePrefix || 'makeStyles';

    if (process.env.NODE_ENV === 'production') {
      // Production: shorter class names for smaller bundle size
      ruleCounter += 1;
      return `${seedPrefix}jss${ruleCounter}`;
    }

    // Development: descriptive class names for easier debugging
    ruleCounter += 1;
    return `${seedPrefix}${classNamePrefix}-${rule.key}-${ruleCounter}`;
  };
}

/**
 * Default class name generator
 */
export const defaultGenerateClassName = createGenerateClassName();
