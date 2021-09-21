import Button from '@equinor/fusion-react-button';
import { useCallback, useState } from 'react';
import { useTableContext } from '../..';
import { ExcelExportProps } from './types';
import { getRowsAndColumns } from './utils';
type ExportToExcelBtnProps = {
  excel: ExcelExportProps;
};
export const ExportToExcelBtn = (props: ExportToExcelBtnProps) => {
  const [isWorking, setWorking] = useState(false);
  const [error, setError] = useState<Error>();
  const { instance } = useTableContext();

  const {
    excel: { client, disabled },
  } = props;

  const handleClick = useCallback(async () => {
    setWorking(true);
    try {
      await client({ sheets: getRowsAndColumns(instance) });
    } catch (e) {
      setError(e as Error);
    } finally {
      setWorking(false);
    }
  }, [client]);

  return isWorking ? <p>'Working'</p> : <Button onClick={handleClick} hidden={disabled}></Button>;
};
