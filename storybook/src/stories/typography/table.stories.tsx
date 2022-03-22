import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Table',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['table']),
    },
    variant: {
      disabled: true,
    },
  },
} as Meta;

type Props = Omit<TypographyProps<'table'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typograpgy</Typography>;
};
Component.args = {
  variant: 'table',
  type: 'cell_text',
};

export const CellHeader: Story<Props> = (props) => {
  return (
    <Typography {...props} type="cell_header">
      Table/Cell Header
    </Typography>
  );
};
CellHeader.args = {
  variant: 'table',
};

export const CellText: Story<Props> = (props) => {
  return (
    <Typography {...props} type="cell_text">
      Table/Cell Text
    </Typography>
  );
};
CellText.args = {
  variant: 'table',
};

export const CellTextBold: Story<Props> = (props) => {
  return (
    <Typography {...props} type="cell_text_bold">
      Table/Cell Text Bold
    </Typography>
  );
};
CellTextBold.args = {
  variant: 'table',
};

export const CellTextLink: Story<Props> = (props) => {
  return (
    <Typography {...props} type="cell_text_link">
      Table/Cell Text Link
    </Typography>
  );
};
CellTextLink.args = {
  variant: 'table',
};

export const CellNumericMonospaced: Story<Props> = (props) => {
  return (
    <Typography {...props} type="cell_numeric_monospaced">
      Table/Cell Numeric Monospaced
    </Typography>
  );
};
CellNumericMonospaced.args = {
  variant: 'table',
};
