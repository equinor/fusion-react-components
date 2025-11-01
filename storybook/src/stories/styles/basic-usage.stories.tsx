import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  StylesProvider,
  ThemeProvider,
  makeStyles,
  theme,
  useTheme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Basic Usage',
  component: StylesProvider,
};

export default meta;

// Basic makeStyles - Static styles
const basicStyles = {
  root: {
    color: 'red',
    backgroundColor: 'blue',
    padding: '16px',
    borderRadius: '8px',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const BasicComponent = () => {
  const useStyles = makeStyles(basicStyles, { name: 'BasicComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <h3>Basic Static Styles</h3>
      <p>These styles are defined as static JavaScript objects.</p>
      <button className={classes.button} type="button">
        Click me
      </button>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
        Root class: <code>{classes.root}</code>
        <br />
        Button class: <code>{classes.button}</code>
      </div>
    </div>
  );
};

export const BasicStyles: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Basic Static Styles</h2>
          <p>WHAT: Define styles as JavaScript objects and get CSS class names back.</p>
          <p>WHY: Write styles in JS without needing separate CSS files.</p>
          <BasicComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

// Dynamic styles with props
type DynamicProps = {
  color: string;
  size: 'small' | 'large';
};

const dynamicStyles = {
  root: (props: DynamicProps) => ({
    color: props.color,
    padding: props.size === 'large' ? '24px' : '12px',
    fontSize: props.size === 'large' ? '20px' : '14px',
    border: `2px solid ${props.color}`,
    borderRadius: '8px',
  }),
};

const DynamicComponent = ({ color, size }: DynamicProps) => {
  const useStyles = makeStyles(dynamicStyles, { name: 'DynamicComponent' });
  const classes = useStyles({ color, size });

  return (
    <div className={classes.root}>
      <h3>Dynamic Styles Based on Props</h3>
      <p>
        Color: <strong>{color}</strong>, Size: <strong>{size}</strong>
      </p>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
        Class: <code>{classes.root}</code>
      </div>
    </div>
  );
};

export const DynamicStyles: StoryObj = {
  render: () => {
    const [color, setColor] = useState('green');
    const [size, setSize] = useState<'small' | 'large'>('small');

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider>
          <div style={{ padding: '24px' }}>
            <h2>Dynamic Styles with Props</h2>
            <p>WHAT: Styles change based on component props passed to the hook.</p>
            <p>WHY: Components can change appearance based on their props (e.g., variant, size).</p>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <label>
                Color:{' '}
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                </select>
              </label>
              <label>
                Size:{' '}
                <select value={size} onChange={(e) => setSize(e.target.value as 'small' | 'large')}>
                  <option value="small">Small</option>
                  <option value="large">Large</option>
                </select>
              </label>
            </div>
            <DynamicComponent color={color} size={size} />
          </div>
        </StylesProvider>
      </ThemeProvider>
    );
  },
};

// Theme-based styles using makeStyles with theme function
const themeStyles = (themeValue: typeof theme) => ({
  root: {
    color: themeValue.colors.text.static_icons__default.css,
    padding: themeValue.spacing.comfortable.medium.css,
    backgroundColor: themeValue.colors.ui.background__default.css,
    borderRadius: '8px',
    border: `1px solid ${themeValue.colors.ui.background__medium.css}`,
  },
  title: {
    fontSize: themeValue.typography.heading.h4.style.fontSize,
    fontWeight: themeValue.typography.heading.h4.style.fontWeight,
    marginBottom: themeValue.spacing.comfortable.small.css,
    color: themeValue.colors.text.static_icons__default.css,
  },
});

const ThemeComponent = () => {
  const useStyles = makeStyles(themeStyles, { name: 'ThemeComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.title}>Theme-Based Styles</div>
      <p>This component uses values from the Fusion theme.</p>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>
        Root class: <code>{classes.root}</code>
        <br />
        Title class: <code>{classes.title}</code>
      </p>
    </div>
  );
};

// Component using useTheme hook to access theme directly
const UseThemeComponent = () => {
  const currentTheme = useTheme();
  
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
        padding: currentTheme.spacing.comfortable.medium.css,
        backgroundColor: currentTheme.colors.ui.background__default.css,
        borderRadius: '8px',
        border: `1px solid ${currentTheme.colors.ui.background__medium.css}`,
      }}
    >
      <h3
        style={{
          fontSize: currentTheme.typography.heading.h4.style.fontSize,
          fontWeight: currentTheme.typography.heading.h4.style.fontWeight,
          marginBottom: currentTheme.spacing.comfortable.small.css,
          color: currentTheme.colors.text.static_icons__default.css,
        }}
      >
        Using useTheme Hook
      </h3>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.css }}>
        This component accesses theme directly using the useTheme hook.
      </p>
      <p
        style={{
          fontSize: currentTheme.typography.paragraph.caption.style.fontSize,
          color: currentTheme.colors.text.static_icons__tertiary.css,
          marginTop: currentTheme.spacing.comfortable.small.css,
        }}
      >
        Theme is available: {currentTheme ? '✓' : '✗'}
        <br />
        Theme colors, spacing, and typography are accessible via the theme object.
      </p>
    </div>
  );
};

export const ThemeBasedStyles: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Theme-Based Styles</h2>
          <p>WHAT: Styles access theme values from ThemeProvider.</p>
          <p>WHY: Enables design system theming - components automatically use theme colors/spacing.</p>
          <ThemeComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

export const UseThemeHook: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>useTheme Hook</h2>
          <p>WHAT: Hook to access theme directly from ThemeProvider context.</p>
          <p>WHY: Components can access theme values without prop drilling or style functions.</p>
          <UseThemeComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

