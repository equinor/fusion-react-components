export type FusionDatePickerProps = {
  allowKeyboardControl?: boolean;
  allowSameDay?: boolean;
  date: Date | null | undefined;
  dateFormat?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  endDate?: Date;
  excludeDates?: Date[];
  excludeTimes?: Date[];
  filterDate?(date: Date): boolean;
  includeDates?: Date[];
  includeTimes?: Date[];
  injectTimes?: Date[];
  inline?: boolean;
  maxDate?: Date | null;
  maxTime?: Date;
  minDate?: Date | null;
  minTime?: Date;
  onBlur?(): void;
  onChange(date: Date | null): void;
  onClose?(): void;
  onFocus?(): void;
  onMonthChange?(date: Date): void;
  onOpen?(): void;
  onYearChange?(date: Date): void;
  openToDate?: Date;
  placeholder?: string;
  readOnly?: boolean;
  shouldDisableDate?(date: Date): boolean;
  shouldCloseOnSelect?: boolean;
  showTimeSelect?: boolean;
  showTodayButton?: boolean;
  showWeekNumbers?: boolean;
  startDate?: Date;
  startOpen?: boolean;
  tabIndex?: number;
};

export type InputProps = {
  disabled?: boolean;
  onClick?(): void;
  value?: string;
  placeholder?: string;
};

export type HeaderProps = {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  customHeaderCount: number;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
};

export type DayProps = {
  dayOfMonth: number;
  date: Date | undefined;
};
