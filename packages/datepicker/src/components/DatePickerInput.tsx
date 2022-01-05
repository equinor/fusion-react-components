import { forwardRef, InputHTMLAttributes, useCallback } from 'react';
import { makeStyles, createStyles, theme, clsx } from '@equinor/fusion-react-styles';
import Icon from './Icon';
import { calendar, clear, time } from '@equinor/eds-icons';
import { FusionDatePickerType } from '../types';
type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  disabled?: boolean;
  hasValue?: boolean;
  isError?: boolean;
  spacing: SpacingType;
};

type InputProps = {
  dateFormat: string;
  label?: string;
  isClearable?: boolean;
  onClear(): void;
  type: FusionDatePickerType;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      '@keyframes rippling': {
        '0%': {
          transform: 'scale(0)',
        },
        '100%': {
          transform: 'scale(1)',
        },
      },
      container: ({ spacing, disabled }: StyleProps) => ({
        ...theme.spacing.comfortable[spacing].style,
        height: '40px',
        display: 'flex',
        backgroundColor: theme.colors.ui.background__light.value.hex,
        boxShadow: disabled ? 'none' : `0px -0.5px 0px 0px inset ${theme.colors.text.static_icons__tertiary.value.hex}`,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '4px 4px 0 0',
        '&:hover': {
          backgroundColor: theme.colors.ui.background__medium.value.hex,
        },
      }),
      content: {
        display: 'block',
      },
      error: {
        color: 'red',
      },
      ripple: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
      },
      input: ({ hasValue, isError }: StyleProps) => ({
        ...theme.typography.input.text.style,
        color: isError
          ? theme.colors.interactive.danger__text.value.hex
          : hasValue
          ? theme.colors.text.static_icons__default.value.hex
          : theme.colors.text.static_icons__tertiary.value.hex,
        border: 'none',
        background: 'none',
        width: '100%',
        '&:disabled': {
          color: theme.colors.interactive.disabled__text.value.hex,
        },
      }),
      label: {
        ...theme.typography.input.label.style,
        color: theme.colors.text.static_icons__tertiary.getVariable('color'),
      },
      inputFocus: {
        '&:focus': {
          outline: 'none',
          '& ~ $ripple': {
            animation: '$rippling .3s',
            backgroundColor: theme.colors.interactive.focus.value.hex,
            height: '2px',
          },
        },
      },
      icon: {
        ...theme.typography.navigation.menu_title.style,
        color: theme.colors.text.static_icons__tertiary.value.hex,
        '&:hover': {
          cursor: 'pointer',
          color: theme.colors.interactive.primary__hover.value.hex,
        },
      },
    }),
  { name: 'fusion-datepicker-input' }
);

export const FusionDatePickerInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & InputProps>(
  (props: InputHTMLAttributes<HTMLInputElement> & InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { dateFormat, isClearable, onClear, placeholder, type, label, onFocus, onBlur, ...rest } = props;
    const classes = useStyles({
      ...defaultStyleProps,
      disabled: props.disabled,
      hasValue: props.value ? true : false,
    });
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e);
        e.target.placeholder = placeholder ?? '';
      },
      [placeholder, onBlur]
    );
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus && onFocus(e);
        e.target.placeholder = dateFormat;
      },
      [dateFormat, onFocus]
    );

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          {label && <span className={classes.label}>{label}</span>}
          <input
            {...rest}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx(classes.input, classes.inputFocus)}
            ref={ref}
          />
        </div>
        <span className={classes.ripple} />
        {isClearable && props.value ? (
          <Icon
            icon={clear}
            className={classes.icon}
            onClick={() => {
              onClear();
            }}
          />
        ) : type === 'time' ? (
          <Icon icon={time} className={classes.icon} onClick={props.onClick} />
        ) : (
          <Icon icon={calendar} className={classes.icon} onClick={props.onClick} />
        )}
      </div>
    );
  }
);

export default FusionDatePickerInput;
