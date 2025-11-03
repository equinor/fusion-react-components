import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  theme,
  useTheme,
  createTheme,
  makeStyles,
  type FusionTheme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Theme System',
  component: ThemeProvider,
};

export default meta;

// Theme Extension Example
type AppTheme = FusionTheme<{
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  app: {
    headerHeight: string;
    sidebarWidth: string;
    borderRadius: string;
  };
}>;

const extendedTheme = createTheme<{
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  app: {
    headerHeight: string;
    sidebarWidth: string;
    borderRadius: string;
  };
}>({
  colors: {
    brand: {
      primary: '#007bff',
      secondary: '#6c757d',
      accent: '#28a745',
    },
  },
  app: {
    headerHeight: '64px',
    sidebarWidth: '240px',
    borderRadius: '8px',
  },
});

const ExtendedThemeExample = () => {
  const currentTheme = useTheme<AppTheme>();

  if (!currentTheme) {
    return <div>No theme available</div>;
  }

  return (
    <div
      style={{
        padding: currentTheme.spacing.comfortable.medium.getVariable('padding'),
        backgroundColor: currentTheme.colors.ui.background__default.getVariable('color'),
        borderRadius: currentTheme.app.borderRadius,
        border: `2px solid ${currentTheme.colors.ui.background__medium.getVariable('color')}`,
      }}
    >
      <h3
        style={{
          fontSize: currentTheme.typography.heading.h4.style.fontSize,
          fontWeight: currentTheme.typography.heading.h4.style.fontWeight,
          marginBottom: currentTheme.spacing.comfortable.small.getVariable('padding'),
          color: currentTheme.colors.text.static_icons__default.getVariable('color'),
        }}
      >
        Extended Theme Example
      </h3>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.getVariable('color'), marginBottom: currentTheme.spacing.comfortable.small.getVariable('padding') }}>
        This component uses an extended theme with custom properties.
      </p>
      <div style={{ display: 'flex', gap: currentTheme.spacing.comfortable.small.getVariable('padding'), marginBottom: currentTheme.spacing.comfortable.small.getVariable('padding') }}>
        <div
          style={{
            padding: currentTheme.spacing.comfortable.small.getVariable('padding'),
            backgroundColor: currentTheme.colors.brand.primary,
            borderRadius: currentTheme.app.borderRadius,
            color: 'white',
            fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          }}
        >
          Brand Primary
        </div>
        <div
          style={{
            padding: currentTheme.spacing.comfortable.small.getVariable('padding'),
            backgroundColor: currentTheme.colors.brand.secondary,
            borderRadius: currentTheme.app.borderRadius,
            color: 'white',
            fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          }}
        >
          Brand Secondary
        </div>
        <div
          style={{
            padding: currentTheme.spacing.comfortable.small.getVariable('padding'),
            backgroundColor: currentTheme.colors.brand.accent,
            borderRadius: currentTheme.app.borderRadius,
            color: 'white',
            fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          }}
        >
          Brand Accent
        </div>
      </div>
      <div
        style={{
          padding: currentTheme.spacing.comfortable.small.getVariable('padding'),
          backgroundColor: currentTheme.colors.ui.background__light.getVariable('color'),
          borderRadius: currentTheme.app.borderRadius,
          fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          color: currentTheme.colors.text.static_icons__tertiary.getVariable('color'),
        }}
      >
        <strong>App Config:</strong> Header Height: {currentTheme.app.headerHeight}, Sidebar Width:{' '}
        {currentTheme.app.sidebarWidth}
      </div>
    </div>
  );
};

