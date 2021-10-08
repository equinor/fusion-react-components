import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../../TableProvider';

export const PaginationBtnPrev = (): JSX.Element => {
  const { instance } = useTableContext();
  const { previousPage, canPreviousPage } = instance;

  return (
    <Button
      onClick={() => previousPage()}
      icon="chevron_left"
      variant="ghost"
      disabled={!canPreviousPage}
      color={canPreviousPage ? 'primary' : 'secondary'}
      dense
    />
  );
};
