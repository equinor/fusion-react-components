import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  () =>
    createStyles({
      CheckBoxFilterContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        paddingBottom: '0px',
        boxSizing: 'border-box',
        minWidth: '150px',
        maxWidth: '240px',
      },
      FilterHeader: {
        padding: '0 8px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      },
      TextInputIcon: {
        transform: 'scale(0.8)',
        cursor: 'pointer',
      },
      FilterOptionsContainer: {
        flexDirection: 'column',
        overflowY: 'auto',
        margin: 0,
        padding: 0,
      },
    }),
  { name: 'fusion-filterpane-checkBoxFilter' }
);

export default useStyles;
