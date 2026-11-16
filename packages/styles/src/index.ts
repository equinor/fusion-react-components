export * from './make-styles';
export * from './create-styles';
export * from './theme';

export { createTheme, type FusionTheme, type StyleDefinition } from './theme';
export { createGenerateClassName } from './utils/class-name-generator';
export type { ClassNameMap } from './make-styles';

export { default as clsx } from 'clsx';
export { StylesProvider } from './StyleProvider';
export type { StylesProviderProps } from './StyleProvider';
export { ThemeProvider, useTheme } from './ThemeProvider';
export {
  classicColourDeclarations,
  classicColourSchemeStyles,
  classicColourVariables,
  classicOverlayColour,
  classicOverlayColours,
  classicOverlayTextStyles,
  classicScrimColour,
} from './classic-colours';
export type { ThemeProviderProps } from './ThemeProvider';

export type { StyleRules, StyleCSSProperties, Styles } from './types';
