import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '@equinor/fusion-react-button';
import { iconNames } from '@equinor/fusion-wc-icon';

export default {
  title: 'Examples/Button/Default',
  component: Button,
  argTypes: {
    label: {
      description: 'Label to display for the button',
      type: { name: 'string' },
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      description: 'Icon to display',
      table: {
        type: { summary: 'Icon' },
      },
      control: 'select',
      options: iconNames,
    },
    trailingIcon: {
      description: 'Display icon after label',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    variant: {
      description: 'Button variant to render',
      type: { name: 'string' },
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'contained' },
      },
      control: 'select',
      options: ['contained', 'outlined', 'ghost'],
    },
    color: {
      description: 'Button color to render',
      type: { name: 'string' },
      table: {
        type: { summary: 'ButtonColor' },
        defaultValue: { summary: 'primary' },
      },
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    dense: {
      description: 'Make the button text and container slightly smaller',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Make the button disabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
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

export const Icon: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <Button label="Icon" icon="settings" />
    <Button label="Trailing Icon" icon="settings" trailingIcon />
  </div>
);
