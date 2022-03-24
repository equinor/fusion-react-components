import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Heading',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['heading']),
    },
    variant: { control: { disable: true } },
  },
} as Meta;

type Props = Omit<TypographyProps<'heading'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typograpgy</Typography>;
};
Component.args = {
  variant: 'heading',
  type: 'h1_bold',
};

export const H1: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h1">
      Heading/H1
    </Typography>
  );
};
H1.storyName = 'H1';
H1.args = {
  variant: 'heading',
};

export const H1Bold: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h1_bold">
      Heading/H1 Bold
    </Typography>
  );
};
H1Bold.storyName = 'H1 Bold';
H1Bold.args = {
  variant: 'heading',
};

export const H2: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h2">
      Heading/H2
    </Typography>
  );
};
H2.storyName = 'H2';
H2.args = {
  variant: 'heading',
};

export const H3: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h3">
      Heading/H3
    </Typography>
  );
};
H3.storyName = 'H3';
H3.args = {
  variant: 'heading',
};

export const H4: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h4">
      Heading/H4
    </Typography>
  );
};
H4.storyName = 'H4';
H4.args = {
  variant: 'heading',
};

export const H5: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h5">
      Heading/H5
    </Typography>
  );
};
H5.storyName = 'H5';
H5.args = {
  variant: 'heading',
};

export const H6: Story<Props> = (props) => {
  return (
    <Typography {...props} type="h6">
      Heading/H6
    </Typography>
  );
};
H6.storyName = 'H6';
H6.args = {
  variant: 'heading',
};
