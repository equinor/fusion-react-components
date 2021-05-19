import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { FusionDatePickerType, FusionDatePickerProps } from './types';
import { makeStyles, createStyles, FusionTheme } from '@equinor/fusion-react-styles';
//import { isSameDay } from 'date-fns';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import FusionDatePickerHeader from './DatePickerHeader';
import FusionDatePickerInput from './DatePickerInput';

import 'react-datepicker/dist/react-datepicker.css';

type StyleProps = {
  width?: string;
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      popper: {
        zIndex: 99,
      },
      wrapper: ({ width }) => ({
        width: width,
      }),
      day: {
        ...theme.typography.navigation.button.style,
      },
      selectedDay: {
        backgroundColor: 'red',
      },
    }),
  { name: 'fusion-datepicker' }
);

const getDateFormat = (type: FusionDatePickerType): string => {
  switch (type) {
    case 'year':
      return 'yyyy';
    case 'month':
      return 'MMMM yyyy';
    case 'date':
      return 'dd/MM/yyyy';
    case 'date-range':
      return 'dd/MM/yyyy';
    case 'datetime':
      return 'dd/MM/yyyy HH:mm';
    case 'time':
      return 'HH:mm';
    default:
      return 'dd/MM/yyyy';
  }
};

export const FusionDatePicker: FunctionComponent<FusionDatePickerProps> = (
  props: FusionDatePickerProps
): JSX.Element => {
  const {
    allowKeyboardControl = true,
    allowSameDay = true,
    date,
    dateFormat,
    dateFrom,
    dateTo,
    disabled,
    disableFuture,
    disablePast,
    excludeDates,
    excludeTimes,
    filterDate,
    fluid,
    includeDates,
    includeTimes,
    injectTimes,
    inline,
    isClearable = true,
    locale = enGB,
    maxDate,
    maxTime,
    minDate,
    minTime,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onMonthChange,
    onOpen,
    onRangeChange,
    onYearChange,
    openToDate,
    placeholder,
    readOnly,
    shouldCloseOnSelect = true,
    showWeekNumbers,
    startOpen,
    showTodayButton,
    tabIndex,
    type = 'date',
    width = '15em',
  } = props;

  const classes = useStyles({ width: fluid ? '100%' : width });

  const isRange = type === 'date-range';

  if (!isRange && !onChange) {
    throw new Error('onChange is required');
  }

  if (isRange && !onRangeChange) {
    throw new Error('onRangeChange is required');
  }

  const dateOnChange = (value: Date | [Date, Date] | null) => {
    if (!isRange && onChange) {
      onChange(value as Date | null);
    } else if (isRange && onRangeChange) {
      onRangeChange(value ? (value as [Date | null, Date | null]) : ([null, null] as [Date | null, Date | null]));
    }
  };

  // Workaround for date range bug, see https://github.com/Hacker0x01/react-datepicker/issues/2959
  const getValue = () => {
    let dateStr = dateFrom ? format(dateFrom, dateFormat ?? getDateFormat(type)) : '';
    if (dateStr && dateTo) {
      dateStr = `${dateStr} - ${format(dateTo, dateFormat ?? getDateFormat(type))}`;
    }
    return dateStr;
  };

  return (
    <DatePicker
      allowSameDay={allowSameDay}
      customInput={<FusionDatePickerInput isClearable={isClearable} onClear={() => dateOnChange(null)} />}
      dateFormat={dateFormat ?? getDateFormat(type)}
      disabled={disabled}
      disabledKeyboardNavigation={!allowKeyboardControl}
      endDate={isRange ? dateTo : undefined}
      excludeDates={excludeDates}
      excludeTimes={excludeTimes}
      filterDate={filterDate}
      includeDates={includeDates}
      includeTimes={includeTimes}
      injectTimes={injectTimes}
      inline={inline}
      locale={locale}
      maxDate={maxDate ?? disableFuture ? new Date() : null}
      maxTime={maxTime}
      minDate={minDate ?? disablePast ? new Date() : null}
      minTime={minTime}
      onBlur={onBlur}
      onCalendarClose={onClose}
      onCalendarOpen={onOpen}
      onChange={dateOnChange}
      onFocus={onFocus}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
      openToDate={openToDate}
      placeholderText={placeholder}
      popperClassName={classes.popper}
      readOnly={readOnly}
      renderCustomHeader={(props) => {
        return <FusionDatePickerHeader {...props} type={type} />;
      }}
      //dayClassName={(d) => clsx(classes.day, date && isSameDay(d, date) && classes.selectedDay)}
      selected={isRange ? dateFrom : date}
      selectsRange={isRange}
      shouldCloseOnSelect={!isRange && shouldCloseOnSelect}
      showPopperArrow={false}
      showTimeSelect={type === 'datetime' || type === 'time'}
      showTimeSelectOnly={type === 'time'}
      showMonthYearPicker={type === 'month'}
      showYearPicker={type === 'year'}
      showWeekNumbers={showWeekNumbers}
      startDate={isRange ? dateFrom : undefined}
      startOpen={startOpen}
      tabIndex={tabIndex}
      todayButton={showTodayButton ? 'Today' : undefined}
      value={isRange ? getValue() : undefined} // Workaround for range bug
      wrapperClassName={classes.wrapper}
    />
  );
};

export default FusionDatePicker;
