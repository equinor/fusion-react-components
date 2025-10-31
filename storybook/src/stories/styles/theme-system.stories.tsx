import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  theme,
  useTheme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Theme System',
  component: ThemeProvider,
};

export default meta;

// Theme composition
const outerTheme = {
  colors: {
    primary: 'blue',
    secondary: 'red',
  },
  spacing: {
    small: '8px',
    medium: '16px',
  },
};

const ThemeCompositionComponent = () => {
  const currentTheme = useTheme<typeof outerTheme>();

  return (
    <div style={{ padding: '16px', border: '2px solid', borderRadius: '8px' }}>
      <h3>Theme Composition Example</h3>
      <p>
        <strong>Current theme colors:</strong>
      </p>
      <ul>
        <li>Primary: {currentTheme?.colors?.primary || 'N/A'}</li>
        <li>Secondary: {currentTheme?.colors?.secondary || 'N/A'}</li>
      </ul>
      {currentTheme && 'custom' in currentTheme && (
        <p style={{ marginTop: '8px', color: '#666' }}>
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
            <ThemeProvider theme={(outer: typeof outerTheme) => ({ ...outer, custom: true })}>
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
      <div style={{ padding: '16px', border: '2px solid red', borderRadius: '8px' }}>
        <strong>No theme available</strong> - ThemeProvider is not wrapping this component.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '16px',
        border: '2px solid',
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <h3>useTheme Hook Example</h3>
      <p>This component accesses theme directly using the useTheme hook.</p>
      <p style={{ fontSize: '12px', marginTop: '8px' }}>
        Theme object is available: {currentTheme ? '✓' : '✗'}
      </p>
      <p style={{ fontSize: '12px', marginTop: '4px' }}>
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

