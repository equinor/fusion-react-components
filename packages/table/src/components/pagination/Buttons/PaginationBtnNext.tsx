import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../../TableProvider';

export const PaginationBtnNext = () => {
  const { instance } = useTableContext();
  const { nextPage, canNextPage } = instance;

  return (
    <Button
      onClick={() => nextPage()}
      icon="chevron_right"
      variant="ghost"
      disabled={!canNextPage}
      color={canNextPage ? 'primary' : 'secondary'}
    />
  );
};

export default PaginationBtnNext;
