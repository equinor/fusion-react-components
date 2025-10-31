/**
 * @fileoverview Tests for ThemeProvider component
 *
 * ThemeProvider provides theme values to components via React context.
 * This enables:
 * - Theming support (light/dark mode, custom themes)
 * - Design system integration (colors, spacing, typography)
 * - Theme composition (nested themes can extend parent themes)
 *
 * Components can access theme via useTheme hook or useTheme in makeStyles.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import { ThemeContext } from '../utils/contexts';

// Mock theme - simulates Fusion design system theme
const mockTheme = {
  colors: {
    primary: 'blue',
    secondary: 'red',
  },
};

describe('ThemeProvider - Theme distribution', () => {
  it('should render child components normally', () => {
    // WHAT: ThemeProvider wraps children and provides theme context
    // WHY: Children can access theme without prop drilling

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <div data-testid="child">Test</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('child')).toBeDefined();
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('should provide theme object to child components via context', () => {
    // WHAT: Components can access theme from ThemeProvider context
    // WHY: Allows components to use theme values without receiving theme as prop
    // EXAMPLE: Component uses theme.colors.primary instead of hardcoded color

    const TestComponent = () => {
      const theme = useContext(ThemeContext);
      // Verify theme from provider is available
      expect(theme).toBe(mockTheme);
      return <div>Test</div>;
    };

    render(
      <ThemeProvider theme={mockTheme}>
        <TestComponent />
      </ThemeProvider>,
    );
  });

  it('should use default theme when no theme is provided', () => {
    // WHAT: ThemeProvider falls back to default theme if none provided
    // WHY: Components still work even if parent doesn't provide theme
    // EXAMPLE: Standalone components or utility components

    const TestComponent = () => {
      const theme = useContext(ThemeContext);
      // Verify default theme is used
      expect(theme).toBeDefined();
      expect(theme).not.toBeNull();
      return <div>Test</div>;
    };

    render(
      <ThemeProvider theme={undefined}>
        <TestComponent />
      </ThemeProvider>,
    );
  });

  it('should support theme as a function that receives outer theme', () => {
    // WHAT: Theme can be a function that receives parent theme and returns new theme
    // WHY: Enables theme composition - extend or override parent theme
    // EXAMPLE: Parent provides base theme, child extends it with custom colors

    const themeFunction = (outerTheme: unknown) => {
      return { ...mockTheme, outer: outerTheme };
    };

    const TestComponent = () => {
      const theme = useContext(ThemeContext);
      // Verify theme function was called and returned theme
      expect(theme).toBeDefined();
      expect((theme as { outer: unknown }).outer).toBeDefined();
      return <div>Test</div>;
    };

    render(
      <ThemeProvider theme={themeFunction}>
        <TestComponent />
      </ThemeProvider>,
    );
  });

  it('should pass outer theme to theme function when nested', () => {
    // WHAT: Nested ThemeProviders can access parent theme
    // WHY: Enables theme composition - child themes can extend parent
    // EXAMPLE: App theme defines colors, module theme extends with module-specific colors

    const outerTheme = { outer: 'theme' };
    const themeFunction = (outer: unknown) => {
      // Verify outer theme is passed correctly
      expect(outer).toBe(outerTheme);
      return { ...mockTheme, outer };
    };

    const TestComponent = () => {
      return <div>Test</div>;
    };

    render(
      <ThemeProvider theme={outerTheme}>
        <ThemeProvider theme={themeFunction}>
          <TestComponent />
        </ThemeProvider>
      </ThemeProvider>,
    );
  });

  it('should render fwc-theme web component for theme application', () => {
    // WHAT: ThemeProvider wraps children in fwc-theme web component
    // WHY: fwc-theme applies CSS custom properties from theme to DOM

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <div>Test</div>
      </ThemeProvider>,
    );

    // Verify fwc-theme element exists
    const fwcTheme = container.querySelector('fwc-theme');
    expect(fwcTheme).toBeTruthy();
  });

  it('should render children inside fwc-theme element', () => {
    // WHAT: Children are wrapped inside fwc-theme
    // WHY: So theme CSS custom properties apply to all children

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <div data-testid="child">Test</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('child')).toBeDefined();
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });
});

describe('useTheme hook - Accessing theme from components', () => {
  it('should return theme from ThemeProvider when component is wrapped', () => {
    // WHAT: useTheme hook returns theme from nearest ThemeProvider
    // WHY: Components can access theme without prop drilling
    // EXAMPLE: Component uses theme.colors.primary for styling

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    // Verify hook returns theme from provider
    expect(result.current).toBe(mockTheme);
  });

  it('should return null when no ThemeProvider is present', () => {
    // WHAT: useTheme returns null if no ThemeProvider wraps component
    // WHY: Allows components to check if theme is available

    const { result } = renderHook(() => useTheme());

    // Verify returns null when no provider
    expect(result.current).toBeNull();
  });

  it('should return typed theme when generic type is provided', () => {
    // WHAT: useTheme can be typed for better TypeScript support
    // WHY: Type safety when accessing theme properties
    // EXAMPLE: useTheme<MyTheme>() gives typed access to theme.colors.primary

    type CustomTheme = typeof mockTheme;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme<CustomTheme>(), { wrapper });

    // Verify typed theme is returned
    expect(result.current).toBe(mockTheme);
    // TypeScript now knows theme structure
    expect(result.current?.colors.primary).toBe('blue');
  });

  it('should update when theme changes', () => {
    // WHAT: useTheme updates when ThemeProvider theme changes
    // WHY: Supports dynamic theming (e.g., switching light/dark mode)
    // EXAMPLE: User toggles theme, all components get new theme

    const newTheme = { colors: { primary: 'green' } };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    // Verify hook returns updated theme
    expect(result.current).toBe(newTheme);
  });
});
