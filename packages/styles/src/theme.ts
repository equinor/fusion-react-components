import { styles as theme } from '@equinor/fusion-web-theme';

/**
 * Type representing the Fusion theme structure
 *
 * This type is inferred from the imported theme object, ensuring type safety
 * when using theme values in makeStyles functions.
 */
export type FusionTheme = typeof theme;

/**
 * Default Fusion theme object
 *
 * This is the default theme used when no ThemeProvider is present.
 * It contains all the design tokens, colors, spacing, typography, etc.
 */
export { theme };
