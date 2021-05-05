import { FunctionComponent, forwardRef } from 'react';
import { makeStyles, createStyles, theme, FusionTheme, clsx } from '@equinor/fusion-react-styles';
import { format } from 'date-fns';
import { DatePickerType } from './types';
import DatePicker from 'react-datepicker';
import Icon from './Icon';
import { arrow_back, arrow_drop_down, arrow_forward } from '@equinor/eds-icons';

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

type InputProps = {
  disabled?: boolean;
  onClear?(): void;
  onClick?(): void;
  placeholder?: string;
  value?: string;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      clickable: {
        '&:hover': {
          cursor: 'pointer',
          color: theme.colors.interactive.primary__hover.value.hex,
        },
      },
      container: ({ spacing }) => ({
        ...theme.spacing.comfortable[spacing].style,
        display: 'flex',
        alignItems: 'center',
      }),
      disabled: {
        color: theme.colors.interactive.disabled__text.value.hex,
      },
      monthHeader: {
        flex: 1,
      },
      monthHeaderInput: {
        ...theme.typography.navigation.menu_title.style,
        color: 'currentColor',
        verticalAlign: 'middle',
        userSelect: 'none',
      },
      yearHeader: {
        ...theme.typography.navigation.menu_title.style,
        flex: 1,
        textAlign: 'center',
        userSelect: 'none',
      },
    }),
  { name: 'fusion-datepicker-header' }
);

const MonthHeaderInput = forwardRef<HTMLInputElement, InputProps>(
  ({ onClick, value }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const classes = useStyles(defaultStyleProps);
    return (
      <div onClick={onClick}>
        <span className={classes.monthHeaderInput} ref={ref}>
          {value}
        </span>
        <Icon icon={arrow_drop_down} />
      </div>
    );
  }
);

MonthHeaderInput.displayName = 'MonthHeaderInput';

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
      <div onClick={decreaseMonth} className={nextMonthButtonDisabled ? classes.disabled : classes.clickable}>
        <Icon icon={arrow_back} />
      </div>
      <DatePicker
        customInput={<MonthHeaderInput />}
        dateFormat="MMMM yyyy"
        renderCustomHeader={(props) => {
          return <YearHeader {...props} type={'month'} />;
        }}
        selected={date}
        onChange={(date: Date) => {
          changeMonth(date.getMonth());
          changeYear(date.getFullYear());
        }}
        showMonthYearPicker={true}
        wrapperClassName={clsx(classes.monthHeader, classes.clickable)}
      />
      <div onClick={increaseMonth} className={prevMonthButtonDisabled ? classes.disabled : classes.clickable}>
        <Icon icon={arrow_forward} />
      </div>
    </div>
  );
};

const YearHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { date, decreaseYear, increaseYear, nextYearButtonDisabled, prevYearButtonDisabled } = props;

  const classes = useStyles(defaultStyleProps);

  return (
    <div className={classes.container}>
      <div onClick={decreaseYear} className={prevYearButtonDisabled ? classes.disabled : classes.clickable}>
        <Icon icon={arrow_back} />
      </div>
      <span className={classes.yearHeader}>{format(date, 'yyyy')}</span>
      <div onClick={increaseYear} className={nextYearButtonDisabled ? classes.disabled : classes.clickable}>
        <Icon icon={arrow_forward} />
      </div>
    </div>
  );
};

export const FusionDatePickerHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { type } = props;

  return type === 'month' || type === 'year' ? <YearHeader {...props} /> : <MonthHeader {...props} />;
};

export default FusionDatePickerHeader;
