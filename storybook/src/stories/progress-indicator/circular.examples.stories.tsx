import { Meta, Story } from '@storybook/react';
import { CircularProgress, CircularProgressProps } from '@equinor/fusion-react-progress-indicator/src';

export default {
  title: 'Examples/Progress Indicator',
  component: CircularProgress,
  argTypes: {
    color: {
      options: ['primary', 'neutral'],
      control: { type: 'radio' },
    },
  },
} as Meta;

export const Circular: Story<CircularProgressProps> = (props: CircularProgressProps) => <CircularProgress {...props} />;
Circular.args = {
  color: 'primary',
  size: 'medium',
};
