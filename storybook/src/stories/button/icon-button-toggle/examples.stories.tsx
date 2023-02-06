import { Meta, Story } from '@storybook/react';
import { iconNames } from '@equinor/fusion-react-icon/src';
import { IconButtonToggle, IconButtonToggleProps } from '@equinor/fusion-react-button/src/icon-button-toggle';
import { IconButtonColor, IconButtonSize } from '@equinor/fusion-react-button/src/icon-button';

export default {
  title: 'Examples/Button/Icon Toggle',
  component: IconButtonToggle,
  argTypes: {
    on: {
      description: 'Activate toggle',
    },
    offIcon: {
      description: 'Icon to display on "off" state',
      control: 'select',
      options: iconNames,
      table: {
        type: { summary: 'iconNames' },
      },
    },
    onIcon: {
      description: 'Icon to display on "on" state',
      control: 'select',
      options: iconNames,
      table: {
        type: { summary: 'iconNames' },
      },
    },
    offColor: {
      description: 'Sets the color on "off" state',
      control: 'select',
      options: IconButtonColor,
      table: {
        type: { summary: 'IconButtonColor' },
      },
    },
    onColor: {
      description: 'Sets the color on "on" state',
      control: 'select',
      options: IconButtonColor,
      table: {
        type: { summary: 'IconButtonColor' },
      },
    },
    size: {
      description: 'Sets the size',
      control: 'radio',
      options: IconButtonSize,
      table: {
        type: { summary: 'IconButtonSize' },
      },
    },
    rounded: {
      description: 'Sets the shape of ripple',
    },
    ariaLabel: {
      description: 'Accessible label for the button',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabelOn: {
      description: 'aria-label of the button when on is true',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabelOff: {
      description: 'aria-label of the button when on is false',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Sets to disabled',
    },
  },
} as Meta;

export const Component: Story<IconButtonToggleProps> = (props: IconButtonToggleProps) => (
  <IconButtonToggle {...props} />
);
Component.args = {
  offIcon: 'wifi_off',
  onIcon: 'wifi',
  offColor: IconButtonColor.Danger,
  onColor: IconButtonColor.Success,
  size: IconButtonSize.Medium,
  rounded: true,
};