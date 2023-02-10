import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        position: 'relative',
        width: '100%',
        margin: '0',
        color: theme.colors.text.static_icons__default.getVariable('color'),
      },
      icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '35px',
        fontWeight: 400,
      },
      closeBtn: {
        width: '100%',
        height: '100%',
        background: 'none',
        border: '1px solid transparent',
        borderRadius: 'var(--mdc-shape-small, 4px)',
        color: theme.colors.interactive.primary__resting.getVariable('color'),
        padding: 0,
        '&:hover': {
          borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
      context: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      },
      titleBlock: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: '0.9em',
        border: '1px solid transparent',
        borderRadius: 'var(--mdc-shape-small, 4px)',
        padding: '0.25em',
        '&:hover': {
          borderColor: theme.colors.interactive.primary__resting.getVariable('color'),
        },
      },
      title: {
        fontSize: '1em',
        fontWeight: 'bold',
      },
      subTitle: {
        fontSize: '0.8em',
        fontStyle: 'italic',
      },
      ctxSelector: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 1,
        zIndex: -1,
        '&.active': {
          zIndex: 1,
        },
      },
      hidden: {
        opacity: 0,
      },
    }),
  { name: 'fusion-header-context-selector' }
);

export default useStyles;
