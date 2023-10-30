import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        willChange: 'backgroundColor',
        // TODO - fetch from theme
        transition: '125ms background-color ease-out',
        '&:hover': {
          backgroundColor: theme.colors.interactive.primary__hover_alt.getVariable('color'),
        },
        // maxWidth: '80px',
      },
      inactive: {
        filter: 'grayscale(100%)',
        opacity: 0.5,
      },
      checkbox: {
        '--fwc-checkbox-size': '14px',
      },
      label: {
        ...theme.typography.input.label.style,
        flex: '1 1 auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      counter: {
        ...theme.typography.input.label.style,
        whiteSpace: 'nowrap',
        margin: `0 ${theme.spacing.comfortable.small.getVariable('padding')}`,
      },
      hide: {
        display: 'none',
      },
    }),
  { name: 'fusion-filter-checkbox-option' },
);

export default useStyles;
