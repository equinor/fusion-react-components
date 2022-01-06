import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      content: {
        backgroundColor: theme.colors.ui.background__light.getVariable('color'),
        zIndex: 1,
        boxShadow: theme.elevation.raised.getVariable('shadow'),
        borderRadius: '5px',
        padding: '20px',
        '&[data-popper-placement^=top] > $arrow': {
          bottom: 0,
        },
        '&[data-popper-placement^=top] > $arrow::before': {
          bottom: '-7px',
          left: 0,
          borderWidth: '8px 8px 0',
          borderTopColor: 'initial',
          transformOrigin: 'center top',
        },
        '&[data-popper-placement^=bottom] > $arrow': {
          top: 0,
        },
        '&[data-popper-placement^=bottom] > $arrow::before': {
          top: '-7px',
          left: 0,
          borderWidth: '0 8px 8px',
          borderBottomColor: 'initial',
          transformOrigin: 'center bottom',
        },
        '&[data-popper-placement^=left] > $arrow': {
          right: 0,
        },
        '&[data-popper-placement^=left] > $arrow::before': {
          borderWidth: '8px 0 8px 8px',
          borderLeftColor: 'initial',
          right: '-7px',
          transformOrigin: 'center left',
        },
        '&[data-popper-placement^=right] > $arrow': {
          left: 0,
        },
        '&[data-popper-placement^=right] > $arrow::before': {
          left: '-7px',
          borderWidth: '8px 8px 8px 0',
          borderRightColor: 'initial',
          transformOrigin: 'center right',
        },
      },
      arrow: {
        width: '16px',
        height: '16px',
        color: theme.colors.ui.background__light.getVariable('color'),
        '&:before': {
          content: '""',
          position: 'absolute',
          borderColor: 'transparent',
          borderStyle: 'solid',
        },
      },
    }),
  { name: 'fusion-popover' }
);
