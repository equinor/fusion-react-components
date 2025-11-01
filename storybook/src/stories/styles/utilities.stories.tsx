import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StylesProvider,
  ThemeProvider,
  makeStyles,
  theme,
  createStyles,
} from '@equinor/fusion-react-styles';

const meta: Meta = {
  title: 'ui/Styles/Utilities',
  component: StylesProvider,
};

export default meta;

// createStyles helper
const createdStyles = createStyles({
  root: {
    padding: '16px',
    backgroundColor: '#f3e5f5',
    borderRadius: '8px',
    border: '2px solid #9c27b0',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
});

const CreateStylesComponent = () => {
  const useStyles = makeStyles(createdStyles, { name: 'CreateStylesComponent' });
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.title}>createStyles Helper</div>
      <p>This component uses createStyles for better TypeScript type inference.</p>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
        Classes: <code>{classes.root}</code>, <code>{classes.title}</code>
      </div>
    </div>
  );
};

export const CreateStylesHelper: StoryObj = {
  render: () => (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <div style={{ padding: '24px' }}>
          <h2>createStyles Helper</h2>
          <p>WHAT: Type-safe helper for creating style rules.</p>
          <p>WHY: Improves TypeScript inference for style objects.</p>
          <CreateStylesComponent />
        </div>
      </StylesProvider>
    </ThemeProvider>
  ),
};

