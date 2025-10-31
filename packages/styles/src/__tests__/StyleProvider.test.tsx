/**
 * @fileoverview Tests for StylesProvider component
 *
 * StylesProvider creates isolated styling scopes. This is critical for:
 * - Preventing CSS class name collisions between modules
 * - Supporting dynamically loaded components
 * - Micro-frontend architectures where different apps share the same page
 *
 * Key feature: Each StylesProvider can have a "seed" that prefixes all class names,
 * ensuring that even if two modules use the same style names, they won't collide.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { StylesProvider } from '../StyleProvider';
import { createGenerateClassName } from '../utils/class-name-generator';
import { StylesContext } from '../utils/contexts';
import { makeStyles } from '../make-styles';
import { ThemeProvider } from '../ThemeProvider';

const mockTheme = {
  colors: {
    primary: 'blue',
  },
};

beforeEach(() => {
  document.head.innerHTML = '';
});

afterEach(() => {
  document.head.innerHTML = '';
});

describe('StylesProvider - Styling scope isolation', () => {
  it('should render child components normally', () => {
    // WHAT: StylesProvider is just a wrapper - it doesn't affect rendering
    // WHY: It only provides context, doesn't change how React renders

    const { container } = render(
      <StylesProvider>
        <div data-testid="child">Test</div>
      </StylesProvider>,
    );

    expect(screen.getByTestId('child')).toBeDefined();
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('should provide default styling configuration to child components', () => {
    // WHAT: StylesProvider provides JSS instance and class name generator via context
    // WHY: Child components need this to generate styles

    const TestComponent = () => {
      const context = useContext(StylesContext);
      // Verify context has all required properties
      expect(context.jss).toBeDefined(); // JSS instance for creating stylesheets
      expect(context.generateClassName).toBeDefined(); // Function to generate class names
      expect(context.sheetsManager).toBeDefined(); // Manager for caching stylesheets
      return <div>Test</div>;
    };

    render(
      <StylesProvider>
        <TestComponent />
      </StylesProvider>,
    );
  });

  it('should allow custom class name generator to be provided', () => {
    // WHAT: You can provide your own function for generating class names
    // WHY: Custom naming schemes or integration with other tools

    const customGenerate = createGenerateClassName('custom');

    const TestComponent = () => {
      const context = useContext(StylesContext);
      // Verify custom generator is used
      expect(context.generateClassName).toBe(customGenerate);
      return <div>Test</div>;
    };

    render(
      <StylesProvider generateClassName={customGenerate}>
        <TestComponent />
      </StylesProvider>,
    );
  });

  it('should create isolated scope when seed is provided (prevents class name collisions)', () => {
    // WHAT: Seed prefix creates a unique namespace for class names
    // WHY: Critical for preventing CSS collisions when modules share same style names
    // EXAMPLE: Module A and Module B both use "root" class - with seeds they become "moduleA-root-1" and "moduleB-root-1"

    const TestComponent = () => {
      const context = useContext(StylesContext);
      const className = context.generateClassName({ key: 'test' });
      // Verify seed prefix is included in class name
      expect(className).toContain('seed-prefix');
      return <div>Test</div>;
    };

    render(
      <StylesProvider seed="seed-prefix">
        <TestComponent />
      </StylesProvider>,
    );
  });

  it('should allow custom JSS instance to be provided', async () => {
    // WHAT: You can provide your own JSS instance with custom plugins
    // WHY: Advanced use cases requiring custom JSS configuration

    const { create } = await import('jss');
    const customJss = create();

    const TestComponent = () => {
      const context = useContext(StylesContext);
      // Verify custom JSS instance is used
      expect(context.jss).toBe(customJss);
      return <div>Test</div>;
    };

    render(
      <StylesProvider jss={customJss}>
        <TestComponent />
      </StylesProvider>,
    );
  });

  it('should inherit styling configuration from parent StylesProvider when nested', () => {
    // WHAT: Nested StylesProviders inherit from parent if not overridden
    // WHY: Allows gradual customization without re-specifying everything
    // EXAMPLE: App-level StylesProvider with module-level nested one

    const parentGenerate = createGenerateClassName('parent');

    const TestComponent = () => {
      const context = useContext(StylesContext);
      // Child inherits parent's generator
      expect(context.generateClassName).toBe(parentGenerate);
      return <div>Test</div>;
    };

    render(
      <StylesProvider generateClassName={parentGenerate}>
        <StylesProvider>
          <TestComponent />
        </StylesProvider>
      </StylesProvider>,
    );
  });

  it('should allow custom sheets manager to be provided', () => {
    // WHAT: You can provide your own sheets manager instance
    // WHY: Advanced use cases requiring custom caching behavior

    const customSheetsManager = new Map();

    const TestComponent = () => {
      const context = useContext(StylesContext);
      // Verify custom manager is used
      expect(context.sheetsManager).toBe(customSheetsManager);
      return <div>Test</div>;
    };

    render(
      <StylesProvider sheetsManager={customSheetsManager}>
        <TestComponent />
      </StylesProvider>,
    );
  });

  it('should generate different class names for nested providers with same styles (CRITICAL: prevents CSS collisions)', () => {
    // WHAT: Two components using identical styles in different scopes get different class names
    // WHY: This is the core feature - prevents CSS collisions in micro-frontends
    // REAL-WORLD: Module A loads Button component, Module B loads Button component with same styles
    //            Without isolation, they'd collide. With seeds, they're isolated.

    // Same styles used in both scopes
    const sharedStyles = {
      root: {
        color: 'red',
        padding: '10px',
      },
      button: {
        backgroundColor: 'blue',
      },
    };

    const useStyles1 = makeStyles(sharedStyles, { name: 'Component1' });
    const useStyles2 = makeStyles(sharedStyles, { name: 'Component2' });

    const Component1 = () => {
      const classes = useStyles1({});
      return (
        <div data-testid="comp1" className={classes.root}>
          Component 1
        </div>
      );
    };

    const Component2 = () => {
      const classes = useStyles2({});
      return (
        <div data-testid="comp2" className={classes.root}>
          Component 2
        </div>
      );
    };

    render(
      <ThemeProvider theme={mockTheme}>
        <StylesProvider seed="scope1">
          <Component1 />
          <StylesProvider seed="scope2">
            <Component2 />
          </StylesProvider>
        </StylesProvider>
      </ThemeProvider>,
    );

    const comp1 = screen.getByTestId('comp1');
    const comp2 = screen.getByTestId('comp2');

    const className1 = comp1.className;
    const className2 = comp2.className;

    // CRITICAL ASSERTION: Class names MUST be different (no collisions)
    expect(className1).toBeDefined();
    expect(className2).toBeDefined();
    expect(className1).not.toBe(className2);

    // Verify both class names contain their respective seeds (isolation)
    expect(className1).toContain('scope1');
    expect(className2).toContain('scope2');

    // Verify class names follow expected format: seed-prefix-classNamePrefix-key-counter
    expect(className1).toMatch(/^scope1-.+-root-\d+$/);
    expect(className2).toMatch(/^scope2-.+-root-\d+$/);

    // Verify styles are injected separately in DOM (each scope has its own CSS)
    const styles = Array.from(document.head.querySelectorAll('style'));
    expect(styles.length).toBeGreaterThan(0);

    // Each component should have its own generated class name in the CSS
    const styleText = styles.map((s) => s.textContent || '').join('');
    expect(styleText).toContain(className1);
    expect(styleText).toContain(className2);
  });

  it('should isolate class names when nested StylesProviders use different seeds', () => {
    // WHAT: Different seeds create different class name prefixes
    // WHY: Each scope gets its own namespace, preventing collisions
    // EXAMPLE: Main app uses "app-" prefix, dynamic module uses "module-" prefix

    const styles = {
      root: {
        color: 'blue',
      },
    };

    // Create separate style hooks for each scope
    const useOuterStyles = makeStyles(styles, { name: 'OuterComponent' });
    const useInnerStyles = makeStyles(styles, { name: 'InnerComponent' });

    const InnerComponent = () => {
      const classes = useInnerStyles({});
      return (
        <div data-testid="inner" className={classes.root}>
          Inner
        </div>
      );
    };

    const OuterComponent = () => {
      const classes = useOuterStyles({});
      return (
        <div data-testid="outer" className={classes.root}>
          Outer
        </div>
      );
    };

    render(
      <ThemeProvider theme={mockTheme}>
        <StylesProvider seed="outer-scope">
          <OuterComponent />
          <StylesProvider seed="inner-scope">
            <InnerComponent />
          </StylesProvider>
        </StylesProvider>
      </ThemeProvider>,
    );

    const outer = screen.getByTestId('outer');
    const inner = screen.getByTestId('inner');

    const outerClassName = outer.className;
    const innerClassName = inner.className;

    // Verify: Different seeds produce different class names
    expect(outerClassName).toBeDefined();
    expect(innerClassName).toBeDefined();
    expect(outerClassName).not.toBe(innerClassName);

    // Verify: Each scope's prefix is included
    expect(outerClassName).toContain('outer-scope');
    expect(innerClassName).toContain('inner-scope');

    // Verify: Class names follow expected format
    expect(outerClassName).toMatch(/^outer-scope-.+-root-\d+$/);
    expect(innerClassName).toMatch(/^inner-scope-.+-root-\d+$/);
  });

  it('should prevent class name collisions in dynamically loaded components (micro-frontend scenario)', () => {
    // WHAT: Simulates real-world scenario where a dynamically loaded module uses same styles as main app
    // WHY: This is a common problem in micro-frontends - modules might share component names/styles
    // REAL-WORLD: Main app loads Dashboard. Dashboard loads Plugin. Both use Button component with same styles.
    //            Without isolation, Button styles would collide. With seeds, they're isolated.

    // Same styles used in both scopes (simulating shared component library)
    const baseStyles = {
      container: {
        padding: '20px',
        margin: '10px',
      },
      title: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
    };

    const useBaseStyles = makeStyles(baseStyles, { name: 'BaseComponent' });
    const useDynamicStyles = makeStyles(baseStyles, { name: 'DynamicComponent' });

    const BaseComponent = () => {
      const classes = useBaseStyles({});
      return (
        <div data-testid="base">
          <div data-testid="base-container" className={classes.container}>
            Base Container
          </div>
          <div data-testid="base-title" className={classes.title}>
            Base Title
          </div>
        </div>
      );
    };

    const DynamicComponent = () => {
      const classes = useDynamicStyles({});
      return (
        <div data-testid="dynamic">
          <div data-testid="dynamic-container" className={classes.container}>
            Dynamic Container
          </div>
          <div data-testid="dynamic-title" className={classes.title}>
            Dynamic Title
          </div>
        </div>
      );
    };

    render(
      <ThemeProvider theme={mockTheme}>
        {/* Main app scope */}
        <StylesProvider seed="main-app">
          <BaseComponent />
        </StylesProvider>
        {/* Dynamically loaded module scope */}
        <StylesProvider seed="dynamic-module">
          <DynamicComponent />
        </StylesProvider>
      </ThemeProvider>,
    );

    const baseContainer = screen.getByTestId('base-container');
    const dynamicContainer = screen.getByTestId('dynamic-container');
    const baseTitle = screen.getByTestId('base-title');
    const dynamicTitle = screen.getByTestId('dynamic-title');

    // Verify: All class names exist (components render correctly)
    expect(baseContainer.className).toBeDefined();
    expect(dynamicContainer.className).toBeDefined();
    expect(baseTitle.className).toBeDefined();
    expect(dynamicTitle.className).toBeDefined();

    // CRITICAL: Verify NO collisions - all class names must be unique
    // If they collided, CSS would apply wrong styles to wrong components
    const allClassNames = [
      baseContainer.className,
      dynamicContainer.className,
      baseTitle.className,
      dynamicTitle.className,
    ];

    const uniqueClassNames = new Set(allClassNames);
    expect(uniqueClassNames.size).toBe(allClassNames.length); // All should be unique

    // Verify: Each scope's prefix is included (isolation working)
    expect(baseContainer.className).toContain('main-app');
    expect(dynamicContainer.className).toContain('dynamic-module');
    expect(baseTitle.className).toContain('main-app');
    expect(dynamicTitle.className).toContain('dynamic-module');

    // Verify: Class names follow expected format
    expect(baseContainer.className).toMatch(/^main-app-.+-container-\d+$/);
    expect(dynamicContainer.className).toMatch(/^dynamic-module-.+-container-\d+$/);
    expect(baseTitle.className).toMatch(/^main-app-.+-title-\d+$/);
    expect(dynamicTitle.className).toMatch(/^dynamic-module-.+-title-\d+$/);
  });
});
