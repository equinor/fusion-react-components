import { Description } from '@storybook/addon-docs';

import ReactIcon from './React.svg';
import LitIcon from './Lit.svg';

import useStyle from './ChangeLog.style';

type ChangeLogs = {
  react: string;
  webComponent?: string;
};

export const ChangeLog = ({ changelogs }: { changelogs: ChangeLogs }): React.ReactElement => {
  const classes = useStyle();
  return (
    <>
      <h1 className={classes.header}>
        <ReactIcon /> ReactComponent
      </h1>
      <div className={classes.changelog}>
        <Description markdown={changelogs.react} />
      </div>
      {changelogs.webComponent && (
        <>
          <h1 className={classes.header}>
            <LitIcon /> WebComponent
          </h1>
          <div className={classes.changelog}>
            <Description markdown={changelogs.webComponent} />
          </div>
        </>
      )}
    </>
  );
};

export default ChangeLog;
