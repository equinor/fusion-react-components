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

export const Variants: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <Button variant="contained" label="contained" />
    <Button variant="outlined" label="outlined" />
    <Button variant="ghost" label="ghost" />
  </div>
);

export const Colors: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <Button color="primary" label="primary" />
    <Button color="secondary" label="secondary" />
    <Button color="danger" label="danger" />
  </div>
);
