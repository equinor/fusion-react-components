import { FC } from 'react';

import { clsx } from 'clsx';

// TODO stuff into state
import { useCurrentUser } from '@equinor/fusion';

import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  createStyles({
    root: {
      width: '100%',
      boxSizing: 'border-box',
      padding: 'calc(var(--grid-unit) * 3px)',
      color: 'var(--color-black-alt2)',
      '& h4': {
        fontWeight: 500,
      },
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
    },
    infoBox: {
      padding: 'calc(var(--grid-unit) * 1px)',
      minHeight: 'calc(var(--grid-unit) * 2px)',
    },
    labels: {
      fontWeight: 500,
    },
    text: {
      fontWeight: 'bold',
    },
  }),
  { name: 'fusion-power-bi_user_identity' }
);

type Props = { header?: string };

export const PowerBIInfoUserIdentity: FC<Props> = (props) => {
  const user = useCurrentUser();
  const styles = useStyles();
  const header = props.header || 'Your identity does not meet this reports access requirements, your identity is:';
  return (
    <div className={styles.root}>
      <h4>{header}</h4>
      <div className={styles.info}>
        <div className={clsx(styles.infoBox, styles.labels)}>
          <div>Username</div>
          <div>GUID</div>
          <div>Roles</div>
          <div>Timestamp</div>
          <div>Context</div>
        </div>
        <div className={clsx(styles.infoBox, styles.text)}>
          <div> {user?.upn} </div>
          <div> {user?.id} </div>
          <div>{user?.roles.toString()} </div>
          <div> {new Date().toString()} </div>
          <div> {window.location.href} </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIInfoUserIdentity;
