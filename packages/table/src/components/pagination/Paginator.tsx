import { useTableContext } from '../../TableProvider';
import { PaginationBtnFirst, PaginationBtnPrev, PaginationBtnNext, PaginationBtnLast } from './Buttons';

import { StyleProps, useStyles } from './Paginator.style';
const defaultStyleProps: StyleProps = {
  spacing: 'small',
};
type PaginatorProps = JSX.IntrinsicElements['div'] & {};
export const Paginator = (props: PaginatorProps) => {
  const { instance } = useTableContext();
  const {
    pageOptions,
    setPageSize,

    state: { pageIndex, pageSize, disablePagination },
  } = instance;
  const styles = useStyles({ ...defaultStyleProps });

  if (disablePagination) return null;
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
      <PaginationBtnFirst />
      <PaginationBtnPrev />
      <PaginationBtnNext />
      <PaginationBtnLast />
    </div>
  );
};

export default Paginator;
