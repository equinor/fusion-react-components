import { Meta, Story } from '@storybook/react';
import { DotsProgress, DotsProgressProps } from '@equinor/fusion-react-progress-indicator/src';

export default {
  title: 'Examples/Progress Indicator',
  component: DotsProgress,
  argTypes: {
    color: {
      options: ['primary', 'tertiary', 'neutral'],
      control: { type: 'radio' },
    },
  },
} as Meta;

export const Dots: Story<DotsProgressProps> = (props: DotsProgressProps) => <DotsProgress {...props} />;
Dots.args = {
  color: 'primary',
  size: 'small',
};
