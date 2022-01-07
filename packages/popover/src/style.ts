import { makeStyles, createStyles, FusionTheme } from '@equinor/fusion-react-styles';

type popoverStyleProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
};

export const useStyles = makeStyles<FusionTheme, popoverStyleProps>(
  (theme) =>
    createStyles({
      content: ({ width, height, color, backgroundColor }) => ({
        maxWidth: 'calc(100vw - 40px)',
        width: width || 'auto',
        height: height || 'auto',
        color: color || theme.colors.text.static_icons__default.getVariable('color'),
        backgroundColor: backgroundColor || theme.colors.ui.background__light.getVariable('color'),
        zIndex: 3,
        boxShadow: theme.elevation.raised.getVariable('shadow'),
        borderRadius: '5px',
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
      }),
      arrow: ({ backgroundColor }) => ({
        width: '16px',
        height: '16px',
        color: backgroundColor || theme.colors.ui.background__light.getVariable('color'),
        '&:before': {
          content: '""',
          position: 'absolute',
          borderColor: 'transparent',
          borderStyle: 'solid',
        },
      }),
      titleContainer: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '12px 16px 0 16px',
      },
      title: {
        ...theme.typography.ui.accordion_header.style,
      },
      close: {
        marginLeft: 'auto',
      },
      divider: {
        height: '1px',
        backgroundColor: theme.colors.ui.background__medium.getVariable('color'),
        marginTop: '8px',
      },
      contentContainer: {
        padding: '16px',
      },
    }),
  { name: 'fusion-popover' }
);
