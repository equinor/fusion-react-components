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
import { makeStyles, ThemeProvider } from '@equinor/fusion-react-styles';
import { theme } from '@equinor/fusion-react-styles';

const useStyles = makeStyles({
  root: {
    color: 'blue',
    padding: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
});

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

Use `makeStyles` to create a styles hook that generates CSS class names:

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
});
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

Styles can be functions that receive props:

```tsx
interface ComponentProps {
  color: string;
  size: 'small' | 'large';
}

const useStyles = makeStyles<ComponentProps>({
  root: (props) => ({
    color: props.color,
    padding: props.size === 'large' ? '24px' : '12px',
  }),
});

function Component(props: ComponentProps) {
  const classes = useStyles(props);
  return <div className={classes.root}>Dynamic styling</div>;
}
```

### 4. Theme-Based Styles

Access theme values using theme functions. Theme properties are `StyleProperty` instances that require using the `getVariable()` method to extract CSS values:

```tsx
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.colors.text.static_icons__default.getVariable('color'),
      padding: theme.spacing.comfortable.medium.getVariable('padding'),
      ...theme.typography.paragraph.body_short.style,
    },
    button: {
      backgroundColor: theme.colors.ui.background__default.getVariable('color'),
      '&:hover': {
        backgroundColor: theme.colors.ui.background__hover.getVariable('color'),
      },
    },
  })
);
```

**Important:** Theme properties (colors, spacing, etc.) are `StyleProperty` instances. Use `getVariable('color')` for colors and `getVariable('padding')` for spacing to get CSS variable strings.

#### Working with Theme Properties

The Fusion theme uses `StyleProperty` instances that require using the `getVariable()` method to extract CSS values:

- **Colors**: Use `theme.colors.*.getVariable('color')` to get the color value as a CSS variable string
- **Spacing**: Use `theme.spacing.*.getVariable('padding')` to get the spacing value as a CSS variable string  
- **Typography**: Use `theme.typography.*.style.*` to access typography properties (e.g., `theme.typography.heading.h4.style.fontSize`)

Example:
```tsx
const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      // Color property - use getVariable('color')
      backgroundColor: theme.colors.ui.background__default.getVariable('color'),
      color: theme.colors.text.static_icons__default.getVariable('color'),
      
      // Spacing property - use getVariable('padding')
      padding: theme.spacing.comfortable.medium.getVariable('padding'),
      marginTop: theme.spacing.comfortable.small.getVariable('padding'),
      
      // Typography - access style properties directly
      fontSize: theme.typography.paragraph.body_short.style.fontSize,
      fontWeight: theme.typography.heading.h4.style.fontWeight,
    },
  })
);
```

## API Reference

### `makeStyles(stylesOrCreator, options?)`

Creates a hook that generates CSS class names from style definitions.

**Parameters:**
- `stylesOrCreator`: Style rules object or a function `(theme) => StyleRules`
- `options.name`: Optional name prefix for debugging (defaults to component name)

**Returns:** A hook function that returns `Record<ClassKey, string>` where `ClassKey` is inferred from your style rules, providing type-safe access to class names.

**Example:**

```tsx
// Static styles
const useStyles = makeStyles({
  root: { color: 'red' },
});

// Theme-based styles
const useStyles = makeStyles((theme) => ({
  root: { color: theme.colors.text.static_icons__default.getVariable('color') },
}));

// With options
const useStyles = makeStyles({
  root: { color: 'red' },
}, { name: 'MyComponent' });
```

### `createStyles(styles?)`

Type-safe helper for creating style rules. Improves TypeScript inference for class keys, enabling type-safe access to class names.

```tsx
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { color: 'red' },
    button: { padding: '10px' },
  })
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
  
  return <div style={{ color: theme.colors.text.static_icons__default.getVariable('color') }}>Hello</div>;
}
```

### `StylesProvider`

Creates an isolated styling scope to prevent CSS class name collisions. Critical for micro-frontends and dynamically loaded modules.

**Props:**
- `seed`: String prefix for class names (e.g., `"my-module"`)
- `generateClassName`: Optional custom class name generator
- `jss`: Optional custom JSS instance
- `sheetsManager`: Optional custom sheets manager
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
import { StylesProvider, makeStyles, ThemeProvider } from '@equinor/fusion-react-styles';

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
});

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

### Type-Safe Props

Use TypeScript to ensure type safety with dynamic styles:

```tsx
interface StyleProps {
  color: string;
  background: keyof typeof theme.colors.ui;
}

const defaultStyleProps: StyleProps = {
  background: 'background__default',
  color: 'white',
};

const useStyles = makeStyles<StyleProps>((theme) =>
  createStyles({
    root: ({ background }: StyleProps) => ({
      ...theme.typography.paragraph.body_short.style,
      backgroundColor: theme.colors.ui[background].getVariable('color'),
    }),
    text: {
      color: (props: StyleProps) => props.color,
    },
  }),
  { name: 'MyComponent' }
);

function Component(props: Partial<StyleProps>) {
  const classes = useStyles({ ...defaultStyleProps, ...props });
  return <div className={classes.root}>Styled component</div>;
}
```

### Custom Class Name Generator

Create custom class name generators for advanced use cases:

```tsx
import { createGenerateClassName, StylesProvider } from '@equinor/fusion-react-styles';

const customGenerator = createGenerateClassName({
  seed: 'my-app',
  productionPrefix: 'app',
});

function App() {
  return (
    <StylesProvider generateClassName={customGenerator}>
      <YourApp />
    </StylesProvider>
  );
}
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
});
const classes = useStyles(); // classes: Record<string, string>

// With createStyles - ClassKey is inferred as literal union type
const useStyles = makeStyles((theme) =>
  createStyles({
    root: { color: theme.colors.text.static_icons__default.getVariable('color') },
    button: { padding: theme.spacing.comfortable.medium.getVariable('padding') },
  })
);
const classes = useStyles(); // classes: Record<'root' | 'button', string>
// TypeScript will error if you try to access classes.foo - it knows the exact keys!
```

### Theme Types

```tsx
import type { FusionTheme } from '@equinor/fusion-react-styles';

const useStyles = makeStyles<Record<string, never>, FusionTheme>((theme) => ({
  root: {
    color: theme.colors.text.static_icons__default.getVariable('color'), // Fully typed!
  },
}));
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

Most code should work with minimal changes:

```tsx
// Before (Material-UI v4)
import { makeStyles } from '@material-ui/styles';

// After (this package)
import { makeStyles } from '@equinor/fusion-react-styles';
```

## React 19 Compatibility

This package is fully compatible with React 19 and has been tested extensively. The implementation uses React 19's new APIs and avoids deprecated patterns.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

ISC

## Related Packages

- [`@equinor/fusion-web-theme`](https://www.npmjs.com/package/@equinor/fusion-web-theme) - Fusion design system theme
- [`@equinor/fusion-wc-theme`](https://www.npmjs.com/package/@equinor/fusion-wc-theme) - Fusion theme web component
