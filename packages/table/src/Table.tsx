import { TableOptions, useTable, useSortBy, PluginHook } from 'react-table';

import { makeStyles, createStyles, clsx } from '@equinor/fusion-react-styles';

import { useTableHeaders } from './ColumnHeader';
import { FusionColumn, TableData } from './types';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        ...theme.typography.table.cell_text.style,
      },
    }),
  { name: 'fusion-table' }
);

export interface FusionTableProps<D extends TableData> extends TableOptions<D> {
  columns: Array<FusionColumn<D>>;
  plugins?: Array<PluginHook<D>>;
  sort?: boolean;
}

export const FusionTable = <D extends TableData>(props: FusionTableProps<D>): JSX.Element => {
  const { data, sort, plugins = [] } = props;

  const styles = useStyles();

  // TODO: check if sort is allready added?
  sort && plugins.push(useSortBy);

  const columns = useTableHeaders(props.columns, 'table');

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, ...plugins);

  const omg = clsx(styles.root);

  return (
    <div>
      <table {...getTableProps()} className={omg}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FusionTable;
