import { forwardRef } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import Icon from './Icon';
import { calendar, clear } from '@equinor/eds-icons';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  disabled?: boolean;
  hasValue?: boolean;
  spacing: SpacingType;
};

type IconProps = {
  disabled?: boolean;
  onClick?(): void;
};

type InputProps = {
  disabled?: boolean;
  onChange(value: string | null | undefined): void;
  onClear?(): void;
  onClick?(): void;
  placeholder?: string;
  value?: string;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
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
      input: ({ hasValue }) => ({
        ...theme.typography.input.text.style,
        color: hasValue
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

const CalendarIcon = ({ disabled, onClick }: IconProps) => {
  const classes = useStyles({ ...defaultStyleProps, disabled: disabled });

  return (
    <div className={classes.icon} onClick={onClick}>
      <Icon icon={calendar} />
    </div>
  );
};

const ClearIcon = ({ disabled, onClick }: IconProps) => {
  const classes = useStyles({ ...defaultStyleProps, disabled: disabled });

  return (
    <div className={classes.icon} onClick={onClick}>
      <Icon icon={clear} />
    </div>
  );
};

export const FusionDatePickerInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { disabled, onChange, onClear, onClick, placeholder, value }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const classes = useStyles({ ...defaultStyleProps, disabled: disabled, hasValue: value ? true : false });

    return (
      <div className={classes.container}>
        <input
          value={value}
          className={classes.input}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        />
        {value && <ClearIcon onClick={onClear} />}
        <CalendarIcon onClick={onClick} />
      </div>
    );
  }
);

export default FusionDatePickerInput;
