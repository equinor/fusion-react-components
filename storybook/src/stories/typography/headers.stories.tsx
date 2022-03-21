import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Headers',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['heading']),
    },
    variant: {
      disabled: true,
    },
  },
} as Meta;

export const Component: Story<TypographyProps<'heading'>> = (props: Omit<TypographyProps<'heading'>, 'ref'>) => {
  return (
    <>
      <Typography {...props}>Typograpgy</Typography>
      <Typography {...props}>Typograpgy</Typography>
      <Typography {...props}>Typograpgy</Typography>
      <Typography {...props}>Typograpgy</Typography>
      <Typography {...props}>Typograpgy</Typography>
    </>
  );
};
Component.args = {
  variant: 'heading',
  type: 'h1_bold',
};
