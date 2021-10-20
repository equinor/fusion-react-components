import Button from '@equinor/fusion-react-button';
import { useTableContext } from '../../TableProvider';
//eslint-disable-next-line no-unused-expressions
import { useInstance } from 'table/src/plugins/excel/useInstance';
/**
 * Component for the `Toolbar` component.
 * Only shown if the `hideExportBtn` prop in `Toolbar` is set to `false`.
 * Uses {@link useInstance the excel plugin} to handle all exporting logic.
 */
export const ExportToExcelBtn = (): JSX.Element => {
  const { instance, state } = useTableContext();

  return (
    <Button disabled={state.export?.requesting} onClick={instance.export} variant="outlined">
      {state.export?.requesting ? 'Exporting' : 'Export'}
    </Button>
  );
};
