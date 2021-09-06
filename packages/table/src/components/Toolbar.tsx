import Button from '@equinor/fusion-react-button';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';

type ExcelExportProps =  {
  client: (data: {headers: string[], rows: Array<string[]>}) => Promise<boolean>
  disabled?: boolean;
};

type ToolbarProps = {
  disableExport?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end';
  children?: ReactNode | undefined;
  excel?: ExcelExportProps
};
type StyleProps = {
  container: {
    justifyContent: string;
  };
};
const useStyles = makeStyles<FusionTheme, StyleProps>(() =>
  createStyles({
    container: ({ container }) => ({
      display: 'flex',
      flexDirection: 'row',
      gap: '1em',
      ...container,
    }),
  })
);

/**
 * TODO move to own file.
 * this is only mock, might need ref for table context in callback
 */
const ExportToExcelBtn = (props: ExcelExportProps) => {
  const {header,data} = useTableContext();
  const [working, setWorking] = useState();
  const onClick = useCallback(() => {
    setWorking(true);
    try{
      await props.client();
    } catch(err){
        // handle me
    } finally {
      setWorking(false);
    }
  }, []);
  return <Button onClikc={} disabled={working}></Button>
}

/**
 * Hook for @equinor/fusion-api 
 */
const useExcelExport = (props: {filename: string, dataSetName?: string}) => {
  const {portal} = useApiClients();

  const [url, setUrl] = useState<string>('');

  // change any!
  const client = useCallback((data: {sheets: any}) => {
    try {
      // post call POST /api​/data-exports
      const {tempId} = portal.createExcelFile({filename, sheets, dataSetName});
      setUrl(`​/api​/data-exports​/${tempId}.xlsx`)
    } catch(err){
      // handle me
    } 
  }, [portal, filename]);

  useEffect(() => {
    if(!url) return;
    const a = document.createElement('a');
    a.download = true;
    a.href=url;

    document.body.appendChild(a);
    a.click();
    // TODO might monkey around some
    return () =>a.remove();
  }, [url]);

  return {client};
}

export const Toolbar = (props: ToolbarProps): JSX.Element => {
  const { 
    justify = 'flex-start', 
    excel,
    children 
  } = props;
  const styles = useStyles({ container: { justifyContent: justify } });
  const showExportBtn = execl && !execel.disabled;
  return (
    <div className={styles.container}>
      {!showExportBtn && <ExportToExcelBtn excel={excel}/>}
      {children}
    </div>
  );
};
