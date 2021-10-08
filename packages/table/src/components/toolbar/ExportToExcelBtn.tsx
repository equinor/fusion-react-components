import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../TableProvider';

export const ExportToExcelBtn = () => {
  const { instance, state } = useTableContext();

  //TODO: handle failure exporting
  return (
    <Button disabled={state.export?.requesting} onClick={instance.export}>
      {state.export?.requesting ? 'Exporting' : 'Export'}
    </Button>
  );
};
