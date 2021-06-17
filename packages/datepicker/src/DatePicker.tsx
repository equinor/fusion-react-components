import { FunctionComponent } from 'react';
import DatePicker from 'react-datepicker';
import { FusionDatePickerType, FusionDatePickerProps } from './types';
import { makeStyles, createStyles, FusionTheme } from '@equinor/fusion-react-styles';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import FusionDatePickerHeader from './DatePickerHeader';
import FusionDatePickerInput from './DatePickerInput';

import 'react-datepicker/dist/react-datepicker.css';

type StyleProps = {
  width?: string;
  height?: string;
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      container: ({ height }) => ({
        height: height ?? '3.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }),
      label: {
        ...theme.typography.input.label.style,
        color: theme.colors.text.static_icons__tertiary.value.hex,
        paddingLeft: 'calc(0.5em + 2px)',
      },
      popper: {
        zIndex: 99,
        '& .react-datepicker__header': {
          backgroundColor: theme.colors.ui.background__default.value.hex,
          borderBottom: 'none',
          paddingTop: 0,
        },
        '& .react-datepicker__header--time': {
          ...theme.spacing.comfortable.medium.style,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.colors.ui.background__medium.value.hex}`,
          '& .react-datepicker-time__header': {
            ...theme.typography.navigation.menu_title.style,
            flex: 1,
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: '1.25em',
          },
        },
        '& .react-datepicker__month-container': {
          width: '19.5rem',
          '& .react-datepicker__month': {
            ...theme.spacing.comfortable.medium.style,
            paddingTop: theme.spacing.comfortable.small.value,
            margin: 0,
            '& .react-datepicker__week': {
              display: 'flex',
              '& .react-datepicker__day': {
                color: theme.colors.interactive.primary__resting.value.hex,
                flex: 1,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.value.hex,
                },
                '&:focus': {
                  outline: `1px dashed ${theme.colors.interactive.primary__resting.value.hex}`,
                  outlineOffset: '-1px',
                },
                '&:enabled': {
                  outline: `1px solid ${theme.colors.interactive.primary__resting.value.hex}`,
                  outlineOffset: '-1px',
                },
              },
              '& .react-datepicker__day--weekend': {
                backgroundColor: theme.colors.ui.background__light.value.hex,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.primary__hover_alt.value.hex,
                },
              },
              '& :not(.react-datepicker__day--weekend).react-datepicker__day--keyboard-selected': {
                backgroundColor: 'transparent',
              },
              '& .react-datepicker__day--selected, .react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range, .react-datepicker__day--range-end':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.value.hex} !important`,
                  color: theme.colors.interactive.primary__resting.value.hex,
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.value.hex} !important`,
                  },
                },
              '& .react-datepicker__day--today': {
                fontWeight: 'bold',
              },
              '& .react-datepicker__day--disabled': {
                color: theme.colors.interactive.disabled__text.value.hex,
              },
            },
            '& .react-datepicker__month-wrapper': {
              display: 'flex',
              '& .react-datepicker__month-text': {
                color: theme.colors.interactive.primary__resting.value.hex,
                flex: 1,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
              '& .react-datepicker__month--selected, .react-datepicker__month--selected .react-datepicker__month-text--keyboard-selected':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.value.hex} !important`,
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.value.hex} !important`,
                  },
                },
              '& :not(.react-datepicker__month--selected).react-datepicker__month-text--keyboard-selected': {
                background: 'transparent',
                outline: `1px dashed ${theme.colors.interactive.primary__resting.value.hex}`,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.value.hex,
                },
              },
              '& .react-datepicker__month--disabled': {
                color: theme.colors.interactive.disabled__text.value.hex,
              },
            },
          },
          '& .react-datepicker__day-names': {
            ...theme.spacing.comfortable.medium.style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 0,
            paddingTop: theme.spacing.comfortable.small.value,
            '& .react-datepicker__day-name': {
              ...theme.typography.paragraph.overline.style,
              ...theme.spacing.comfortable.x_small.style,
              flex: 1,
              userSelect: 'none',
              lineHeight: '1.25em',
              textAlign: 'center',
            },
          },
        },
        '& .react-datepicker__year--container': {
          width: '19.5rem',
          '& .react-datepicker__year': {
            ...theme.spacing.comfortable.medium.style,
            margin: 0,
            width: 'auto',
            '& .react-datepicker__year-wrapper': {
              maxWidth: 'max-content',
              display: 'flex',
              alignitems: 'center',
              justifyContent: 'center',
              '& .react-datepicker__year-text': {
                color: theme.colors.interactive.primary__resting.value.hex,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
              '& .react-datepicker__year-text--selected, .react-datepicker__year-text--selected .react-datepicker__year-text--today':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.value.hex} !important`,
                  color: theme.colors.interactive.primary__resting.value.hex,
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.value.hex} !important`,
                  },
                },
              '& .react-datepicker__year-text--keyboard-selected': {
                background: 'transparent',
                outline: `1px dashed ${theme.colors.interactive.primary__resting.value.hex}`,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.value.hex,
                },
              },
              '& .react-datepicker__year-text--today': {
                fontWeight: 'bold',
              },
              '& .react-datepicker__year-text--disabled': {
                color: theme.colors.interactive.disabled__text.value.hex,
              },
            },
          },
        },
        '& .react-datepicker__time-container': {
          minWidth: '10em',
          '& .react-datepicker__time': {
            width: 'auto',
            '& .react-datepicker__time-box': {
              width: 'auto',
              '& .react-datepicker__time-list-item': {
                color: theme.colors.interactive.primary__resting.value.hex,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
            },
            '& .react-datepicker__time-list-item--selected': {
              backgroundColor: `${theme.colors.interactive.primary__selected_highlight.value.hex} !important`,
              color: `${theme.colors.interactive.primary__resting.value.hex} !important`,
              '&:hover': {
                backgroundColor: `${theme.colors.interactive.primary__selected_hover.value.hex} !important`,
              },
            },
            '& .react-datepicker__time-list-item--disabled': {
              color: theme.colors.interactive.disabled__text.value.hex,
            },
          },
        },
      },
      wrapper: ({ width }) => ({
        width: width,
      }),
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

  // Workaround for date range bug, see https://github.com/Hacker0x01/react-datepicker/issues/2959
  const getValue = () => {
    let dateStr = dateFrom ? format(dateFrom, dateFormat ?? getDateFormat(type)) : '';
    if (dateStr && dateTo) {
      dateStr = `${dateStr} - ${format(dateTo, dateFormat ?? getDateFormat(type))}`;
    }
    return dateStr;
  };

  return (
    <div className={classes.container}>
      {label && <span className={classes.label}>{label}</span>}
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
        startOpen={startOpen}
        tabIndex={tabIndex}
        todayButton={showTodayButton ? 'Today' : undefined}
        value={isRange ? getValue() : undefined} // Workaround for range bug
        wrapperClassName={classes.wrapper}
      />
    </div>
  );
};

export default FusionDatePicker;
