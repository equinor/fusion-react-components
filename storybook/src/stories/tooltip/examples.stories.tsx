import { Meta, Story } from '@storybook/react';
import Tooltip, { TooltipProps } from '@equinor/fusion-react-tooltip/src/';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Tooltip',
  component: Tooltip,
} as Meta;

export const Component: Story = (props: TooltipProps) => (
  <Tooltip {...props}
    content="Default Tooltip"
  >
    <button>Hover Me!</button>
  </Tooltip>
);

export const Default: Story = (props: TooltipProps) => (
  <Tooltip {...props}
    content="Default Tooltip"
  >
    <button>Hover Me!</button>
  </Tooltip>
);

export const Interactive: Story = (props: TooltipProps) => (
  <Tooltip {...props}
    content={<div>You could copy this text if you wanted to</div>}
    interactive
    appendTo={() => document.body}
  >
    <button>Hover Me!</button>
  </Tooltip>
);

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      tooltip: {
        ...theme.typography.input.text_monospaced.style,
        color: theme.colors.infographic.primary__slate_blue.getVariable('color'),
        backgroundColor: theme.colors.infographic.primary__spruce_wood.getVariable('color'),
        padding: '10px',
      },
    }),
  { name: 'fusion-styled-tooltip' }
);
export const Styled: Story = (props: TooltipProps) => {
  const styles = useStyles();
  return (
    <Tooltip
      {...props}
      render={attrs => (
        <div {...attrs} className={styles.tooltip}>
          Tooltip with <b>custom style</b>
        </div>
      )}
    >
      <span>Hover Me!</span>
    </Tooltip>
  );
};
