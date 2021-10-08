import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../../TableProvider';

export const PaginationBtnFirst = (): JSX.Element => {
  const { instance } = useTableContext();
  const { gotoPage, canPreviousPage } = instance;

  return (
    <Button
      onClick={() => gotoPage(0)}
      icon="first_page"
      variant="ghost"
      disabled={!canPreviousPage}
      color={canPreviousPage ? 'primary' : 'secondary'}
    />
  );
};
export default PaginationBtnFirst;
