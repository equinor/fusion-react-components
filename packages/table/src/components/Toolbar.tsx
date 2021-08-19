import Button from '@equinor/fusion-react-button';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';

type ToolbarProps = {
  disableExport?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end';
  children?: ReactNode | undefined;
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
export const Toolbar = ({ disableExport = false, justify = 'flex-start', children }: ToolbarProps): JSX.Element => {
  const styles = useStyles({ container: { justifyContent: justify } });
  return (
    <div className={styles.container}>
      {!disableExport && <Button>Export to Excel</Button>}

      {children}
    </div>
  );
};
