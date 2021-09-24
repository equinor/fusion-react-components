import { clsx } from '@equinor/fusion-react-styles';

import useStyles, { StyleProps } from './layout.style';

import { Layout, LayoutProps } from './types';
import { useTableContext } from '../TableProvider';
import { useVirtual } from 'react-virtual';
import { useRef } from 'react';

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

export const VirtualizedLayoutTemplate = (props: LayoutProps): JSX.Element => {
  const { spacing = 'small', className } = props;
  //Add styles
  const { instance } = useTableContext();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance;

  const parentRef = useRef<HTMLTableElement | null>(null);

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });
  const items = rowVirtualizer.virtualItems;
  const virtualPaddingTop = items.length > 0 ? items[0].start : 0;
  const virtualPaddingBottom = items.length > 0 ? rowVirtualizer.totalSize - items[items.length - 1].end : 0;
  const styles = useStyles({ ...defaultStyleProps, spacing, virtualPaddingBottom, virtualPaddingTop });

  return (
    <div
      ref={parentRef}
      style={{
        height: `inherit`,
        overflow: 'auto',
      }}
    >
      <table {...getTableProps({ className: clsx(styles.root, className) })}>
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
        <tbody {...getTableBodyProps()} className={styles.virtualTableBody}>
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            if (!row) {
              return null;
            }
            console.log(row);
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps({ className: styles.row })} key={virtualRow.index} ref={virtualRow.measureRef}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps({ className: styles.cell })}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const VirtualizedTableLayout: Layout = {
  // plugins: [],
  Template: VirtualizedLayoutTemplate,
};

export default VirtualizedTableLayout;
