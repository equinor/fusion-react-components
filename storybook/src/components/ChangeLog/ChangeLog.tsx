import { Markdown } from '@storybook/addon-docs/blocks';

import ReactIcon from './React.svg';
import LitIcon from './Lit.svg';

import useStyle from './ChangeLog.style';

type ChangeLogs = {
  react: string;
  webComponent?: string;
};

export const ChangeLog = ({ changelogs }: { readonly changelogs: ChangeLogs }): React.ReactElement => {
  const classes = useStyle();
  return (
    <>
      <h1 className={classes.header}>
        <ReactIcon /> ReactComponent
      </h1>
      <div className={classes.changelog}>
        <Markdown>{changelogs.react}</Markdown>
      </div>
      {changelogs.webComponent && (
        <>
          <h1 className={classes.header}>
            <LitIcon /> WebComponent
          </h1>
          <div className={classes.changelog}>
            <Markdown>{changelogs.webComponent}</Markdown>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeLog;
