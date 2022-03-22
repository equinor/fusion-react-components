import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Input',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['input']),
    },
    variant: {
      disabled: true,
    },
  },
} as Meta;

type Props = Omit<TypographyProps<'input'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typograpgy</Typography>;
};
Component.args = {
  variant: 'input',
  type: 'text',
};

export const Label: Story<Props> = (props) => {
  return (
    <Typography {...props} type="label">
      Input/Label
    </Typography>
  );
};
Label.args = {
  variant: 'input',
};

export const Text: Story<Props> = (props) => {
  return (
    <Typography {...props} type="text">
      Input/Text
    </Typography>
  );
};
Text.args = {
  variant: 'input',
};

export const TextMonospaced: Story<Props> = (props) => {
  return (
    <Typography {...props} type="text_monospaced">
      Input/Text Monospaced
    </Typography>
  );
};
TextMonospaced.args = {
  variant: 'input',
};

export const Helper: Story<Props> = (props) => {
  return (
    <Typography {...props} type="helper">
      Input/Helper
    </Typography>
  );
};
Helper.args = {
  variant: 'input',
};
