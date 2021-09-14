import Button from '@equinor/fusion-react-button';
import { useCallback, useState } from 'react';
import { useTableContext } from '..';

type ExcelExportProps = {
  client?: (data: { headers: string[]; rows: Array<unknown[]> }) => Promise<boolean>;
  disabled?: boolean;
};
export const ExportToExcelBtn = (props: ExcelExportProps) => {
  const [isWorking, setWorking] = useState(false);
  const [error, setError] = useState<Error>();
  const { instance } = useTableContext();

  const headers = instance.headers.map((entry) => {
    return entry.id;
  });
  const rows = instance.rows.map((entry) => {
    return Object.values(entry.values);
  });
  const { client, disabled } = props;

  const handleClick = useCallback(async () => {
    if (client) {
      setWorking(true);
      try {
        await client({ headers: headers, rows: rows });
      } catch (e) {
        setError(e as Error);
      } finally {
        setWorking(false);
      }
    }
  }, [client]);
  return isWorking ? <p>'Working'</p> : <Button onClick={handleClick} hidden={disabled}></Button>;
};
