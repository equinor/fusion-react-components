import { forwardRef } from 'react';
import { makeStyles, createStyles, theme, FusionTheme } from '@equinor/fusion-react-styles';
import Calendar from './icons/Calendar';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  disabled?: boolean;
  spacing: SpacingType;
};

type InputProps = {
  disabled?: boolean;
  onClick?(): void;
  value?: string;
  placeholder?: string;
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
      input: {
        ...theme.typography.input.text.style,
        ...theme.colors.text.static_icons__tertiary.style,
        border: 'none',
        background: 'none',
        width: '100%',
        '&:focus': {
          outline: `none`,
        },
        '&:disabled': {
          color: theme.colors.interactive.disabled__text.value.hex,
        },
      },
    }),
  { name: 'fusion-datepicker-input' }
);

export const FusionDatePickerInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onClick, disabled, placeholder }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const classes = useStyles({ ...defaultStyleProps, disabled: disabled });

    return (
      <div className={classes.container}>
        <input
          value={value}
          onClick={onClick}
          className={classes.input}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          readOnly
        />
        <Calendar disabled={disabled} />
      </div>
    );
  }
);

export default FusionDatePickerInput;
