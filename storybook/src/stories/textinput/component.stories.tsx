import { Meta, Story } from '@storybook/react';
import { TextInput, TextInputProps } from '@equinor/fusion-react-textinput/src';
import { iconNames } from '@equinor/fusion-react-icon/src';

export default {
  title: 'Examples/TextInput/Component',
  component: TextInput,
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta;

export const Component: Story = (props: TextInputProps) => <TextInput {...props} />;
Component.args = {
  icon: 'settings',
  label: 'Text input',
};
