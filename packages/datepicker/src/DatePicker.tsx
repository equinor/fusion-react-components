import { FunctionComponent, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { FusionDatePickerType, FusionDatePickerProps } from './types';
import { enGB } from 'date-fns/locale';
import { useStyles } from './style';

import FusionDatePickerHeader from './components/DatePickerHeader';
import FusionDatePickerInput from './components/DatePickerInput';
import { clsx } from '@equinor/fusion-react-styles';

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

const getDisplayDateFormat = (type: FusionDatePickerType): string => {
  const dateFormat = getDateFormat(type).toLowerCase();

  if (type === 'date-range') {
    return `${dateFormat} - ${dateFormat}`;
  }
  return dateFormat;
};

export const FusionDatePicker: FunctionComponent<FusionDatePickerProps> = (
  props: FusionDatePickerProps
): JSX.Element => {
  const {
    // custom props
    allowKeyboardControl,
    classes,
    date,
    dateFrom,
    dateTo,
    disableFuture,
    disablePast,
    fluid,
    height,
    isClearable,
    label,
    onChange,
    onClose,
    onOpen,
    onBlur,
    onRangeChange,
    placeholder,
    shouldCloseOnSelect,
    shouldDisableDate,
    showTodayButton,
    type,
    width,
    // base props
    ...args
  } = props;

  shouldDisableDate; // TODO @maoft - why not in use?

  const styles = useStyles({ width: fluid ? '100%' : width, height: height });

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

  args.dateFormat ??= getDateFormat(type);
  args.locale ??= enGB;
  disableFuture && (args.maxDate = args.maxTime = new Date());
  disablePast && (args.minDate = args.minTime = new Date());

  const selectedDate = useMemo(() => {
    return isRange ? dateFrom : date;
  }, [isRange, dateFrom, date]);

  return (
    <div className={clsx(styles.container, classes?.host)}>
      {label && <span className={styles.label}>{label}</span>}
      <DatePicker
        {...args}
        customInput={
          <FusionDatePickerInput
            dateFormat={getDisplayDateFormat(type)}
            isClearable={isClearable}
            onClear={() => dateOnChange(null)}
            type={type}
          />
        }
        disabledKeyboardNavigation={!allowKeyboardControl}
        endDate={isRange ? dateTo : undefined}
        onCalendarClose={onClose}
        onCalendarOpen={onOpen}
        onChange={dateOnChange}
        onBlur={onBlur}
        placeholderText={placeholder}
        popperClassName={clsx(styles.popper, classes?.popper)}
        renderCustomHeader={(props) => (
          <FusionDatePickerHeader {...props} type={type} maxDate={args.maxDate} minDate={args.minDate} />
        )}
        selected={selectedDate}
        selectsRange={isRange}
        shouldCloseOnSelect={!isRange && shouldCloseOnSelect}
        showPopperArrow={false}
        showTimeSelect={type === 'datetime' || type === 'time'}
        showTimeSelectOnly={type === 'time'}
        showMonthYearPicker={type === 'month'}
        showYearPicker={type === 'year'}
        startDate={isRange ? dateFrom : undefined}
        calendarStartDay={1}
        todayButton={showTodayButton ? 'Today' : undefined}
        wrapperClassName={clsx(styles.wrapper, classes?.wrapper)}
      />
    </div>
  );
};

export default FusionDatePicker;
