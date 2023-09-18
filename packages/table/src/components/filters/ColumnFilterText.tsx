import { HeaderProps } from 'react-table';

import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

import { TableData } from '../../types';

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        display: 'flex',
        flexFlow: 'column',
      },
    }),
  { name: 'fusion-table-menu-item-sort' },
);

export const ColumnFilterText = <D extends TableData>(props: HeaderProps<D>): JSX.Element => {
  const { column } = props;
  const { filterValue = [], preFilteredRows, setFilter } = column;
  const count = preFilteredRows.length;
  const id = `${column.id}-text-filter`;
  const styles = useStyles();
  return (
    <span className={styles.root}>
      <label htmlFor={id}>Filter</label>
      <input
        id={id}
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    </span>
  );
};
export default ColumnFilterText;
