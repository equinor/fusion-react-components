import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  makeStyles,
  theme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Scope Isolation',
  component: StylesProvider,
};

export default meta;

// Shared styles object - same styles used in both scopes
const sharedStyles = {
  root: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    border: '2px solid',
    fontSize: '14px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  content: {
    color: '#333',
  },
};

// Component using the shared styles
const StyledComponent = ({ scopeName }: { scopeName: string }) => {
  const useStyles = makeStyles(sharedStyles, { name: `Component-${scopeName}` });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.title}>Scope: {scopeName}</div>
      <div className={classes.content}>
        Class name: <code>{classes.root}</code>
      </div>
      <div className={classes.content}>
        Title class: <code>{classes.title}</code>
      </div>
    </div>
  );
};

export const NestedScopes: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div>
          <h2>Nested StylesProviders with Different Seeds</h2>
          <p>
            Both components use the <strong>same styles object</strong>, but they generate{' '}
            <strong>different class names</strong> because they're in different scopes with different seeds.
          </p>
        </div>

        {/* Outer scope */}
        <StylesProvider seed="outer-scope">
          <div>
            <h3>Outer Scope (seed: "outer-scope")</h3>
            <StyledComponent scopeName="outer-scope" />
          </div>

          {/* Inner scope */}
          <StylesProvider seed="inner-scope">
            <div style={{ marginTop: '16px' }}>
              <h3>Inner Scope (seed: "inner-scope")</h3>
              <StyledComponent scopeName="inner-scope" />
            </div>
          </StylesProvider>
        </StylesProvider>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#e8f4f8', borderRadius: '8px' }}>
          <h4>Why This Matters:</h4>
          <ul>
            <li>
              <strong>No CSS collisions:</strong> Even though both components use identical styles, they get
              different class names
            </li>
            <li>
              <strong>Micro-frontend support:</strong> Different modules can use the same style names without
              conflicts
            </li>
            <li>
              <strong>Scope isolation:</strong> Each StylesProvider creates its own namespace
            </li>
          </ul>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const SideBySideScopes: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div>
          <h2>Side-by-Side Scopes (Sibling StylesProviders)</h2>
          <p>
            Two separate StylesProviders at the same level, each with their own seed. Perfect for dynamically
            loaded modules.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Module A */}
          <StylesProvider seed="module-a">
            <div>
              <h3>Module A (seed: "module-a")</h3>
              <StyledComponent scopeName="module-a" />
            </div>
          </StylesProvider>

          {/* Module B */}
          <StylesProvider seed="module-b">
            <div>
              <h3>Module B (seed: "module-b")</h3>
              <StyledComponent scopeName="module-b" />
            </div>
          </StylesProvider>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h4>Use Case: Dynamically Loaded Modules</h4>
          <p>
            When modules are loaded dynamically (e.g., via code splitting or micro-frontends), each module
            should have its own StylesProvider with a unique seed. This ensures:
          </p>
          <ul>
            <li>No class name collisions between modules</li>
            <li>Independent CSS stylesheets per module</li>
            <li>Easy debugging with seed prefixes in class names</li>
          </ul>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const WithoutSeed: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        <div>
          <h2>Default Behavior (No Seed)</h2>
          <p>
            When no seed is provided, StylesProvider uses a default prefix. Multiple components using the same
            styles will share class names.
          </p>
        </div>

        <StylesProvider>
          <StyledComponent scopeName="default" />
        </StylesProvider>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
          <h4>⚠️ Important:</h4>
          <p>
            Without a seed, all StylesProviders share the same namespace. Use seeds when you need isolation
            (e.g., in micro-frontends).
          </p>
        </div>
      </div>
    </ThemeProvider>
  ),
};

