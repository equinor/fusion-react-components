import { tokens } from '@equinor/eds-tokens';
import { ClassNameMap, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import styles from './styles.jss.json';

export const useStyles = makeStyles(
  () =>
    createStyles({
      root: () => ({
        '--ag-background-color': tokens.colors.interactive.table__cell__fill_resting.hex,
        '--ag-header-background-color': tokens.colors.interactive.table__header__fill_resting.hex,
      }),
      ...styles,
    }),
  { name: 'fusion-ag-grid-styles' },
) as () => ClassNameMap;

export default useStyles;
