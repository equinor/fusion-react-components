import { Meta, Story } from '@storybook/react';
import Typography, { TypographyProps } from '@equinor/fusion-react-typography/src';
// import { FusionTheme } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      // options: ['input', 'heading', 'navigation', 'paragraph', 'table', 'ui'],
    },
  },
} as Meta;

// type Props = Omit<TypographyProps, 'ref'>;

export const Component: Story<TypographyProps> = (props: Omit<TypographyProps, 'ref'>) => (
  <Typography {...props}>Typograpgy</Typography>
);
Component.args = {
  variant: 'paragraph',
  component: 'paragraph',
};

export const SemanticElement: Story<TypographyProps> = (props: Omit<TypographyProps, 'ref'>) => (
  <Typography {...props} variant={'heading'} component={'paragraph'}>
    paragraph element styled as heading
  </Typography>
);
