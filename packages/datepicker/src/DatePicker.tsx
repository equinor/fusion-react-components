import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { DatePickerType, FusionDatePickerProps } from './types';
import { makeStyles, createStyles, FusionTheme } from '@equinor/fusion-react-styles';
//import { isSameDay } from 'date-fns';
import { enGB } from 'date-fns/locale';

import FusionDatePickerHeader from './DatePickerHeader';
import FusionDatePickerInput from './DatePickerInput';

import 'react-datepicker/dist/react-datepicker.css';

type StyleProps = {
  fluid?: boolean;
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      wrapper: ({ fluid }) => ({
        width: fluid ? '100%' : 'auto',
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

const getDateFormat = (type: DatePickerType): string => {
  switch (type) {
    case 'year':
      return 'yyyy';
    case 'month':
      return 'MMMM yyyy';
    case 'date':
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
    onYearChange,
    openToDate,
    placeholder,
    readOnly,
    shouldCloseOnSelect = true,
    showWeekNumbers,
    startDate,
    startOpen,
    showTodayButton,
    tabIndex,
    type = 'date',
  } = props;

  const classes = useStyles({ fluid: fluid });

  return (
    <DatePicker
      allowSameDay={allowSameDay}
      customInput={
        <FusionDatePickerInput
          onClear={() => {
            onChange(null);
          }}
          onChange={(value: string) => {
            console.log('value', value);
          }}
        />
      }
      dateFormat={getDateFormat(type)}
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
        return <FusionDatePickerHeader {...props} type={type} />;
      }}
      //dayClassName={(d) => clsx(classes.day, date && isSameDay(d, date) && classes.selectedDay)}
      selected={date}
      shouldCloseOnSelect={shouldCloseOnSelect}
      showPopperArrow={false}
      showTimeSelect={type === 'datetime' || type === 'time'}
      showTimeSelectOnly={type === 'time'}
      showMonthYearPicker={type === 'month'}
      showYearPicker={type === 'year'}
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