const ExtendedThemeWithStyles = () => {
  const styles = makeStyles<AppTheme>(
    (themeValue) => ({
      root: {
        padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
        backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
        borderRadius: themeValue.app.borderRadius,
        border: `2px solid ${themeValue.colors.ui.background__medium.getVariable('color')}`,
      },
      title: {
        fontSize: themeValue.typography.heading.h4.style.fontSize,
        fontWeight: themeValue.typography.heading.h4.style.fontWeight,
        marginBottom: themeValue.spacing.comfortable.small.getVariable('padding'),
        color: themeValue.colors.text.static_icons__default.getVariable('color'),
      },
      brandButton: {
        padding: `${themeValue.spacing.comfortable.small.getVariable('padding')} ${themeValue.spacing.comfortable.medium.getVariable('padding')}`,
        backgroundColor: themeValue.colors.brand.primary,
        color: 'white',
        border: 'none',
        borderRadius: themeValue.app.borderRadius,
        cursor: 'pointer',
        fontSize: themeValue.typography.paragraph.body_short.style.fontSize,
        '&:hover': {
          backgroundColor: themeValue.colors.brand.accent,
        },
      },
    }),
    { name: 'ExtendedThemeWithStyles' },
  );

  const classes = styles({});

  return (
    <div className={classes.root}>
      <div className={classes.title}>Extended Theme with makeStyles</div>
      <p style={{ color: theme.colors.text.static_icons__secondary.getVariable('color') }}>
        Using makeStyles with extended theme - custom properties are fully typed and accessible.
      </p>
      <button className={classes.brandButton} type="button">
        Brand Button
      </button>
    </div>
  );
};

