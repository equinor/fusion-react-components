import { FunctionComponent, forwardRef } from 'react';
import { makeStyles, createStyles, theme, FusionTheme, clsx } from '@equinor/fusion-react-styles';
import { format } from 'date-fns';
import { FusionDatePickerType } from './types';
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
  maxDate?: Date | null;
  minDate?: Date | null;
  nextMonthButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
  prevMonthButtonDisabled: boolean;
  prevYearButtonDisabled: boolean;
  type: FusionDatePickerType;
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      monthHeaderInputText: {
        ...theme.typography.navigation.menu_title.style,
        color: 'currentColor',
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
      <div className={classes.monthHeaderInput} onClick={onClick}>
        <span className={classes.monthHeaderInputText} ref={ref}>
          {value}
        </span>
        <Icon icon={arrow_drop_down} />
      </div>
    );
  }
);

MonthHeaderInput.displayName = 'MonthHeaderInput';

export const FusionDatePickerHeader: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const {
    changeMonth,
    changeYear,
    date,
    decreaseMonth,
    decreaseYear,
    increaseMonth,
    increaseYear,
    nextMonthButtonDisabled,
    nextYearButtonDisabled,
    prevMonthButtonDisabled,
    prevYearButtonDisabled,
    type,
    maxDate,
    minDate,
  } = props;

  const classes = useStyles(defaultStyleProps);

  const showYearPicker = type == 'month' || type === 'year';

  return (
    <div className={classes.container}>
      <Icon
        icon={arrow_back}
        onClick={
          showYearPicker
            ? prevYearButtonDisabled
              ? undefined
              : decreaseYear
            : prevMonthButtonDisabled
            ? undefined
            : decreaseMonth
        }
        className={
          (showYearPicker && prevYearButtonDisabled) || prevMonthButtonDisabled ? classes.disabled : classes.clickable
        }
      />
      {showYearPicker ? (
        <span className={classes.yearHeader}>{format(date, 'yyyy')}</span>
      ) : (
        <DatePicker
          customInput={<MonthHeaderInput />}
          dateFormat="MMMM yyyy"
          maxDate={maxDate}
          minDate={minDate}
          onChange={(d: Date) => {
            changeYear(d.getFullYear());
            changeMonth(d.getMonth());
          }}
          renderCustomHeader={(props) => {
            return <FusionDatePickerHeader {...props} type="month" maxDate={maxDate} minDate={minDate} />;
          }}
          selected={date}
          showMonthYearPicker={true}
          wrapperClassName={clsx(classes.monthHeader, classes.clickable)}
        />
      )}

      <Icon
        icon={arrow_forward}
        onClick={
          showYearPicker
            ? nextYearButtonDisabled
              ? undefined
              : increaseYear
            : nextMonthButtonDisabled
            ? undefined
            : increaseMonth
        }
        className={
          (showYearPicker && nextYearButtonDisabled) || nextMonthButtonDisabled ? classes.disabled : classes.clickable
        }
      />
    </div>
  );
};

export default FusionDatePickerHeader;
