/**
 * @fileoverview Tests for theme exports
 *
 * This module exports the Fusion design system theme and its TypeScript type.
 * The theme contains all design tokens: colors, spacing, typography, etc.
 */

import { describe, it, expect } from 'vitest';
import { theme, type FusionTheme } from '../theme';

describe('theme - Fusion design system theme', () => {
  it('should export theme object with design tokens', () => {
    // WHAT: theme object contains all Fusion design system values
    // WHY: Provides consistent colors, spacing, typography across the app
    // EXAMPLE: theme.colors.primary, theme.spacing.unit, theme.typography.fontFamily

    expect(theme).toBeDefined();
    expect(typeof theme).toBe('object');
  });

  it('should export FusionTheme type for TypeScript type safety', () => {
    // WHAT: FusionTheme type represents the structure of the theme
    // WHY: Provides type safety when using theme in makeStyles or components
    // EXAMPLE: const myStyles = (theme: FusionTheme) => ({ color: theme.colors.primary })

    // Type test - if this compiles, the type is exported correctly
    const testTheme: FusionTheme = theme;
    expect(testTheme).toBe(theme);
  });

  it('should have theme properties (design tokens)', () => {
    // WHAT: Theme object is not null/empty
    // WHY: Ensures theme is properly loaded from @equinor/fusion-web-theme

    // Basic check that theme has some expected structure
    expect(theme).not.toBeNull();
  });
});
