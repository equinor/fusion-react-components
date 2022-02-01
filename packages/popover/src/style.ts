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
        backgroundColor: backgroundColor || theme.colors.ui.background__light.getVariable('color'),
        zIndex: 3,
        boxShadow: theme.elevation.raised.getVariable('shadow'),
        borderRadius: '4px',
        '&[data-popper-placement^=top] > $arrow': {
          bottom: 0,
        },
        '&[data-popper-placement^=top] > $arrow::before': {
          bottom: '-4px',
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
          left: '-4px',
          transform: 'rotate(45deg)',
          transformOrigin: 'center bottom',
          boxShadow: '-2px 2px 3px rgba(0, 0, 0, 0.2)',
          borderColor: 'transparent transparent initial initial',
        },
        '&[data-popper-placement^=bottom] > $arrow': {
          top: 0,
        },
        '&[data-popper-placement^=bottom] > $arrow::before': {
          top: '-4px',
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
          right: '-4px',
          transform: 'rotate(-45deg)',
          transformOrigin: 'center bottom',
          boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.12)',
          borderColor: 'initial initial transparent transparent',
        },
      }),
      arrow: ({ backgroundColor }) => ({
        width: '8px',
        height: '8px',
        zIndex: '-1',
        color: backgroundColor || theme.colors.ui.background__light.getVariable('color'),
        '&:before': {
          content: '""',
          position: 'absolute',
          borderStyle: 'solid',
          borderWidth: '4px 4px 2px 2px',
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
