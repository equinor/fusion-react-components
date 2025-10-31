/**
 * @fileoverview Test Suite for @equinor/fusion-react-styles
 * 
 * This test suite demonstrates what this package does and how it works.
 * By reading these tests, you can understand:
 * 
 * 1. **makeStyles** - The main API for creating styled components
 *    - Converts JavaScript style objects into CSS class names
 *    - Supports dynamic styles based on props and theme
 *    - Caches stylesheets for performance
 * 
 * 2. **StylesProvider** - Creates isolated styling scopes
 *    - Prevents CSS class name collisions between modules
 *    - Critical for micro-frontends and dynamically loaded components
 *    - Uses "seed" prefixes to create unique namespaces
 * 
 * 3. **ThemeProvider** - Provides theme values to components
 *    - Enables design system theming
 *    - Supports theme composition (nested themes)
 *    - Integrates with fwc-theme web component
 * 
 * 4. **Utilities** - Supporting functions
 *    - createGenerateClassName: Creates class name generators
 *    - createStyles: Type-safe style helper
 *    - theme: Fusion design system theme
 * 
 * KEY FEATURE: Style Isolation
 * When you have nested StylesProviders with different seeds, they generate
 * different class names even if they use the same styles. This prevents
 * CSS collisions - critical for modular applications.
 * 
 * Example:
 * - Module A with seed "moduleA" using style "root" → "moduleA-makeStyles-root-1"
 * - Module B with seed "moduleB" using style "root" → "moduleB-makeStyles-root-1"
 * - No collision! Each module gets its own CSS.
 */

// This file exists to document the test structure
// Actual tests are in individual test files

