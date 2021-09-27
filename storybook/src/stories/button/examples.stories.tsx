import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '@equinor/fusion-react-button/src';
import { iconNames } from '@equinor/fusion-react-icon';

export default {
  title: 'Examples/Button',
  component: Button,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

export const Component: Story = (props: Omit<ButtonProps, 'ref'>) => <Button {...props} />;
Component.args = {
  label: 'My Button',
  color: 'primary',
  variant: 'outlined',
};

export const Custom: Story = () => (
  <Button variant="outlined">
    <span slot="icon">🚨</span>
    <span>
      <b>Custom</b> - <i>label</i>
    </span>
    <span slot="trailingIcon">🚀</span>
  </Button>
);
