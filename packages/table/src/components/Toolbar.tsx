import Button from '@equinor/fusion-react-button';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';

type ToolbarProps = {
  disableExport?: boolean;
  children?: ReactNode | undefined;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
);
export const Toolbar = ({ disableExport = false, children }: ToolbarProps): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      {!disableExport && <Button>Export to Excel</Button>}

      {children}
    </div>
  );
};
