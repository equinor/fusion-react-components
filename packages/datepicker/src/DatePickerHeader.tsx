import { FunctionComponent } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import Arrow from './icons/Arrow';
import { DatePickerType } from './types';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  spacing: SpacingType;
};

type HeaderProps = {
  changeMonth(month: number): void;
  changeYear(year: number): void;
  customHeaderCount: number;
  date: Date;
  decreaseMonth(): void;
  decreaseYear(): void;
  increaseMonth(): void;
  increaseYear(): void;
  nextMonthButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
  prevMonthButtonDisabled: boolean;
  prevYearButtonDisabled: boolean;
  type: DatePickerType;
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
      monthHeader: {
        ...theme.typography.navigation.menu_title.style,
        flex: 1,
        textAlign: 'center',
        '&:hover': {
          cursor: 'pointer',
          color: theme.colors.interactive.primary__hover.value.hex,
        },
      },
      yearHeader: {
        ...theme.typography.navigation.menu_title.style,
        flex: 1,
        textAlign: 'center',
      },
    }),
  { name: 'fusion-datepicker-header' }
);

const MonthHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const {
    changeMonth,
    changeYear,
    date,
    decreaseMonth,
    increaseMonth,
    nextMonthButtonDisabled,
    prevMonthButtonDisabled,
  } = props;

  const classes = useStyles(defaultStyleProps);

  return (
    <div className={classes.container}>
      <Arrow direction="back" disabled={prevMonthButtonDisabled} onClick={decreaseMonth} />
      <DatePicker
        customInput={<span>{format(date, 'MMMM yyyy')}</span>}
        renderCustomHeader={(props) => {
          return <YearHeader {...props} type={'month'} />;
        }}
        selected={date}
        onChange={(date: Date) => {
          changeMonth(date.getMonth());
          changeYear(date.getFullYear());
        }}
        showMonthYearPicker={true}
        wrapperClassName={classes.monthHeader}
      />

      <Arrow direction="forward" disabled={nextMonthButtonDisabled} onClick={increaseMonth} />
    </div>
  );
};

const YearHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { date, decreaseYear, increaseYear, nextYearButtonDisabled, prevYearButtonDisabled } = props;

  const classes = useStyles(defaultStyleProps);

  return (
    <div className={classes.container}>
      <Arrow direction="back" disabled={prevYearButtonDisabled} onClick={decreaseYear} />
      <span className={classes.yearHeader}>{format(date, 'yyyy')}</span>
      <Arrow direction="forward" disabled={nextYearButtonDisabled} onClick={increaseYear} />
    </div>
  );
};

export const FusionDatePickerHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { type } = props;

  return type === 'month' || type === 'year' ? <YearHeader {...props} /> : <MonthHeader {...props} />;
};

export default FusionDatePickerHeader;
