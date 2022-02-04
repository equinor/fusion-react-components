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
      baseElement: {
        cursor: 'pointer',
      },
      content: ({ width, height, color, backgroundColor }) => ({
        maxWidth: 'calc(100vw - 40px)',
        width: width || 'auto',
        height: height || 'auto',
        color: color || theme.colors.text.static_icons__default.getVariable('color'),
        backgroundColor: backgroundColor || theme.colors.ui.background__default.getVariable('color'),
        zIndex: 3,
        boxShadow: theme.elevation.raised.getVariable('shadow'),
        borderRadius: '4px',
        '&[data-popper-placement^=top] > $arrow': {
          bottom: 0,
        },
        '&[data-popper-placement^=top] > $arrow::before': {
          bottom: '-9px',
          left: 0,
          transform: 'rotate(45deg)',
          transformOrigin: 'center right',
          boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.2)',
          borderColor: 'transparent initial initial transparent',
        },
        '&[data-popper-placement^=right] > $arrow': {
          left: 0,
        },
        '&[data-popper-placement^=right] > $arrow::before': {
          left: '-9px',
          transform: 'rotate(45deg)',
          transformOrigin: 'center bottom',
          boxShadow: '-2px 2px 3px rgba(0, 0, 0, 0.2)',
          borderColor: 'transparent transparent initial initial',
        },
        '&[data-popper-placement^=bottom] > $arrow': {
          top: 0,
        },
        '&[data-popper-placement^=bottom] > $arrow::before': {
          top: '-9px',
          left: 0,
          transform: 'rotate(-45deg)',
          transformOrigin: 'center right',
          boxShadow: '1px -1px 2px rgba(0, 0, 0, 0.08)',
          borderColor: 'transparent initial initial transparent',
        },
        '&[data-popper-placement^=left] > $arrow': {
          right: 0,
        },
        '&[data-popper-placement^=left] > $arrow::before': {
          right: '-9px',
          transform: 'rotate(-45deg)',
          transformOrigin: 'center bottom',
          boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.12)',
          borderColor: 'initial initial transparent transparent',
        },
      }),
      arrow: ({ backgroundColor }) => ({
        width: '16px',
        height: '16px',
        zIndex: '-1',
        color: backgroundColor || theme.colors.ui.background__default.getVariable('color'),
        '&:before': {
          content: '""',
          position: 'absolute',
          borderStyle: 'solid',
          borderWidth: '8px 8px 4px 4px',
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
        cursor: 'pointer',
        color: theme.colors.interactive.primary__resting.getVariable('color'),
        '&:hover': {
          color: theme.colors.interactive.primary__hover.getVariable('color'),
        },
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
