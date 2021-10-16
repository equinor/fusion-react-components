import { clsx } from '@equinor/fusion-react-styles';
import useStyles, { StyleProps } from './layout.style';
import { Layout, LayoutProps } from './types';
import { useTableContext } from '../TableProvider';
// import { useFlexLayout } from 'react-table';

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

export const TableLayoutTemplate = (props: LayoutProps): JSX.Element => {
  const { spacing = 'small', style, className, getTrProps = {} } = props;
  const { instance } = useTableContext();
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } = instance;
  const rows = instance.disablePagination ? instance.rows : instance.page;
  const styles = useStyles({ ...defaultStyleProps, spacing });
  return (
    <table {...getTableProps({ className: clsx(styles.root, className) })} style={style}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const isGroupHeader = !!column.columns?.length;
              const renderer = isGroupHeader ? 'Header' : 'ColumnHeader';
              const className = clsx(isGroupHeader && styles.groupHeader, styles.cell);

              const style = {
                width: column.canResize ? column.width : undefined,
              };
              // eslint-disable-next-line react/jsx-key
              return <th {...column.getHeaderProps({ className, style })}>{column.render(renderer)}</th>;
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps({ className: styles.row })} {...getTrProps}>
              {row.cells.map((cell) => (
                // eslint-disable-next-line react/jsx-key
                <td {...cell.getCellProps({ className: styles.cell })}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const TableLayout: Layout = {
  // plugins: [],
  Template: TableLayoutTemplate,
};

export default TableLayout;
