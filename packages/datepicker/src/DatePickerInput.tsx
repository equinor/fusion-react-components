import { forwardRef, InputHTMLAttributes } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import Icon from './Icon';
import { calendar, clear } from '@equinor/eds-icons';
import { useState } from 'react';
import { isValid, parse } from 'date-fns';
import { useEffect } from 'react';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  disabled?: boolean;
  hasValue?: boolean;
  isError?: boolean;
  spacing: SpacingType;
};

type InputProps = {
  isClearable?: boolean;
  locale?: Locale;
  onDateChange(date: Date | null): void;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

const getCleanValue = (value: string): string => {
  return value.replace(/[^0-9\-./]/g, '');
};

const parseDate = (value: string): Date | null => {
  const cleanValue = value.replace(/[^0-9]/g, '');
  return cleanValue.length < 8 ? null : parse(cleanValue, 'ddMMyyyy', new Date());
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      container: ({ spacing, disabled }) => ({
        ...theme.spacing.comfortable[spacing].style,
        backgroundColor: theme.colors.ui.background__light.value.hex,
        borderBottom: disabled ? 'none' : `1px solid ${theme.colors.text.static_icons__tertiary.value.hex}`,
        '&:focus-within': {
          outline: `2px solid ${theme.colors.interactive.focus.value.hex}`,
          borderBottom: 'none',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }),
      error: {
        color: 'red',
      },
      input: ({ hasValue, isError }) => ({
        ...theme.typography.input.text.style,
        color: isError
          ? theme.colors.interactive.danger__text.value.hex
          : hasValue
          ? theme.colors.text.static_icons__default.value.hex
          : theme.colors.text.static_icons__tertiary.value.hex,
        border: 'none',
        background: 'none',
        width: '100%',
        '&:focus': {
          outline: `none`,
        },
        '&:disabled': {
          color: theme.colors.interactive.disabled__text.value.hex,
        },
      }),
      icon: {
        ...theme.typography.navigation.menu_title.style,
        '&:hover': {
          cursor: 'pointer',
          color: theme.colors.interactive.primary__hover.value.hex,
        },
      },
    }),
  { name: 'fusion-datepicker-input' }
);

export const FusionDatePickerInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & InputProps>(
  (
    {
      disabled,
      //locale,
      //onChange,
      isClearable,
      onClick,
      placeholder,
      value,
      onDateChange,
    }: InputHTMLAttributes<HTMLInputElement> & InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState<string>(typeof value === 'string' ? value : '');
    const [isError, setIsError] = useState<boolean>(false);

    const classes = useStyles({
      ...defaultStyleProps,
      disabled: disabled,
      hasValue: value ? true : false,
      isError: isError,
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const cleanValue = getCleanValue(event.target.value);
      console.log('cleanValue', cleanValue);
      setInputValue(cleanValue);
      const date = parseDate(cleanValue);
      const isValidDate = isValid(date);
      setIsError(date != null && !isValidDate);
      onDateChange(isValidDate ? date : null);
    };

    useEffect(() => {
      if (typeof value === 'string') {
        setInputValue(value);
      }
    }, [value]);

    return (
      <div className={classes.container}>
        <input
          value={inputValue}
          className={classes.input}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleOnChange}
        />
        {inputValue.length > 0 && isClearable && (
          <Icon
            icon={clear}
            className={classes.icon}
            onClick={() => {
              setInputValue('');
              onDateChange(null);
            }}
          />
        )}
        <Icon icon={calendar} className={classes.icon} onClick={onClick} />
      </div>
    );
  }
);

export default FusionDatePickerInput;
