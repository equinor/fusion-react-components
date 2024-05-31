import { ClassNameMap, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import styles from './styles.jss.json';

export const useStyles = makeStyles(
  () =>
    createStyles({
      ...styles,
    }),
  { name: 'fusion-ag-grid-styles' },
) as () => ClassNameMap;

export default useStyles;
