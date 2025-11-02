import { useContext, useMemo, type ReactNode } from 'react';
import type { ReactElement } from 'react';
import type { Jss } from 'jss';
import { StylesContext } from './utils/contexts';
import { createJssInstance } from './utils/jss-setup';
import { createGenerateClassName } from './utils/class-name-generator';

/**
 * Props for the StylesProvider component
 */
export interface StylesProviderProps {
  /** Child components that will receive the JSS context */
  children?: ReactNode;
  /** Disable automatic class name generation (unused, kept for API compatibility) */
  disableGeneration?: boolean;
  /** Custom class name generator function */
  generateClassName?: (rule: { key: string }, sheet?: unknown) => string;
  /** Inject styles first in the document (unused, kept for API compatibility) */
  injectFirst?: boolean;
  /** Custom JSS instance to use */
  jss?: Jss;
  /** Seed prefix for generated class names (creates isolated scope) */
  seed?: string;
  /** Sheets cache (unused, kept for API compatibility) */
  sheetsCache?: unknown;
  /** Custom sheets manager instance */
  sheetsManager?: Map<unknown, Map<unknown, unknown>>;
  /** Sheets registry (unused, kept for API compatibility) */
  sheetsRegistry?: unknown;
}

/**
 * Provides JSS configuration to child components
 *
 * This component creates an isolated styling scope. When nested, each provider
 * can have its own seed prefix, ensuring class names don't collide between scopes.
 * This is critical for dynamically loaded modules or micro-frontends.
 *
 * @param props - Configuration options for the styles provider
 * @returns A React element that provides JSS context to children
 *
 * @example
 * ```tsx
 * <StylesProvider seed="my-module">
 *   <App />
 * </StylesProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Nested providers with different seeds for isolation
 * <StylesProvider seed="main-app">
 *   <MainApp />
 *   <StylesProvider seed="dynamic-module">
 *     <DynamicModule />
 *   </StylesProvider>
 * </StylesProvider>
 * ```
 */
export function StylesProvider(props: StylesProviderProps): ReactElement {
  const {
    children,
    generateClassName: providedGenerateClassName,
    jss: providedJss,
    seed,
    sheetsManager: providedSheetsManager,
    ...localOptions
  } = props;

  // Get context from parent StylesProvider (if nested)
  // Allows nested providers to inherit or override parent configuration
  const outerOptions = useContext(StylesContext);

  // Determine which class name generator to use (priority: provided > seed > parent)
  // Memoization prevents recreating generator on every render
  const generateClassName = useMemo(() => {
    // If explicitly provided, use it
    if (providedGenerateClassName) return providedGenerateClassName;
    // If seed is provided, create a new generator with that seed (isolated scope)
    // Seed creates isolated scope for class names, preventing collisions
    if (seed) return createGenerateClassName(seed);
    // Otherwise, inherit from parent context
    return outerOptions.generateClassName;
  }, [providedGenerateClassName, seed, outerOptions.generateClassName]);

  // Determine which JSS instance to use (priority: provided > parent > default)
  // Allows custom JSS instances for testing or advanced use cases
  const jss = providedJss || outerOptions.jss || createJssInstance();
  // Use provided sheets manager or inherit from parent
  // Sheets manager is kept for API compatibility, but currently unused
  const sheetsManager = providedSheetsManager || outerOptions.sheetsManager;

  // Create context value with resolved options
  const context = {
    jss,
    generateClassName,
    sheetsManager,
    ...localOptions,
  };

  return <StylesContext.Provider value={context}>{children}</StylesContext.Provider>;
}

export default StylesProvider;
