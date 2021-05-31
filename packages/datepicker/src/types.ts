export type FusionDatePickerProps = {
  allowKeyboardControl?: boolean;
  allowSameDay?: boolean;
  date?: Date | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  dateFormat?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  excludeDates?: Date[];
  excludeTimes?: Date[];
  filterDate?(date: Date): boolean;
  fluid?: boolean;
  height?: string;
  includeDates?: Date[];
  includeTimes?: Date[];
  injectTimes?: Date[];
  inline?: boolean;
  isClearable?: boolean;
  label?: string;
  locale?: Locale;
  maxDate?: Date | null;
  maxTime?: Date;
  minDate?: Date | null;
  minTime?: Date;
  onBlur?(): void;
  onChange?(date: Date | null): void;
  onClose?(): void;
  onFocus?(): void;
  onMonthChange?(date: Date): void;
  onOpen?(): void;
  onRangeChange?(range: [Date | null, Date | null]): void;
  onYearChange?(date: Date): void;
  openToDate?: Date;
  placeholder?: string;
  readOnly?: boolean;
  shouldDisableDate?(date: Date): boolean;
  shouldCloseOnSelect?: boolean;
  showTodayButton?: boolean;
  showWeekNumbers?: boolean;
  startOpen?: boolean;
  tabIndex?: number;
  type?: FusionDatePickerType;
  width?: string;
};

export type FusionDatePickerType = 'year' | 'month' | 'date' | 'date-range' | 'datetime' | 'time' | undefined;
