import { makeStyles, createStyles, FusionTheme, Styles } from '@equinor/fusion-react-styles';

import style from './react-datepicker.css';

type StyleProps = {
  width?: string;
  height?: string;
};

export const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      ...(style as Styles<FusionTheme, any, string>),
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
