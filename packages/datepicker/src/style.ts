import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

import style from './react-datepicker.css';

type StyleProps = {
  width?: string;
  height?: string;
};

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      ...style,
      container: ({ height = '3.5em' }: StyleProps) => ({
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }),
      popper: {
        zIndex: 99,
        '& .react-datepicker__header': {
          backgroundColor: theme.colors.ui.background__default.getVariable('color'),
          borderBottom: 'none',
          paddingTop: 0,
        },
        '& .react-datepicker__header--time': {
          ...theme.spacing.comfortable.medium.style,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.colors.ui.background__medium.getVariable('color')}`,
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
            padding: `0 ${theme.spacing.comfortable.medium_small.getVariable('padding')}`,
            paddingTop: theme.spacing.comfortable.small.getVariable('padding'),
            margin: 0,
            height: 'var(--react-datepicker-month-height, 241px)',
            '& .react-datepicker__week': {
              display: 'flex',
              '& .react-datepicker__day': {
                color: theme.colors.interactive.primary__resting.getVariable('color'),
                flex: 1,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.getVariable('color'),
                },
                '&:focus': {
                  outline: `1px dashed ${theme.colors.interactive.primary__resting.getVariable('color')}`,
                  outlineOffset: '-1px',
                },
                '&:enabled': {
                  outline: `1px solid ${theme.colors.interactive.primary__resting.getVariable('color')}`,
                  outlineOffset: '-1px',
                },
              },
              '& .react-datepicker__day--weekend': {
                backgroundColor: theme.colors.ui.background__light.getVariable('color'),
                '&:hover': {
                  backgroundColor: theme.colors.interactive.primary__hover_alt.getVariable('color'),
                },
              },
              '& :not(.react-datepicker__day--weekend).react-datepicker__day--keyboard-selected': {
                backgroundColor: 'transparent',
              },
              '& .react-datepicker__day--selected, .react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range, .react-datepicker__day--range-end':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.getVariable(
                    'color',
                  )} !important`,
                  color: theme.colors.interactive.primary__resting.getVariable('color'),
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.getVariable(
                      'color',
                    )} !important`,
                  },
                },
              '& .react-datepicker__day--today': {
                fontWeight: 'bold',
              },
              '& .react-datepicker__day--disabled': {
                color: theme.colors.interactive.disabled__text.getVariable('color'),
              },
            },
            '& .react-datepicker__month-wrapper': {
              display: 'flex',
              '& .react-datepicker__month-text': {
                color: theme.colors.interactive.primary__resting.getVariable('color'),
                flex: 1,
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
              '& .react-datepicker__month--selected, .react-datepicker__month--selected .react-datepicker__month-text--keyboard-selected, .react-datepicker__month-text--selected':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.getVariable(
                    'color',
                  )} !important`,
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.getVariable(
                      'color',
                    )} !important`,
                  },
                },
              '& :not(.react-datepicker__month--selected).react-datepicker__month-text--keyboard-selected': {
                background: 'transparent',
                outline: `1px dashed ${theme.colors.interactive.primary__resting.getVariable('color')}`,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.getVariable('color'),
                },
              },
              '& .react-datepicker__month--disabled': {
                color: theme.colors.interactive.disabled__text.getVariable('color'),
              },
            },
          },
          '& .react-datepicker__day-names': {
            ...theme.spacing.comfortable.medium.style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 0,
            paddingTop: theme.spacing.comfortable.small.getVariable('padding'),
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
                color: theme.colors.interactive.primary__resting.getVariable('color'),
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
              '& .react-datepicker__year-text--selected, .react-datepicker__year-text--selected .react-datepicker__year-text--today':
                {
                  backgroundColor: `${theme.colors.interactive.primary__selected_highlight.getVariable(
                    'color',
                  )} !important`,
                  color: theme.colors.interactive.primary__resting.getVariable('color'),
                  '&:hover': {
                    backgroundColor: `${theme.colors.interactive.primary__selected_hover.getVariable(
                      'color',
                    )} !important`,
                  },
                },
              '& .react-datepicker__year-text--keyboard-selected': {
                background: 'transparent',
                outline: `1px dashed ${theme.colors.interactive.primary__resting.getVariable('color')}`,
                '&:hover': {
                  backgroundColor: theme.colors.interactive.table__cell__fill_hover.getVariable('color'),
                },
              },
              '& .react-datepicker__year-text--today': {
                fontWeight: 'bold',
              },
              '& .react-datepicker__year-text--disabled': {
                color: theme.colors.interactive.disabled__text.getVariable('color'),
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
                color: theme.colors.interactive.primary__resting.getVariable('color'),
                margin: 0,
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
            },
            '& .react-datepicker__time-list-item--selected': {
              backgroundColor: `${theme.colors.interactive.primary__selected_highlight.getVariable(
                'color',
              )} !important`,
              color: `${theme.colors.interactive.primary__resting.getVariable('color')} !important`,
              '&:hover': {
                backgroundColor: `${theme.colors.interactive.primary__selected_hover.getVariable('color')} !important`,
              },
            },
            '& .react-datepicker__time-list-item--disabled': {
              color: theme.colors.interactive.disabled__text.getVariable('color'),
            },
          },
        },
      },
      wrapper: ({ width }: StyleProps) => ({ width }),
    }),
  { name: 'fusion-datepicker' },
);
