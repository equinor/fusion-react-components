import { FunctionComponent } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import { format } from 'date-fns';
import { HeaderProps } from './types';

import Arrow from './icons/Arrow';

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
  { name: 'fusion-datepicker-header' }
);

const FusionDatePickerHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { date, decreaseMonth, increaseMonth, nextMonthButtonDisabled, prevMonthButtonDisabled } = props;

  const classes = useStyles(defaultStyleProps);

  return (
    <div className={classes.container}>
      <Arrow direction="back" disabled={prevMonthButtonDisabled} onClick={decreaseMonth} />
      <span className={classes.header}>{format(date, 'MMMM yyyy')}</span>
      <Arrow direction="forward" disabled={nextMonthButtonDisabled} onClick={increaseMonth} />
    </div>
  );
};

export default FusionDatePickerHeader;
