import { Meta, Story } from '@storybook/react';
import { StarProgress, StarProgressProps } from '@equinor/fusion-react-progress-indicator/src';

export default {
  title: 'Examples/Progress Indicator',
  component: StarProgress,
} as Meta;

export const Star: Story<StarProgressProps> = (props: StarProgressProps) => <StarProgress {...props} />;
Star.args = {
  text: 'Loading React Components',
};