export const ThemeExtension: StoryObj = {
  render: () => (
    <ThemeProvider theme={extendedTheme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Theme Extension</h2>
          <p>
            <strong>WHAT:</strong> Extend FusionTheme with custom properties for your application-specific needs.
          </p>
          <p>
            <strong>WHY:</strong> Add application-specific tokens (brand colors, layout dimensions, etc.) while keeping
            all Fusion design system tokens available.
          </p>
          <div style={{ marginTop: '24px' }}>
            <h3>Step 1: Define Extended Theme Type</h3>
            <pre
              style={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
              }}
            >
              {`type AppTheme = FusionTheme<{
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  app: {
    headerHeight: string;
    sidebarWidth: string;
    borderRadius: string;
  };
}>;`}
            </pre>
          </div>
          <div style={{ marginTop: '24px' }}>
            <h3>Step 2: Create Extended Theme</h3>
            <pre
              style={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
              }}
            >
              {`const extendedTheme = createTheme({
  colors: {
    brand: {
      primary: '#007bff',
      secondary: '#6c757d',
      accent: '#28a745',
    },
  },
  app: {
    headerHeight: '64px',
    sidebarWidth: '240px',
    borderRadius: '8px',
  },
});`}
            </pre>
          </div>
          <div style={{ marginTop: '24px' }}>
            <h3>Step 3: Use Extended Theme</h3>
            <p style={{ marginBottom: '16px' }}>
              Access both base Fusion theme properties and your custom properties:
            </p>
            <ExtendedThemeExample />
          </div>
          <div style={{ marginTop: '24px' }}>
            <h3>Step 4: Use with makeStyles</h3>
            <p style={{ marginBottom: '16px' }}>
              Extended themes work seamlessly with makeStyles - custom properties are fully typed:
            </p>
            <ExtendedThemeWithStyles />
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

// Theme composition using createTheme
type ExtendedTheme = FusionTheme<{
  colors: {
    primary: string;
    secondary: string;
  };
  custom?: Record<string, unknown>;
}>;

const outerTheme = createTheme({
  colors: {
    primary: 'blue',
    secondary: 'red',
  },
});

const ThemeCompositionComponent = () => {
  const currentTheme = useTheme<ExtendedTheme>();

  if (!currentTheme) {
    return <div>No theme available</div>;
  }

  const baseTheme = currentTheme as ExtendedTheme;

  return (
    <div
      style={{
        padding: baseTheme.spacing.comfortable.medium.getVariable('padding'),
        border: `2px solid ${baseTheme.colors.ui.background__medium.getVariable('color')}`,
        borderRadius: '8px',
        backgroundColor: baseTheme.colors.ui.background__default.getVariable('color'),
      }}
    >
      <h3
        style={{
          fontSize: baseTheme.typography.heading.h4.style.fontSize,
          fontWeight: baseTheme.typography.heading.h4.style.fontWeight,
          marginBottom: baseTheme.spacing.comfortable.small.getVariable('padding'),
          color: baseTheme.colors.text.static_icons__default.getVariable('color'),
        }}
      >
        Theme Composition Example
      </h3>
      <p style={{ color: baseTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        <strong>Current theme colors:</strong>
      </p>
      <ul style={{ color: baseTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        <li>Primary: {(baseTheme as ExtendedTheme)?.colors?.primary || 'N/A'}</li>
        <li>Secondary: {(baseTheme as ExtendedTheme)?.colors?.secondary || 'N/A'}</li>
      </ul>
      {baseTheme && 'custom' in baseTheme && (baseTheme as ExtendedTheme).custom && (
        <p
          style={{
            marginTop: baseTheme.spacing.comfortable.small.getVariable('padding'),
            color: baseTheme.colors.text.static_icons__tertiary.getVariable('color'),
          }}
        >
          <em>Custom theme property detected!</em>
        </p>
      )}
    </div>
  );
};

export const ThemeComposition: StoryObj = {
  render: () => (
    <ThemeProvider theme={outerTheme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Theme Composition</h2>
          <p>WHAT: Nested ThemeProviders can extend or override parent themes.</p>
          <p>WHY: Enables gradual customization - child themes can extend parent without re-specifying everything.</p>
          <div style={{ marginBottom: '16px' }}>
            <h3>Outer Theme (Base)</h3>
            <ThemeCompositionComponent />
          </div>
          <div style={{ marginTop: '16px' }}>
            <h3>Inner Theme (Extended)</h3>
            <ThemeProvider
              theme={(outer: FusionTheme | null) =>
                createTheme({ custom: {} }, outer ?? undefined)
              }
            >
              <ThemeCompositionComponent />
            </ThemeProvider>
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

// useTheme hook
const UseThemeComponent = () => {
  const currentTheme = useTheme<typeof theme>();

  if (!currentTheme) {
    return (
      <div
        style={{
          padding: '16px',
          border: '2px solid red',
          borderRadius: '8px',
          color: 'red',
        }}
      >
        <strong>No theme available</strong> - ThemeProvider is not wrapping this component.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: currentTheme.spacing.comfortable.medium.getVariable('padding'),
        border: `2px solid ${currentTheme.colors.ui.background__medium.getVariable('color')}`,
        borderRadius: '8px',
        backgroundColor: currentTheme.colors.ui.background__default.getVariable('color'),
        color: currentTheme.colors.text.static_icons__default.getVariable('color'),
      }}
    >
      <h3
        style={{
          fontSize: currentTheme.typography.heading.h4.style.fontSize,
          fontWeight: currentTheme.typography.heading.h4.style.fontWeight,
          marginBottom: currentTheme.spacing.comfortable.small.getVariable('padding'),
          color: currentTheme.colors.text.static_icons__default.getVariable('color'),
        }}
      >
        useTheme Hook Example
      </h3>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        This component accesses theme directly using the useTheme hook.
      </p>
      <p
        style={{
          fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          marginTop: currentTheme.spacing.comfortable.small.getVariable('padding'),
          color: currentTheme.colors.text.static_icons__tertiary.getVariable('color'),
        }}
      >
        Theme object is available: {currentTheme ? '✓' : '✗'}
      </p>
      <p
        style={{
          fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          marginTop: currentTheme.spacing.comfortable.x_small.getVariable('padding'),
          color: currentTheme.colors.text.static_icons__tertiary.getVariable('color'),
        }}
      >
        Theme colors and spacing are available for direct use in inline styles or logic.
      </p>
    </div>
  );
};

export const UseThemeHook: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>useTheme Hook</h2>
          <p>WHAT: Hook to access theme from ThemeProvider context.</p>
          <p>WHY: Components can access theme without prop drilling.</p>
          <UseThemeComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

