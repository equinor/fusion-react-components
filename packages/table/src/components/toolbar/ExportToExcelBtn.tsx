import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../..';

export const ExportToExcelBtn = () => {
  const { instance, state } = useTableContext();

  //TODO: handle failure exporting
  return (
    <Button aria-disabled={state.export?.requesting} onClick={instance.export}>
      {state.export?.requesting ? 'Exporting' : 'Export'}
    </Button>
  );
};
