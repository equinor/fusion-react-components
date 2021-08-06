import { PropsWithChildren } from 'react';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
type FilterPanelProps = Record<string, unknown>;

const useStyles = makeStyles(() =>
  createStyles({
    FilterPanelContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
    },
  })
);

const HorizontalFilterPanel = ({ children }: PropsWithChildren<FilterPanelProps>): JSX.Element => {
  const styles = useStyles();
  return <div className={styles.FilterPanelContainer}>{children}</div>;
};

export default HorizontalFilterPanel;
