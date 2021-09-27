import { Meta, Story } from '@storybook/react';
import { Icon, IconProps, iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

export const Component: Story = (props: Omit<IconProps, 'ref'>) => <Icon {...props} />;
Component.args = {
  icon: 'settings',
};
