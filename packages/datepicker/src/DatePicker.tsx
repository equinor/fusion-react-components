import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { FusionDatePickerProps } from './types';
import FusionDatePickerInput from './DatePickerInput';
import FusionDatePickerHeader from './DatePickerHeader';
import { makeStyles, createStyles, FusionTheme } from '@equinor/fusion-react-styles';

import 'react-datepicker/dist/react-datepicker.css';

type StyleProps = {
  fluid?: boolean;
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  () =>
    createStyles({
      wrapper: ({ fluid }) => ({
        width: fluid ? '100%' : 'auto',
      }),
    }),
  { name: 'fusion-datepicker-header' }
);

export const FusionDatePicker: FunctionComponent<FusionDatePickerProps> = (
  props: FusionDatePickerProps
): JSX.Element => {
  const {
    allowKeyboardControl = true,
    allowSameDay = true,
    date,
    dateFormat,
    disabled,
    disableFuture,
    disablePast,
    endDate,
    excludeDates,
    excludeTimes,
    filterDate,
    fluid,
    includeDates,
    includeTimes,
    injectTimes,
    inline,
    locale,
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
    onYearChange,
    openToDate,
    placeholder,
    readOnly,
    shouldCloseOnSelect = true,
    showTimeSelect,
    showWeekNumbers,
    startDate,
    startOpen,
    showTodayButton,
    tabIndex,
  } = props;

  const classes = useStyles({ fluid: fluid });

  return (
    <DatePicker
      allowSameDay={allowSameDay}
      customInput={<FusionDatePickerInput />}
      dateFormat={dateFormat ?? showTimeSelect ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
      disabled={disabled}
      disabledKeyboardNavigation={!allowKeyboardControl}
      endDate={endDate}
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
      onChange={onChange}
      onFocus={onFocus}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
      openToDate={openToDate}
      placeholderText={placeholder}
      readOnly={readOnly}
      renderCustomHeader={(props) => {
        return <FusionDatePickerHeader {...props} />;
      }}
      selected={date}
      shouldCloseOnSelect={shouldCloseOnSelect}
      showPopperArrow={false}
      showTimeSelect={showTimeSelect}
      showWeekNumbers={showWeekNumbers}
      startDate={startDate}
      startOpen={startOpen}
      tabIndex={tabIndex}
      todayButton={showTodayButton ? 'Today' : null}
      wrapperClassName={classes.wrapper}
    />
  );
};

export default FusionDatePicker;
