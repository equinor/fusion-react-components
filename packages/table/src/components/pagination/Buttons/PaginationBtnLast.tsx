import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../../TableProvider';

export const PaginationBtnLast = () => {
  const { instance } = useTableContext();
  const { gotoPage, pageCount, canNextPage } = instance;

  return (
    <Button
      onClick={() => gotoPage(pageCount - 1)}
      icon="last_page"
      variant="ghost"
      disabled={!canNextPage}
      color={canNextPage ? 'primary' : 'secondary'}
    />
  );
};
export default PaginationBtnLast;
