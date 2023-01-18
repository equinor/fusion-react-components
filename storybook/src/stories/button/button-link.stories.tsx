import { Meta, Story } from '@storybook/react';
import { LinkButton, LinkButtonProps } from '@equinor/fusion-react-button';
import { iconNames } from '@equinor/fusion-react-icon';

export default {
  title: 'Examples/Button/Link',
  component: LinkButton,
  argTypes: {
    href: {
      description: 'Sets the href resource attribute',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      description: 'Sets the target attribute',
      type: { name: 'string' },
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
      options: ['_blank', '_parent', '_self', '_top'],
    },
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

export const Component: Story = (props: Omit<LinkButtonProps, 'ref'>) => <LinkButton {...props} />;
Component.args = {
  href: '#link',
  target: '_top',
  label: 'My Button',
  color: 'primary',
  variant: 'contained',
};

export const Custom: Story = () => (
  <LinkButton href="#link" target="_blank" variant="outlined">
    <span slot="icon">🚨</span>
    <span>
      <b>Custom</b> - <i>label</i>
    </span>
    <span slot="trailingIcon">🚀</span>
  </LinkButton>
);

export const Variants: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <LinkButton href="#link" target="_self" variant="contained" label="contained" />
    <LinkButton href="#link" target="_self" variant="outlined" label="outlined" />
    <LinkButton href="#link" target="_self" variant="ghost" label="ghost" />
  </div>
);

export const Colors: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <LinkButton href="#link" target="_parent" color="primary" label="primary" />
    <LinkButton href="#link" target="_parent" color="secondary" label="secondary" />
    <LinkButton href="#link" target="_parent" color="danger" label="danger" />
  </div>
);

export const Icon: Story = () => (
  <div style={{ display: 'inline-flex', gap: 10 }}>
    <LinkButton href="#link" target="_self" label="Icon" icon="settings" />
    <LinkButton href="#link" target="_self" label="Trailing Icon" icon="settings" trailingIcon />
  </div>
);
