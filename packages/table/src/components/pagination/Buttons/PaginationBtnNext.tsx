import { Button } from '@equinor/fusion-react-button';
import { useTableContext } from '../../../TableProvider';

export const PaginationBtnNext = (): JSX.Element => {
  const { instance } = useTableContext();
  const { nextPage, canNextPage } = instance;

  return (
    <Button
      onClick={() => nextPage()}
      icon="chevron_right"
      variant="ghost"
      disabled={!canNextPage}
      color={canNextPage ? 'primary' : 'secondary'}
      dense
    />
  );
};

export default PaginationBtnNext;
