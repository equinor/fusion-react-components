import { FC, useEffect, useMemo } from 'react';

import { useApiClients } from '@equinor/fusion';
import { useSelector } from '@equinor/fusion/lib/epic';

// TODO add from new components
// import { MarkdownViewer, PersonCard } from '@equinor/fusion-components';

import Store, { createStore } from './store/store';

import { PowerBIInfoStatus } from './PowerBIReportInfoStatus';
import { PowerBIInfoUserIdentity } from './PowerBIUserIdentity';
import { PowerBIInfoRequirements } from './PowerBIRequirements';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    rootContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: '0 0 100%',
      minWidth: 'calc(var(--grid-unit) * 65px)',
      maxWidth: 'calc(var(--grid-unit) * 100px)',
    },
    header: {
      color: 'var(--color-orange)',
      marginBottom: 'calc(var(--grid-unit) * 5px)',
    },
    restrictedAccessContainer: {
      boxSizing: 'border-box',
      padding: 'calc(var(--grid-unit) * 3px)',
      width: '100%',
      borderRadius: 4,
      backgroundColor: 'var(--color-white)',
      boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 3px 3px rgba(0, 0, 0, 0.14)',
    },
    reportInfoContainer: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      gridGap: 'calc(var(--grid-unit) * 6px)',
      '& h5': {
        marginBottom: 'calc(var(--grid-unit) * 2px)',
      },
    },
  }),
  { name: 'fusion-power-bi_user_identity' }
);

type Props = {
  id: string;
  header?: string;
  subHeader?: string;
};

export const PowerBIReportInfo: FC<Props> = ({
  id,
  header = 'Restricted Access',
  subHeader = 'It looks like you do not have access to this report',
}: Props) => {
  const clients = useApiClients();
  const store = useMemo<Store>(() => {
    return createStore(id, { clients });
  }, [id, clients]);
  const initialized = useSelector(store, 'initialized');

  const styles = useStyles();

  useEffect(() => {
    return store.initialize();
  }, [store]);

  if (!initialized) {
    return <PowerBIInfoStatus store={store} />;
  }

  const { report, description, accessDescription } = store.value;
  const personId = report?.ownedBy?.azureUniqueId;

  return (
    <div className={styles.root}>
      <div className={styles.rootContainer}>
        <h2 className={styles.header}>{header}</h2>
        <div className={styles.restrictedAccessContainer}>
          <h2>{subHeader}</h2>
          {accessDescription && (
            <div>
              <span style={{ color: 'red' }}> missing element MarkdownViewer</span>
              {accessDescription}
              {/* <MarkdownViewer markdown={description} /> */}
            </div>
          )}
          <div className={styles.reportInfoContainer}>
            {description && (
              <div>
                <h5>Report description</h5>
                <span style={{ color: 'red' }}> missing element MarkdownViewer</span>
                {description}
                {/* <MarkdownViewer markdown={description} /> */}
              </div>
            )}
            {personId && (
              <div>
                <h5>Report owner</h5>
                <span style={{ color: 'red' }}> missing element PersonCard</span>
                {/* <PersonCard personId={personId}></PersonCard> */}
              </div>
            )}
          </div>
        </div>
        <PowerBIInfoUserIdentity />
        <PowerBIInfoRequirements store={store} />
      </div>
    </div>
  );
};

export default PowerBIReportInfo;
