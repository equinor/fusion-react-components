import { HeaderProps } from 'react-table';
import { TableData } from '../types';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

import ColumnMenu from './menu/ColumnMenu';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.typography.table.cell_header.style,
      },
    }),
  { name: 'fusion-table-header' }
);

export type FusionColumnHeaderProps<D extends TableData> = HeaderProps<D>;

export const FusionColumnHeader = <D extends TableData>(props: FusionColumnHeaderProps<D>): JSX.Element => {
  const { column } = props;
  const styles = useStyle();
  return (
    <div {...column.getHeaderProps()} className={styles.root}>
      {column.render('Header')}
      {column.showMenu && <ColumnMenu {...props}></ColumnMenu>}
    </div>
  );
};

export default FusionColumnHeader;
