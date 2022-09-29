import Icon from '@equinor/fusion-react-icon';
import { clsx, createStyles, makeStyles, theme } from '@equinor/fusion-react-styles';
import { ICellRendererParams } from 'ag-grid-community';
import { FC } from 'react';
import { AGGridDataStatus } from './constants';

const useStyles = makeStyles(
  createStyles({
    statusContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    checkIcon: {
      color: theme.colors.interactive.success__text.getVariable('color'),
    },
    closeIcon: {
      color: theme.colors.infographic.primary__energy_red_100.getVariable('color'),
    },
    pendingChanges: {
      width: '.5rem',
      height: '.5rem',
      background: theme.colors.interactive.warning__text.getVariable('color'),
      borderRadius: '50%',
    },
  })
);

const StatusComponent: FC<ICellRendererParams> = (props) => {
  const styles = useStyles();

  return props.data.hasChanged || props.data.status === AGGridDataStatus.NEW ? (
    <div className={styles.statusContainer}>
      <div className={styles.pendingChanges} />
    </div>
  ) : (
    <div className={clsx(styles.checkIcon, styles.statusContainer)}>
      <Icon icon="check" />
    </div>
  );
};
export default StatusComponent;
