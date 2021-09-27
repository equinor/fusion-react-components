import { Meta, Story } from '@storybook/react';
import { Switch, SwitchProps } from '@equinor/fusion-react-switch/src';

export default {
  title: 'Examples/Switch',
  component: Switch,
} as Meta;

export const Component: Story = (props: Omit<SwitchProps, 'ref'>) => <Switch {...props} />;
