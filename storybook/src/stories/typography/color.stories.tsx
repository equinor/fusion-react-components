import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '@equinor/fusion-react-typography/src';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export default {
  title: 'Examples/Typography/Color',
  component: Typography,
} as Meta;

type Props = Omit<TypographyProps<'paragraph'>, 'ref'>;

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      successColor: {
        color: theme.colors.interactive.success__text.getVariable('color'),
      },
    }),
  { name: 'fusion-typography-color' }
);

export const Component: Story<Props> = (props) => {
  const styles = useStyles();
  return (
    <Typography {...props} className={styles.successColor}>
      Typography
    </Typography>
  );
};
Component.args = {
  variant: 'paragraph',
  type: 'body_short',
};
