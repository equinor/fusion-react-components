import { FunctionComponent } from 'react';

import { useSelector } from '@equinor/fusion/lib/epic';

import { StarProgress, Typography } from '@equinor/eds-core-react';

import { Status } from './store/state';
import Store from './store/store';

const statusText = (status: Status) => {
  switch (status) {
    case Status.LoadingReport:
      return 'Loading report info';
    case Status.LoadingDescription:
      return 'Loading descrption';
    case Status.LoadingAccessDescription:
      return 'Loading access description';
    case Status.LoadingRequirements:
      return 'Loading report requirements';
  }
};

export const PowerBIInfoStatus: FunctionComponent<{ readonly store: Store }> = ({ store }) => {
  const status = useSelector(store, 'status');
  const title = status?.map(statusText).shift();
  // TODO
  return status?.length ? (
    <>
      <Typography variant="h1">{title}</Typography>
      <StarProgress />
    </>
  ) : null;
};

export default PowerBIInfoStatus;
