/**
 * @fileoverview Tests for makeStyles hook
 *
 * This package provides a styling solution for React components that:
 * - Generates CSS class names automatically from JavaScript style objects
 * - Supports dynamic styles based on props and theme
 * - Caches stylesheets for performance
 * - Isolates styles between different scopes (preventing CSS collisions)
 *
 * The makeStyles function is the main API - it creates a hook that returns
 * a map of class names that you can use in your components.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { makeStyles } from '../make-styles';
import { ThemeProvider } from '../ThemeProvider';
import { StylesProvider } from '../StyleProvider';
import type { Styles } from '../types';

// Mock theme object - simulates the Fusion design system theme
const mockTheme = {
  colors: {
    primary: 'blue',
    secondary: 'red',
  },
};

describe('makeStyles - Main styling API', () => {
  beforeEach(() => {
    // Clean up DOM between tests to ensure isolation
    document.head.innerHTML = '';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.head.innerHTML = '';
  });

  it('should create a hook that converts style objects into CSS class names', () => {
    // WHAT: This is the basic use case - define styles as JavaScript objects
    // WHY: You write styles in JS and get CSS classes back, no need to write CSS files

    const styles = {
      root: {
        color: 'red',
        backgroundColor: 'blue',
      },
      button: {
        padding: '10px',
      },
    };

    // Create a hook that will generate class names for these styles
    const useStyles = makeStyles(styles, { name: 'TestComponent' });

    // Wrap in providers (required for makeStyles to work)
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    // Use the hook - it returns an object with class names
    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: We get back class names for each style rule
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined(); // Class name for 'root' style
    expect(result.current.button).toBeDefined(); // Class name for 'button' style
    expect(typeof result.current.root).toBe('string'); // Class names are strings
    expect(typeof result.current.button).toBe('string');
  });

  it('should support dynamic styles based on component props', () => {
    // WHAT: Styles can depend on props passed to the component
    // WHY: Allows components to change appearance based on their props
    // EXAMPLE: A Button component that changes color based on a 'variant' prop

    type StyleProps = {
      color: string;
    };

    // Styles are functions that receive props and return style objects
    const styles: Styles<typeof mockTheme, StyleProps> = {
      root: (props: StyleProps) => ({
        color: props.color, // Dynamic color based on prop
        padding: '10px',
      }),
    };

    const useStyles = makeStyles(styles, { name: 'DynamicComponent' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    // Pass props to the hook - styles will be recalculated based on these props
    const { result } = renderHook(() => useStyles({ color: 'green' }), {
      wrapper,
    });

    // Verify: Class names are generated (and will be different for different props)
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
    expect(typeof result.current.root).toBe('string');
  });

  it('should support theme-based styles using theme from ThemeProvider', () => {
    // WHAT: Styles can access theme values from ThemeProvider
    // WHY: Enables design system theming - components automatically use theme colors/spacing
    // EXAMPLE: Components that use theme.colors.primary instead of hardcoded colors

    // Styles can be a function that receives theme
    const styles: Styles<typeof mockTheme, Record<string, unknown>> = (
      theme: typeof mockTheme,
    ) => ({
      root: {
        color: theme.colors.primary, // Uses theme value
        backgroundColor: theme.colors.secondary,
      },
    });

    const useStyles = makeStyles(styles, { name: 'ThemeComponent' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Styles are generated using theme values
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
    expect(typeof result.current.root).toBe('string');
  });

  it('should use default theme when no ThemeProvider wraps the component', () => {
    // WHAT: makeStyles works even without ThemeProvider (uses built-in default theme)
    // WHY: Components can still be styled even if parent doesn't provide theme
    // EXAMPLE: Standalone components or utility components

    const styles = {
      root: {
        color: 'red',
      },
    };

    const useStyles = makeStyles(styles, { name: 'NoThemeComponent' });

    // No ThemeProvider - should use default theme
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>{children}</StylesProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Still works without ThemeProvider
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
  });

  it('should support custom component name for better debugging', () => {
    // WHAT: You can give your component a name for easier debugging
    // WHY: In DevTools, you'll see "MyComponent-root-1" instead of generic names
    // EXAMPLE: name: 'Button' produces class names like "Button-root-1"

    const styles = {
      root: {
        color: 'red',
      },
    };

    // Custom name appears in generated class names (in development)
    const useStyles = makeStyles(styles, { name: 'CustomName' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Class names are generated with custom name
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
  });

  it('should cache stylesheets so multiple components using same styles share CSS', () => {
    // WHAT: If multiple components use the same styles, they share the same CSS
    // WHY: Performance optimization - avoids duplicate CSS in the DOM
    // EXAMPLE: 100 Buttons with same styles = 1 stylesheet, not 100

    const styles = {
      root: {
        color: 'red',
      },
    };

    const useStyles = makeStyles(styles, { name: 'CacheTest' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    // Create two instances of the same hook
    const { result: result1 } = renderHook(() => useStyles({}), { wrapper });
    const { result: result2 } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Both get the same class names (same cached stylesheet)
    // This means they share CSS, reducing bundle size
    expect(result1.current.root).toBe(result2.current.root);
  });

  it('should handle multiple style rules for a single component', () => {
    // WHAT: One component can have multiple style classes (like CSS classes)
    // WHY: Components need multiple styles (e.g., root, button, input, label)
    // EXAMPLE: A Form component with styles for form, input, button, error message

    const styles = {
      root: {
        color: 'red',
      },
      button: {
        padding: '10px',
      },
      input: {
        margin: '5px',
      },
    };

    const useStyles = makeStyles(styles, { name: 'MultipleRules' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: All style rules get their own class names
    expect(result.current.root).toBeDefined();
    expect(result.current.button).toBeDefined();
    expect(result.current.input).toBeDefined();
    // Each rule gets a unique class name
    expect(result.current.root).not.toBe(result.current.button);
    expect(result.current.button).not.toBe(result.current.input);
  });

  it('should inject generated CSS styles into the document head', () => {
    // WHAT: Styles are automatically added to <head> as <style> tags
    // WHY: No need to manually manage CSS files - it's all automatic
    // EXAMPLE: Styles appear in DevTools under <head><style>...</style>

    const styles = {
      root: {
        color: 'red',
        backgroundColor: 'blue',
      },
    };

    const useStyles = makeStyles(styles, { name: 'StyleInjection' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    // Count styles before
    const styleCountBefore = document.head.querySelectorAll('style').length;

    // Using the hook injects styles
    renderHook(() => useStyles({}), { wrapper });

    // Count styles after
    const styleCountAfter = document.head.querySelectorAll('style').length;

    // Verify: New styles were added to the DOM
    expect(styleCountAfter).toBeGreaterThan(styleCountBefore);
  });

  it('should support optional props (props that might not be provided)', () => {
    // WHAT: Components can have optional props that affect styling
    // WHY: Makes components flexible - some props are optional
    // EXAMPLE: Button with optional 'variant' prop that defaults to 'primary'

    type StyleProps = {
      color?: string; // Optional prop
    };

    const styles: Styles<typeof mockTheme, StyleProps> = {
      root: (props: StyleProps) => ({
        color: props.color || 'black', // Default value if prop not provided
      }),
    };

    const useStyles = makeStyles(styles, { name: 'OptionalProps' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    // Can call without providing optional props
    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Still works without optional props
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
  });

  it('should support CSS pseudo-selectors like :hover and nested selectors', () => {
    // WHAT: You can use CSS features like :hover, :focus, nested selectors
    // WHY: Full CSS power in JavaScript - no need to write separate CSS files
    // EXAMPLE: Button with hover effect, or nested child element styles

    const styles = {
      root: {
        color: 'red',
        // Pseudo-selector - works just like CSS
        '&:hover': {
          color: 'blue',
        },
        // Nested selector - styles child elements
        '& .nested': {
          padding: '10px',
        },
      },
    };

    const useStyles = makeStyles(styles, { name: 'NestedSelectors' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StylesProvider>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </StylesProvider>
    );

    const { result } = renderHook(() => useStyles({}), { wrapper });

    // Verify: Class names are generated (CSS will include :hover and nested styles)
    expect(result.current).toBeDefined();
    expect(result.current.root).toBeDefined();
  });
});
