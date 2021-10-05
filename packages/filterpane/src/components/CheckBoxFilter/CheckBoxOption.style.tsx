import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  () =>
    createStyles({
      FilterOption: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      },
      FilterOptionLabel: {
        flex: 1,
        overflow: 'hidden',
        height: '100%',
        cursor: 'pointer',
        alignItems: 'center',
        textOverflow: 'ellipsis',
      },
      FilterOptionCount: {
        wordBreak: 'keep-all',
        display: 'flex',
        padding: '8px',
        justifyContent: 'flex-end',
      },
    }),
  { name: 'fusion-filterpane-checkboxFilterOption' }
);

export default useStyles;
