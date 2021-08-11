import { FC } from 'react';
import useStyles from './useStyles';

const HorizontalBar: FC = (props): JSX.Element => {
  const styles = useStyles();

  return <div className={styles.HorizontalBaR}>{props?.children}</div>;
};

export default HorizontalBar;
