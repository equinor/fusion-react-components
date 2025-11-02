import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  createStyles,
  makeStyles,
  theme,
  useTheme,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Advanced Features',
  component: StylesProvider,
};

export default meta;

const useStyles = makeStyles((themeValue) => createStyles({
  root: {
    color: themeValue.colors.text.static_icons__default.getVariable('color'),
    padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
    borderRadius: '8px',
    border: `2px solid ${themeValue.colors.interactive.primary__resting.getVariable('color')}`,
    transition: 'all 0.3s ease',
    backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
    // Pseudo-selector
    '&:hover': {
      color: themeValue.colors.interactive.primary__hover.getVariable('color'),
      borderColor: themeValue.colors.interactive.primary__hover.getVariable('color'),
      transform: 'scale(1.05)',
      backgroundColor: themeValue.colors.ui.background__light.getVariable('color'),
    },
    '&:focus': {
      outline: `2px solid ${themeValue.colors.interactive.focus.getVariable('color')}`,
      outlineOffset: '2px',
    },
    // Nested selector
    '& .nested': {
      padding: themeValue.spacing.comfortable.small.getVariable('padding'),
      backgroundColor: themeValue.colors.ui.background__light.getVariable('color'),
      marginTop: themeValue.spacing.comfortable.small.getVariable('padding'),
      borderRadius: '4px',
    },
    '& .nested:hover': {
      backgroundColor: themeValue.colors.ui.background__medium.getVariable('color'),
    },
  },
  dummy: (props: { dummy: string }) => ({
    color: props.dummy,
  }),
}), { name: 'NestedComponent' });

const NestedComponent = () => {
  const classes = useStyles({ dummy: 'red' });

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
      <StylesProvider seed='nested-selectors'>
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
const multipleStyles = (themeValue: typeof theme) => ({
  root: {
    padding: themeValue.spacing.comfortable.large.getVariable('padding'),
    backgroundColor: themeValue.colors.ui.background__default.getVariable('color'),
    borderRadius: '8px',
    border: `1px solid ${themeValue.colors.ui.background__medium.getVariable('color')}`,
  },
  header: {
    fontSize: themeValue.typography.heading.h3.style.fontSize,
    fontWeight: themeValue.typography.heading.h3.style.fontWeight,
    marginBottom: themeValue.spacing.comfortable.medium.getVariable('padding'),
    color: themeValue.colors.text.static_icons__default.getVariable('color'),
  },
  content: {
    fontSize: themeValue.typography.paragraph.body_short.style.fontSize,
    color: themeValue.colors.text.static_icons__secondary.getVariable('color'),
    lineHeight: themeValue.typography.paragraph.body_short.style.lineHeight,
    marginBottom: themeValue.spacing.comfortable.medium.getVariable('padding'),
  },
  button: {
    padding: `${themeValue.spacing.comfortable.small.getVariable('padding')} ${themeValue.spacing.comfortable.medium.getVariable('padding')}`,
    backgroundColor: themeValue.colors.interactive.primary__resting.getVariable('color'),
    color: themeValue.colors.text.static_icons__primary_white.getVariable('color'),
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: themeValue.typography.paragraph.body_short.style.fontSize,
    '&:hover': {
      backgroundColor: themeValue.colors.interactive.primary__hover.getVariable('color'),
    },
  },
  footer: {
    marginTop: themeValue.spacing.comfortable.medium.getVariable('padding'),
    paddingTop: themeValue.spacing.comfortable.medium.getVariable('padding'),
    borderTop: `1px solid ${themeValue.colors.ui.background__medium.getVariable('color')}`,
    fontSize: themeValue.typography.paragraph.caption.style.fontSize,
    color: themeValue.colors.text.static_icons__tertiary.getVariable('color'),
  },
});

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
const cachedStyles = (themeValue: typeof theme) => ({
  root: {
    padding: themeValue.spacing.comfortable.medium.getVariable('padding'),
    backgroundColor: themeValue.colors.ui.background__info.getVariable('color'),
    borderRadius: '8px',
    border: `2px solid ${themeValue.colors.interactive.success__resting.getVariable('color')}`,
    color: themeValue.colors.text.static_icons__default.getVariable('color'),
  },
});

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
        <StyleCachingWrapper />
      </StylesProvider>
    </ThemeProvider>
  ),
};

const StyleCachingWrapper = () => {
  const currentTheme = useTheme();
  if (!currentTheme) return null;

  return (
    <div style={{ padding: currentTheme.spacing.comfortable.large.getVariable('padding') }}>
      <h2 style={{ color: currentTheme.colors.text.static_icons__default.getVariable('color') }}>
        Style Caching
      </h2>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        WHAT: Multiple components using the same styles share the same CSS stylesheet.
      </p>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        WHY: Performance optimization - avoids duplicate CSS in the DOM.
      </p>
      <p style={{ color: currentTheme.colors.text.static_icons__secondary.getVariable('color') }}>
        <strong>Example:</strong> 100 Buttons with same styles = 1 stylesheet, not 100.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: currentTheme.spacing.comfortable.medium.getVariable('padding'),
          marginTop: currentTheme.spacing.comfortable.medium.getVariable('padding'),
        }}
      >
        <CachedComponent id="1" />
        <CachedComponent id="2" />
        <CachedComponent id="3" />
      </div>
      <div
        style={{
          marginTop: currentTheme.spacing.comfortable.medium.getVariable('padding'),
          padding: currentTheme.spacing.comfortable.medium.getVariable('padding'),
          backgroundColor: currentTheme.colors.ui.background__warning.getVariable('color'),
          borderRadius: '4px',
          color: currentTheme.colors.text.static_icons__default.getVariable('color'),
        }}
      >
        <strong>Notice:</strong> All three components share the same class name because they use the
        same styles. This means they share the same CSS stylesheet, reducing bundle size.
      </div>
    </div>
  );
};

