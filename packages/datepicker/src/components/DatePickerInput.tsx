import { forwardRef, InputHTMLAttributes } from 'react';
import { makeStyles, createStyles, theme } from '@equinor/fusion-react-styles';
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
      container: ({ spacing, disabled }: StyleProps) => ({
        ...theme.spacing.comfortable[spacing].style,
        backgroundColor: theme.colors.ui.background__light.value.hex,
        borderBottom: disabled ? 'none' : `1px solid ${theme.colors.text.static_icons__tertiary.value.hex}`,
        '&:focus-within': {
          outline: `2px solid ${theme.colors.interactive.focus.value.hex}`,
          borderBottom: '1px solid transparent',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }),
      error: {
        color: 'red',
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
        '&:focus': {
          outline: `none`,
        },
        '&:disabled': {
          color: theme.colors.interactive.disabled__text.value.hex,
        },
      }),
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
    const { dateFormat, isClearable, onClear, placeholder, type, ...rest } = props;

    const classes = useStyles({
      ...defaultStyleProps,
      disabled: props.disabled,
      hasValue: props.value ? true : false,
    });

    return (
      <div className={classes.container}>
        <input
          {...rest}
          placeholder={placeholder}
          onFocus={(e) => (e.target.placeholder = dateFormat)}
          onBlur={(e) => {
            e.target.placeholder = placeholder ?? '';
          }}
          className={classes.input}
          ref={ref}
        />
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
