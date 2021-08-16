import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { HeaderProps } from 'react-table';

import SortIcon, { IconType } from '../../../components/icons/Sort';
import { ColumnType, TableData } from '../../../types';

const getIconType = (type?: ColumnType): IconType => {
  switch (type) {
    case 'text':
      return 'alpha';
    case 'number':
      return 'numeric';
  }
  return 'amount';
};

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    }),
  { name: 'fusion-table-menu-item-sort' }
);

export const ColumnMenuItemSort = <D extends TableData>(props: HeaderProps<D>): JSX.Element => {
  const { column } = props;
  const sortOptions = column.getSortByToggleProps();
  const styles = useStyles();
  return (
    <span {...sortOptions} className={styles.root}>
      <span>Sort</span>
      {column.isSorted && (
        <SortIcon type={getIconType(column.dataType)} descending={column.isSortedDesc} active={column.isSorted} />
      )}
    </span>
  );
};

export default ColumnMenuItemSort;
