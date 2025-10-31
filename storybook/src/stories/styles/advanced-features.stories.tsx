import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  makeStyles,
  theme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Advanced Features',
  component: StylesProvider,
};

export default meta;

// Nested selectors and pseudo-selectors
const nestedStyles = {
  root: {
    color: 'blue',
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid blue',
    transition: 'all 0.3s ease',
    // Pseudo-selector
    '&:hover': {
      color: 'red',
      borderColor: 'red',
      transform: 'scale(1.05)',
    },
    '&:focus': {
      outline: '2px solid orange',
      outlineOffset: '2px',
    },
    // Nested selector
    '& .nested': {
      padding: '10px',
      backgroundColor: '#f0f0f0',
      marginTop: '8px',
      borderRadius: '4px',
    },
    '& .nested:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
};

const NestedComponent = () => {
  const useStyles = makeStyles(nestedStyles, { name: 'NestedComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root} tabIndex={0}>
      <h3>Nested Selectors & Pseudo-Selectors</h3>
      <p>Hover over this box or focus it to see effects!</p>
      <div className="nested">
        <strong>Nested element</strong> - hover over me too!
      </div>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
        Root class: <code>{classes.root}</code>
      </div>
    </div>
  );
};

export const NestedSelectors: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Nested Selectors & Pseudo-Selectors</h2>
          <p>WHAT: Use CSS features like :hover, :focus, and nested child selectors.</p>
          <p>WHY: Full CSS power in JavaScript - no need to write separate CSS files.</p>
          <NestedComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

// Multiple style rules
const multipleStyles = {
  root: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333',
  },
  content: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  footer: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #ddd',
    fontSize: '12px',
    color: '#999',
  },
};

const MultipleRulesComponent = () => {
  const useStyles = makeStyles(multipleStyles, { name: 'MultipleRulesComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.header}>Component with Multiple Style Rules</div>
      <div className={classes.content}>
        This component demonstrates how one component can have multiple style classes, similar to how you'd use
        multiple CSS classes.
      </div>
      <button className={classes.button} type="button">
        Action Button
      </button>
      <div className={classes.footer}>
        <div style={{ marginTop: '8px', fontSize: '11px' }}>
          Classes: <code>{classes.root}</code>, <code>{classes.header}</code>,{' '}
          <code>{classes.content}</code>, <code>{classes.button}</code>, <code>{classes.footer}</code>
        </div>
      </div>
    </div>
  );
};

export const MultipleStyleRules: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Multiple Style Rules</h2>
          <p>WHAT: One component can have multiple style classes (like CSS classes).</p>
          <p>WHY: Components need multiple styles (e.g., root, header, button, footer).</p>
          <MultipleRulesComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

// Style caching demonstration
const cachedStyles = {
  root: {
    padding: '16px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    border: '2px solid #4caf50',
  },
};

const CachedComponent = ({ id }: { id: string }) => {
  const useStyles = makeStyles(cachedStyles, { name: 'CachedComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <strong>Component {id}</strong>
      <div style={{ marginTop: '8px', fontSize: '12px' }}>
        Class: <code>{classes.root}</code>
      </div>
    </div>
  );
};

export const StyleCaching: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>Style Caching</h2>
          <p>WHAT: Multiple components using the same styles share the same CSS stylesheet.</p>
          <p>WHY: Performance optimization - avoids duplicate CSS in the DOM.</p>
          <p>
            <strong>Example:</strong> 100 Buttons with same styles = 1 stylesheet, not 100.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            <CachedComponent id="1" />
            <CachedComponent id="2" />
            <CachedComponent id="3" />
          </div>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
            <strong>Notice:</strong> All three components share the same class name because they use the same styles.
            This means they share the same CSS stylesheet, reducing bundle size.
          </div>
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

