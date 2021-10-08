import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';
import { ExportToExcelBtn } from './ExportToExcelBtn';

type ToolbarProps = JSX.IntrinsicElements['div'] & {
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
  const { hideExportBtn = true, children, ...rest } = props;
  const styles = useStyles();
  return (
    <div className={styles.container} {...rest}>
      {!hideExportBtn && <ExportToExcelBtn />}
      {children}
    </div>
  );
};
