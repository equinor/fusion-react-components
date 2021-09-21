import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';
import { ExportToExcelBtn } from './ExportToExcelBtn';
import { ExcelExportProps } from './types';

type ToolbarProps = {
  justify?: 'flex-start' | 'center' | 'flex-end';
  children?: ReactNode | undefined;
  excel?: ExcelExportProps;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1em',
    },
  })
);

export const Toolbar = (props: ToolbarProps): JSX.Element => {
  const { justify = 'flex-start', excel, children } = props;
  const styles = useStyles();
  const showExportBtn = excel && !excel.disabled;
  return (
    <div className={styles.container} style={{ justifyContent: justify }}>
      {showExportBtn && <ExportToExcelBtn excel={{ client: excel.client, disabled: excel.disabled }} />}
      {children}
    </div>
  );
};
