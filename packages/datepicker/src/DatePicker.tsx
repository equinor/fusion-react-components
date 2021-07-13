import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { FusionDatePickerType, FusionDatePickerProps } from './types';
import { enGB } from 'date-fns/locale';
import { useStyles } from './style';

import FusionDatePickerHeader from './DatePickerHeader';
import FusionDatePickerInput from './DatePickerInput';

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
    height,
    includeDates,
    includeTimes,
    injectTimes,
    inline,
    isClearable = true,
    label,
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

  const classes = useStyles({ width: fluid ? '100%' : width, height: height });

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

  return (
    <div className={classes.container}>
      {label && <span className={classes.label}>{label}</span>}
      <DatePicker
        allowSameDay={allowSameDay}
        customInput={<FusionDatePickerInput isClearable={isClearable} onClear={() => dateOnChange(null)} type={type} />}
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
        maxDate={disableFuture ? new Date() : maxDate}
        maxTime={disableFuture ? new Date() : maxTime}
        minDate={disablePast ? new Date() : minDate}
        minTime={disablePast ? new Date() : minTime}
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
          return (
            <FusionDatePickerHeader
              {...props}
              type={type}
              maxDate={disableFuture ? new Date() : maxDate}
              minDate={disablePast ? new Date() : minDate}
            />
          );
        }}
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
        calendarStartDay={1}
        startOpen={startOpen}
        tabIndex={tabIndex}
        todayButton={showTodayButton ? 'Today' : undefined}
        wrapperClassName={classes.wrapper}
      />
    </div>
  );
};

export default FusionDatePicker;
