import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      checkbox: {
        maxWidth: 'calc(100% - 28px)',
      },
      counter: {
        ...theme.typography.input.label.style,
      },
    }),
  { name: 'fusion-filter-checkbox-option' }
);

export default useStyles;
