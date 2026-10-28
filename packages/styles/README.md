# @equinor/fusion-react-styles

[![npm version](https://badge.fury.io/js/%40equinor%2Ffusion-react-styles.svg)](https://www.npmjs.com/package/@equinor/fusion-react-styles)

A React styling library inspired by Material-UI's `makeStyles` API, built with JSS and designed for React 19 compatibility. This package provides a flexible, type-safe styling solution with support for theme-based styling, dynamic props, and scoped style isolation.

## Features

- ✅ **React 19 Compatible** - Built from the ground up for React 19
- ✅ **Type-Safe** - Full TypeScript support with intelligent type inference
- ✅ **Theme Integration** - Seamless integration with Fusion design system
- ✅ **Scoped Styles** - Prevent CSS class name collisions with `StylesProvider` seeds
- ✅ **Dynamic Styles** - Support for prop-based and theme-based styling
- ✅ **Performance** - Cached stylesheets and optimized JSS instance
- ✅ **Nested Selectors** - Full support for pseudo-selectors and nested rules

## Installation

```bash
npm install @equinor/fusion-react-styles
# or
pnpm add @equinor/fusion-react-styles
# or
yarn add @equinor/fusion-react-styles
```

### Peer Dependencies

- React `^18` or `^19`

## Quick Start

```tsx
import { makeStyles, ThemeProvider, theme } from '@equinor/fusion-react-styles';

const useStyles = makeStyles({
  root: {
    color: 'blue',
    padding: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
}, { name: 'MyComponent' });

function MyComponent() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Hello World</h1>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}
```

## Core Concepts

### 1. Creating Styles

Use `makeStyles` to create a styles hook that generates CSS class names. Always provide a `name` option for better performance and debugging:

```tsx
import { makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles({
  root: {
    color: 'red',
    padding: '16px',
  },
  button: {
    backgroundColor: 'blue',
    '&:hover': {
      backgroundColor: 'darkblue',
    },
  },
}, { name: 'MyComponent' });
```

### 2. Using Styles in Components

Call the hook inside your component to get class names:

```tsx
function Component() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <button className={classes.button}>Click me</button>
    </div>
  );
}
```

### 3. Dynamic Styles with Props

Styles can be functions that receive props. Pass props when calling the hook:

```tsx
interface ComponentProps {
  color: string;
  size: 'small' | 'large';
}

const useStyles = makeStyles({
  root: (props: ComponentProps) => ({
    color: props.color,
    padding: props.size === 'large' ? '24px' : '12px',
  }),
}, { name: 'DynamicComponent' });

function Component(props: ComponentProps) {
  const classes = useStyles(props);
  return <div className={classes.root}>Dynamic styling</div>;
}
```

### 4. Theme-Based Styles

Access theme values using theme functions. Theme properties are `StyleProperty` instances that require using the `getVariable()` method to extract CSS values:

```tsx
import { makeStyles, createStyles, theme } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((themeValue) =>
  createStyles({
    root: {
      color: themeValue.colors.text.static_icons__default.getVariable('color'),
      padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
      backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
    },
    button: {
      backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
      '&:hover': {
        backgroundColor: themeValue.colors.ui.background__hover.getVariable('color'),
      },
    },
  }),
  { name: 'ThemedComponent' }
);
```

**Important:** Theme properties (colors, spacing, etc.) are `StyleProperty` instances:
- **Colors**: Use `theme.colors.*.getVariable('color')` to get the color value as a CSS variable string
- **Spacing**: Use `theme.spacing.*.getVariable('padding')` to get the spacing value as a CSS variable string  
- **Typography**: Use `theme.typography.*.style.*` to access typography properties (e.g., `theme.typography.heading.h4.style.fontSize`)

Example:

```tsx
const useStyles = makeStyles((themeValue) =>
  createStyles({
    container: {
      // Color property - use getVariable('color')
      backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
      color: themeValue.colors.text.static_icons__default.getVariable('color'),
      
      // Spacing property - use getVariable('padding')
      padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
      marginTop: themeValue.spacing.comfortable.small.getVariable('padding'),
      
      // Typography - access style properties directly
      fontSize: themeValue.typography.paragraph.body_short.style.fontSize,
      fontWeight: themeValue.typography.heading.h4.style.fontWeight,
    },
  }),
  { name: 'Container' }
);
```

## API Reference

### `makeStyles(stylesOrCreator, options?)`

Creates a hook that generates CSS class names from style definitions.

**Parameters:**
- `stylesOrCreator`: Style rules object or a function `(theme) => StyleRules`
- `options.name`: **Required** name prefix for debugging and performance. Without it, all instances share the same cache key, causing performance issues.

**Returns:** A hook function that returns `Record<ClassKey, string>` where `ClassKey` is inferred from your style rules, providing type-safe access to class names.

**Examples:**

```tsx
// Static styles
const useStyles = makeStyles({
  root: { color: 'red' },
}, { name: 'MyComponent' });

// Theme-based styles
const useStyles = makeStyles((theme) => ({
  root: { 
    color: theme.colors.text.static_icons__default.getVariable('color'),
  },
}), { name: 'ThemedComponent' });

// Dynamic styles with props
const useStyles = makeStyles({
  root: (props: { color: string }) => ({
    color: props.color,
  }),
}, { name: 'DynamicComponent' });
```

### `createStyles(styles?)`

Type-safe helper for creating style rules. Improves TypeScript inference for class keys, enabling type-safe access to class names.

```tsx
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { 
      color: theme.colors.text.static_icons__default.getVariable('color'),
    },
    button: { 
      padding: theme.spacing.comfortable.medium.getVariable('padding'),
    },
  }),
  { name: 'Component' }
);

function Component() {
  const classes = useStyles();
  // TypeScript will error if you try to access classes.foo - it knows the exact keys!
  return <div className={classes.root}>...</div>;
}
```

**Benefits:**
- Type-safe class key access - TypeScript knows exactly which class keys exist
- Better autocompletion in IDEs
- Catches typos at compile time

### `ThemeProvider`

Provides theme context to child components. Supports nested themes and theme composition.

**Props:**
- `theme`: Theme object or function `(outerTheme) => theme`
- `children`: React nodes

**Example:**

```tsx
import { ThemeProvider, theme } from '@equinor/fusion-react-styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Nested theme composition
function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <ThemeProvider theme={(outer) => ({ ...outer, custom: true })}>
        <YourApp />
      </ThemeProvider>
    </ThemeProvider>
  );
}
```

### `useTheme<T>()`

Hook to access the current theme from `ThemeProvider` context.

```tsx
import { useTheme } from '@equinor/fusion-react-styles';

function Component() {
  const theme = useTheme<FusionTheme>();
  
  if (!theme) {
    return <div>No theme available</div>;
  }
  
  return (
    <div style={{ 
      color: theme.colors.text.static_icons__default.getVariable('color'),
    }}>
      Hello
    </div>
  );
}
```

### `createTheme(customTheme?, baseTheme?)`

Creates a new theme by merging custom properties with a base theme. Supports deep merging for nested properties like colors, typography, etc.

```tsx
import { createTheme, theme } from '@equinor/fusion-react-styles';
import type { FusionTheme } from '@equinor/fusion-react-styles';

interface ExtendedTheme extends FusionTheme {
  app: {
    borderRadius: string;
    sidebarWidth: string;
  };
}

const extendedTheme = createTheme<ExtendedTheme>({
  app: {
    borderRadius: '12px',
    sidebarWidth: '300px',
  },
}, theme);

// Use in ThemeProvider
<ThemeProvider theme={extendedTheme}>
  <App />
</ThemeProvider>
```

### `StylesProvider`

Creates an isolated styling scope to prevent CSS class name collisions. Critical for micro-frontends and dynamically loaded modules.

**Props:**
- `seed`: String prefix for class names (e.g., `"my-module"`)
- `generateClassName`: Optional custom class name generator
- `jss`: Optional custom JSS instance
- `children`: React nodes

**Example:**

```tsx
import { StylesProvider } from '@equinor/fusion-react-styles';

// Main app
<StylesProvider seed="main-app">
  <App />
</StylesProvider>

// Dynamically loaded module
<StylesProvider seed="dynamic-module">
  <DynamicModule />
</StylesProvider>
```

### `createGenerateClassName(seed?)`

Creates a class name generator function with an optional seed prefix for isolation.

```tsx
import { createGenerateClassName, StylesProvider } from '@equinor/fusion-react-styles';

const customGenerator = createGenerateClassName('my-app');

function App() {
  return (
    <StylesProvider generateClassName={customGenerator}>
      <YourApp />
    </StylesProvider>
  );
}
```

### `clsx`

Utility for combining class names. Re-exported from the `clsx` package.

```tsx
import { clsx } from '@equinor/fusion-react-styles';

const className = clsx(classes.root, isActive && classes.active, 'custom-class');
```

## Advanced Usage

### Scoped Styles for Module Isolation

When building micro-frontends or dynamically loaded modules, use `StylesProvider` with unique seeds to prevent CSS collisions:

```tsx
import { StylesProvider, makeStyles, ThemeProvider, theme } from '@equinor/fusion-react-styles';

// Shared styles
const sharedStyles = {
  root: { color: 'blue' },
};

// Module A
const useStylesA = makeStyles(sharedStyles, { name: 'ModuleA' });

function ModuleA() {
  const classes = useStylesA();
  return <div className={classes.root}>Module A</div>;
}

// Module B
const useStylesB = makeStyles(sharedStyles, { name: 'ModuleB' });

function ModuleB() {
  const classes = useStylesB();
  return <div className={classes.root}>Module B</div>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Each module gets its own scope */}
      <StylesProvider seed="module-a">
        <ModuleA />
      </StylesProvider>
      
      <StylesProvider seed="module-b">
        <ModuleB />
      </StylesProvider>
    </ThemeProvider>
  );
}
```

Even though both modules use the same styles object, they'll generate different class names:
- Module A: `module-a-makeStyles-root-1`
- Module B: `module-b-makeStyles-root-1`

### Nested Selectors

Full support for CSS-in-JS nested selectors:

```tsx
import { clsx } from '@equinor/fusion-react-styles';

const useStyles = makeStyles({
  root: {
    color: 'blue',
    '&:hover': {
      color: 'red',
    },
    '& .child': {
      padding: '10px',
    },
    '&$disabled': {
      opacity: 0.5,
    },
  },
  disabled: {},
}, { name: 'NestedComponent' });

function Component() {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  
  return (
    <div className={clsx(classes.root, disabled && classes.disabled)}>
      <div className="child">Child element</div>
    </div>
  );
}
```

### Type-Safe Props with Theme

Use TypeScript to ensure type safety with dynamic styles and theme:

```tsx
import { makeStyles, createStyles, theme } from '@equinor/fusion-react-styles';

interface StyleProps {
  color: string;
}

const useStyles = makeStyles((themeValue) =>
  createStyles({
    root: (props: StyleProps) => ({
      ...themeValue.typography.paragraph.body_short.style,
      color: props.color,
      padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
      backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
    }),
  }),
  { name: 'MyComponent' }
);

function Component(props: StyleProps) {
  const classes = useStyles(props);
  return <div className={classes.root}>Styled component</div>;
}
```

### Extended Themes

Extend the Fusion theme with custom properties:

```tsx
import { createTheme, theme, makeStyles } from '@equinor/fusion-react-styles';
import type { FusionTheme, StyleDefinition } from '@equinor/fusion-react-styles';

interface AppTheme extends StyleDefinition {
  app: {
    borderRadius: string;
    sidebarWidth: string;
  };
}

const extendedTheme = createTheme<AppTheme>({
  app: {
    borderRadius: '12px',
    sidebarWidth: '300px',
  },
});

// Use extended theme with makeStyles
const useStyles = makeStyles((themeValue: typeof extendedTheme) =>
  createStyles({
    root: {
      borderRadius: themeValue.app.borderRadius,
      padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
    },
  }),
  { name: 'ExtendedThemeComponent' }
);
```

## TypeScript Support

This package is written in TypeScript and provides full type definitions. All APIs are fully typed with intelligent inference:

### Automatic Type Inference

Type inference works automatically, and using `createStyles` provides even better type safety:

```tsx
// Basic type inference - works, but ClassKey is inferred as string
const useStyles = makeStyles({
  root: { color: 'red' },
  button: { padding: '10px' },
}, { name: 'Component' });
const classes = useStyles(); // classes: Record<string, string>

// With createStyles - ClassKey is inferred as literal union type
const useStyles = makeStyles((theme) =>
  createStyles({
    root: { 
      color: theme.colors.text.static_icons__default.getVariable('color'),
    },
    button: { 
      padding: theme.spacing.comfortable.medium.getVariable('padding'),
    },
  }),
  { name: 'Component' }
);
const classes = useStyles(); // classes: Record<'root' | 'button', string>
// TypeScript will error if you try to access classes.foo - it knows the exact keys!
```

### Theme Types

The `FusionTheme` type can be extended with custom properties:

```tsx
import type { FusionTheme, StyleDefinition } from '@equinor/fusion-react-styles';

interface MyAppTheme extends StyleDefinition {
  customProperty: string;
}

const useStyles = makeStyles((theme: FusionTheme<MyAppTheme>) => ({
  root: {
    color: theme.colors.text.static_icons__default.getVariable('color'),
    custom: theme.customProperty, // Fully typed!
  },
}), { name: 'Component' });
```

### Type-Safe Class Access

When using `createStyles`, the return type is `Record<ClassKey, string>` where `ClassKey` is a literal union of your style keys. This provides:

- **Compile-time safety**: TypeScript errors when accessing undefined class keys
- **Better autocompletion**: IDEs show exactly which class names are available
- **Refactoring support**: Rename class keys and TypeScript will catch all usages

## Migration from Material-UI v4

This package provides a similar API to `@material-ui/styles` v4 but is built for React 19 compatibility. The main differences:

1. **No Material-UI dependency** - Uses JSS directly
2. **React 19 compatible** - No compatibility issues
3. **Improved TypeScript types** - Better type inference
4. **Scoped styles** - Enhanced `StylesProvider` with seed-based isolation
5. **Required name option** - Always provide a `name` in `makeStyles` options for performance

Most code should work with minimal changes:

```tsx
// Before (Material-UI v4)
import { makeStyles } from '@material-ui/styles';

// After (this package)
import { makeStyles } from '@equinor/fusion-react-styles';
// Add name option to makeStyles
const useStyles = makeStyles({ ... }, { name: 'ComponentName' });
```

## React 19 Compatibility

This package is fully compatible with React 19 and has been tested extensively. The implementation uses React 19's new APIs and avoids deprecated patterns.

## Performance Tips

1. **Always provide a `name` option** - Without it, all instances share the same cache key, causing unnecessary re-renders and performance issues.

2. **Use `createStyles` for better type safety** - While optional, it improves TypeScript inference and provides better autocompletion.

3. **Memoize style objects when possible** - If creating styles inside components, consider moving them outside or memoizing them.

4. **Leverage style caching** - The package automatically caches stylesheets based on styles, theme, and name, so identical style definitions are reused.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

ISC

## Related Packages

- [`@equinor/fusion-web-theme`](https://www.npmjs.com/package/@equinor/fusion-web-theme) - Fusion design system theme
- [`@equinor/fusion-wc-theme`](https://www.npmjs.com/package/@equinor/fusion-wc-theme) - Fusion theme web component
