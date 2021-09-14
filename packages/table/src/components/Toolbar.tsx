import Button from '@equinor/fusion-react-button';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';
import { ExportToExcelBtn } from './ExportToExcelBtn';

type ExcelExportProps = {
  client: (data: { headers: string[]; rows: Array<unknown[]> }) => Promise<boolean>;
  disabled?: boolean;
};

type ToolbarProps = {
  disableExport?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end';
  children?: ReactNode | undefined;
  excel?: ExcelExportProps;
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

export const Toolbar = (props: ToolbarProps): JSX.Element => {
  const { justify = 'flex-start', excel, children } = props;
  const styles = useStyles({ container: { justifyContent: justify } });
  const showExportBtn = excel && !excel.disabled;
  return (
    <div className={styles.container}>
      {!showExportBtn && <ExportToExcelBtn client={excel && excel.client} disabled={!excel?.disabled} />}
      {children}
    </div>
  );
};
