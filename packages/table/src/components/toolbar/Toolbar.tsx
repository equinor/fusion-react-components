import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';
import { ExportToExcelBtn } from './ExportToExcelBtn';

type ToolbarProps = {
  justify?: 'flex-start' | 'center' | 'flex-end';
  children?: ReactNode | undefined;
  hideExportBtn?: boolean;
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
  const { justify = 'flex-start', hideExportBtn = true, children } = props;
  const styles = useStyles();
  return (
    <div className={styles.container} style={{ justifyContent: justify }}>
      {!hideExportBtn && <ExportToExcelBtn />}
      {children}
    </div>
  );
};
