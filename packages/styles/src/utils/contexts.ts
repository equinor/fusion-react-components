import { createContext } from 'react';
import type { Jss } from 'jss';
import { defaultJss } from './jss-setup';
import { defaultGenerateClassName } from './class-name-generator';

/**
 * Theme context for providing theme values throughout the component tree
 *
 * This context is provided by ThemeProvider and consumed by makeStyles hooks.
 * It allows components to access the current theme without prop drilling.
 */
export const ThemeContext = createContext<unknown>(null);

/**
 * Styles context value interface
 *
 * Contains all the JSS configuration needed for generating styles:
 * - jss: The JSS instance for creating stylesheets
 * - generateClassName: Function to generate unique class names
 * - sheetsManager: Manager for caching and reusing stylesheets
 */
export interface StylesContextValue {
  /** JSS instance for creating stylesheets */
  jss: Jss;
  /** Function to generate unique class names for style rules */
  generateClassName: (rule: { key: string }, sheet?: unknown) => string;
  /** Manager for caching and reusing stylesheets (unused, kept for API compatibility) */
  sheetsManager: Map<unknown, Map<unknown, unknown>>;
}

/**
 * Styles context for providing JSS configuration throughout the component tree
 *
 * This context is provided by StylesProvider and consumed by makeStyles hooks.
 * It allows components to access JSS configuration without prop drilling.
 * Each StylesProvider can override these values to create isolated scopes.
 *
 * Default values:
 * - jss: Default JSS instance with all plugins
 * - generateClassName: Default class name generator (no seed)
 * - sheetsManager: Empty map (unused, kept for API compatibility)
 */
export const StylesContext = createContext<StylesContextValue>({
  jss: defaultJss,
  generateClassName: defaultGenerateClassName,
  sheetsManager: new Map(),
});
