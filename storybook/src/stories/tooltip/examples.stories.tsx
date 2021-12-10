import { Meta, Story } from '@storybook/react';
import Tooltip, { TooltipProps } from '@equinor/fusion-react-tooltip/src';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import Button from '@equinor/fusion-react-button';

export default {
  title: 'Examples/Tooltip',
  component: Tooltip,
} as Meta;

type Props = Omit<TooltipProps, 'ref'>;

export const Component: Story = (props: Props) => (
  <Tooltip {...props}>
    <button>Hover Me!</button>
  </Tooltip>
);
Component.args = {
  content: 'Tooltip with default styling',
};

export const Custom: Story = (props: Props) => (
  <Tooltip {...props}>
    <span>Hover and Interact With Me!</span>
  </Tooltip>
);
Custom.args = {
  interactive: true,
  appendTo: () => document.body,
  content: (
    <div>
      <h3>Lorem ipsum dolor sit amet</h3>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <Button>Learn More</Button>
      <h5>Ut enim ad minim veniam.</h5>
    </div>
  ),
};

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      styled: {
        color: theme.colors.infographic.primary__slate_blue.getVariable('color'),
        backgroundColor: theme.colors.infographic.primary__spruce_wood.getVariable('color'),
        borderRadius: '0',
        ...theme.typography.input.text_monospaced.style,
        '& > .tippy-arrow': {
          color: theme.colors.infographic.primary__spruce_wood.getVariable('color'),
        },
      },
    }),
  { name: 'fusion-tooltip' }
);
export const Styled: Story = (props: Props) => {
  const styles = useStyles();
  return (
    <Tooltip
      {...props}
      className={styles.styled}
      placement={'right'}
      visible
      content={
        <div>
          Tooltip with <b>custom style</b>
        </div>
      }
    >
      <span>Pssst!</span>
    </Tooltip>
  );
};
