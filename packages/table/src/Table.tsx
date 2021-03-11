import { TableOptions, useTable, useSortBy, PluginHook } from 'react-table';
import styled from 'styled-components';

import { useTableHeaders } from './ColumnHeader';
import { FusionColumn, TableData } from './types';

const Table = styled.table`
  background: var(--frc-table-background);
  font-size: var(--table-font-size, 0.8rem);
`;

export interface FusionTableProps<D extends TableData> extends TableOptions<D> {
  columns: Array<FusionColumn<D>>;
  plugins?: Array<PluginHook<D>>;
  sort?: boolean;
}

export const FusionTable = <D extends TableData>(props: FusionTableProps<D>): JSX.Element => {
  const { data, sort, plugins = [] } = props;

  // TODO: check if sort is allready added?
  sort && plugins.push(useSortBy);

  const columns = useTableHeaders(props.columns, 'table');

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, ...plugins);

  return (
    <div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => column.render('Header'))}
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
      </Table>
    </div>
  );
};

export default FusionTable;
