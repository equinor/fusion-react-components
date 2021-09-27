import { Meta, Story } from '@storybook/react';
import { Radio, RadioProps } from '@equinor/fusion-react-radio/src';

export default {
  title: 'Examples/Radio',
  component: Radio,
} as Meta;

export const Component: Story = (props: Omit<RadioProps, 'ref'>) => <Radio {...props} />;
