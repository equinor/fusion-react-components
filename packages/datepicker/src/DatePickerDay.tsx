import { FunctionComponent } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import { DayProps } from './types';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  spacing: SpacingType;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      container: ({ spacing }) => ({
        ...theme.spacing.comfortable[spacing].style,
        display: 'flex',
        alignItems: 'center',
      }),
      header: {
        ...theme.typography.navigation.menu_title.style,
        flex: 1,
        textAlign: 'center',
      },
    }),
  { name: 'fusion-datepicker-day' }
);

const FusionDatePickerDay: FunctionComponent<DayProps> = ({ dayOfMonth }: DayProps) => {
  const classes = useStyles(defaultStyleProps);

  return <div className={classes.container}>{dayOfMonth}</div>;
};

export default FusionDatePickerDay;
