import { Meta, Story } from '@storybook/react';
import { Divider, DividerProps } from '@equinor/fusion-react-divider/src';
import { iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/Divider',
  component: Divider,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

type ComponentProps = DividerProps & { initial: string };
export const Component: Story<ComponentProps> = (props: ComponentProps) => <Divider {...props} />;
Component.args = {};

export const Simple: Story = () => <Divider />;
