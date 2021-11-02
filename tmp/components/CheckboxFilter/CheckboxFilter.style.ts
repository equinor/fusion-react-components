import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      header: {
        minHeight: 32,
        minWidth: 150,
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.comfortable.small.getVariable('padding'),
      },
      title: {
        ...theme.typography.table.cell_header.style,
      },
      items: {
        display: 'inline-flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxWidth: '200px',
      },
    }),
  { name: 'fusion-filter-checkbox' }
);

export default useStyles;
