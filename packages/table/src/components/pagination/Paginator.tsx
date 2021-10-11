import { useTableContext } from '../../TableProvider';
import { PaginationBtnFirst, PaginationBtnPrev, PaginationBtnNext, PaginationBtnLast } from './Buttons';
import { StyleProps, useStyles } from './Paginator.style';

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};
type PaginatorProps = JSX.IntrinsicElements['div'];
/**
 * Component for showing and controlling the pagination of the table component.
 * Returns null if `disablePagination` is set to `true`.
 * Set the boolean in the `options` prop to the `Table` component to enable pagination.
 * The `pageSize` is by default 10 (showing 10 records on each page), but can be changed.
 * Same goes for `pageSizes`
 * @param JSX.InstrinsicElements - HTML Attributes, e.g. styling.
 * @example
 * ```jsx
 * const options = {
 * data: data,
 * columns: columns,
 * disablePagination: false,
 * pageSizes: [20,30,40],
 * initialState: {
 * pageSize: 20
 *  },
 * }
 * return <Table options={options}/>
 * ```
 */
export const Paginator = (props: PaginatorProps): JSX.Element | null => {
  const { instance, state } = useTableContext();
  const { pageOptions, setPageSize, disablePagination = true, pageSizes = [10, 20, 30, 40, 50] } = instance;
  const { pageIndex, pageSize } = state;
  const styles = useStyles({ ...defaultStyleProps });

  if (disablePagination) {
    return null;
  }
  return (
    <div {...props} className={styles.pagination}>
      <div>Items per page: </div>
      {/*TODO: use fusion dropdown component */}
      <select
        style={{ margin: '10px' }}
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSizes.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>

      <div>
        {/*TODO: pageIndex should might not be undefined? See types.ts */}
        {pageIndex !== undefined && `Page ${pageIndex + 1} of ${pageOptions.length}`}
      </div>
      <PaginationBtnFirst />
      <PaginationBtnPrev />
      <PaginationBtnNext />
      <PaginationBtnLast />
    </div>
  );
};

export default Paginator;
