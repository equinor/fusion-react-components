import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { theme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/UI',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(theme.typography['ui']),
    },
    variant: { control: { disable: true } },
  },
} as Meta;

type Props = Omit<TypographyProps<'ui'>, 'ref'>;

export const Component: Story<Props> = (props) => {
  return <Typography {...props}>Typograpgy</Typography>;
};
Component.args = {
  variant: 'ui',
  type: 'tooltip',
};

export const Tooltip: Story<Props> = (props) => {
  return (
    <Typography {...props} type="tooltip">
      UI/Tooltip
    </Typography>
  );
};
Tooltip.args = {
  variant: 'ui',
};

export const Snackbar: Story<Props> = (props) => {
  return (
    <Typography {...props} type="snackbar">
      UI/Snackbar
    </Typography>
  );
};
Snackbar.args = {
  variant: 'ui',
};

export const Accordionheader: Story<Props> = (props) => {
  return (
    <Typography {...props} type="accordion_header">
      UI/Accordion header
    </Typography>
  );
};
Accordionheader.args = {
  variant: 'ui',
};

export const ChipBadge: Story<Props> = (props) => {
  return (
    <Typography {...props} type="chip__badge">
      UI/Chip + Badge
    </Typography>
  );
};
ChipBadge.storyName = 'Chip + Badge';
ChipBadge.args = {
  variant: 'ui',
};

export const Chart: Story<Props> = (props) => {
  return (
    <Typography {...props} type="chart">
      UI/Chart
    </Typography>
  );
};
Chart.args = {
  variant: 'ui',
};
