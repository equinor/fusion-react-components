import Button from '@equinor/fusion-react-button';
import clsx from 'clsx';
import { Layout, LayoutProps } from './types';
import { useTableContext } from '../TableProvider';
import useStyles, { StyleProps } from './layout.style';

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};
export const PaginationLayoutTemplate = (props: LayoutProps): JSX.Element => {
  const { spacing = 'small', style, className } = props;
  const { instance } = useTableContext();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = instance;

  const styles = useStyles({ ...defaultStyleProps, spacing });

  return (
    <>
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
          {page.map((row) => {
            prepareRow(row);
            return (
              //eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps({ className: styles.row })}>
                {row.cells.map((cell) => {
                  //eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps({ className: styles.cell })}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div>Items per page: </div>
        {/*TODO: use fusion dropdown component */}
        <select
          style={{ margin: '10px' }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {/*TODO: Make this array a prop, default to this? */}
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>

        <div>
          {/*TODO: pageIndex should might not be undefined? See types.ts */}
          {pageIndex !== undefined && `Page ${pageIndex + 1} of ${pageOptions.length}`}
        </div>

        <Button
          onClick={() => gotoPage(0)}
          icon="first_page"
          variant="ghost"
          disabled={!canPreviousPage}
          color={canPreviousPage ? 'primary' : 'secondary'}
        />

        <Button
          onClick={() => previousPage()}
          icon="chevron_left"
          variant="ghost"
          disabled={!canPreviousPage}
          color={canPreviousPage ? 'primary' : 'secondary'}
        />
        <Button
          onClick={() => nextPage()}
          icon="chevron_right"
          variant="ghost"
          disabled={!canNextPage}
          color={canNextPage ? 'primary' : 'secondary'}
        />
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          icon="last_page"
          variant="ghost"
          disabled={!canNextPage}
          color={canNextPage ? 'primary' : 'secondary'}
        />
      </div>
    </>
  );
};

export const PaginationLayout: Layout = {
  Template: PaginationLayoutTemplate,
};

export default PaginationLayout;
