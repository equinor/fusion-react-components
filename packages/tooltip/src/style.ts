import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      box: {
        ...theme.typography.ui.tooltip.style,
        color: theme.colors.text.static_icons__primary_white.getVariable('color'),
        backgroundColor: theme.colors.text.static_icons__default.getVariable('color'),
        position: 'relative',
        whiteSpace: 'normal',
        outline: 0,
        transitionProperty: 'transform,visibility,opacity',
        lineHeight: 'inherit',
        '&[data-placement^=top] > $arrow': {
          bottom: 0,
        },
        '&[data-placement^=top] > $arrow::before': {
          bottom: '-7px',
          left: 0,
          borderWidth: '8px 8px 0',
          borderTopColor: 'initial',
          transformOrigin: 'center top',
        },
        '&[data-animation=fade][data-state=hidden]': {
          opacity: 0,
        },
        '&[data-tippy-root]': {
          maxWidth: 'calc(100vw - 10px)',
        },
        '&[data-placement^=bottom] > $arrow': {
          top: 0,
        },
        '&[data-placement^=bottom] > $arrow::before': {
          top: '-7px',
          left: 0,
          borderWidth: '0 8px 8px',
          borderBottomColor: 'initial',
          transformOrigin: 'center bottom',
        },
        '&[data-placement^=left] > $arrow': {
          right: 0,
        },
        '&[data-placement^=left] > $arrow::before': {
          borderWidth: '8px 0 8px 8px',
          borderLeftColor: 'initial',
          right: '-7px',
          transformOrigin: 'center left',
        },
        '&[data-placement^=right] > $arrow': {
          left: 0,
        },
        '&[data-placement^=right] > $arrow::before': {
          left: '-7px',
          borderWidth: '8px 8px 8px 0',
          borderRightColor: 'initial',
          transformOrigin: 'center right',
        },
        '&[data-inertia][data-state=visible]': {
          transitionTimingFunction: 'cubic-bezier(.54,1.5,.38,1.11)',
        },
      },
      arrow: {
        width: '16px',
        height: '16px',
        color: theme.colors.text.static_icons__default.getVariable('color'),
        '&:before': {
          content: '""',
          position: 'absolute',
          borderColor: 'transparent',
          borderStyle: 'solid',
        },
      },
      content: {
        position: 'relative',
        padding: '9px',
        zIndex: '1',
      },
    }),
  { name: 'fusion-tooltip' },
);
