import type { ReactDatePickerProps } from 'react-datepicker';

export type DatePickerPopperProps = Partial<
  Pick<ReactDatePickerProps<string>, 'popperModifiers' | 'popperProps' | 'popperPlacement'>
>;

export type DatePickerCustomClasses = Record<'host' | 'popper' | 'wrapper', string>;

export type DatePickerBaseProps = DatePickerPopperProps &
  Partial<
    Pick<
      ReactDatePickerProps<string>,
      | 'allowSameDay'
      | 'dateFormat'
      | 'disabled'
      | 'excludeDates'
      | 'excludeTimes'
      | 'filterDate'
      | 'includeDates'
      | 'includeTimes'
      | 'injectTimes'
      | 'inline'
      | 'locale'
      | 'maxDate'
      | 'maxTime'
      | 'minDate'
      | 'minTime'
      | 'onFocus'
      | 'onMonthChange'
      | 'onYearChange'
      | 'openToDate'
      | 'readOnly'
      | 'startOpen'
      | 'showWeekNumbers'
      | 'tabIndex'
    >
  >;

export type DatePickerCustomProps = {
  allowKeyboardControl?: boolean;
  date?: Date | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  disableFuture?: boolean;
  disablePast?: boolean;
  fluid?: boolean;
  height?: string;
  isClearable?: boolean;
  label?: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement, Element>): void;
  onChange?(date: Date | null): void;
  onClose?(): void;
  onOpen?(): void;
  onRangeChange?(range: [Date | null, Date | null]): void;
  placeholder?: string;
  shouldDisableDate?(date: Date): boolean;
  shouldCloseOnSelect?: boolean;
  showTodayButton?: boolean;
  showWeekNumbers?: boolean;
  type?: FusionDatePickerType;
  width?: string;
  classes?: Partial<DatePickerCustomClasses>;
};

export type FusionDatePickerProps = DatePickerBaseProps & DatePickerCustomProps;

export type FusionDatePickerType = 'year' | 'month' | 'date' | 'date-range' | 'datetime' | 'time' | undefined;
