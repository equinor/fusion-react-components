import type { ActionError, Flow } from '@equinor/fusion-observable';

import type { Actions } from './actions';

import type { EmbedInfo } from '../../types';

export enum Status {
  LoadingEmbedInfo,
  AcquiringAccessToken,
  AccessCheck,
}

export type State = {
  id: string;
  // TODO change to Set
  status: Array<Status>;
  errors: Array<ActionError>;
  embedInfo?: EmbedInfo['embedConfig'];
  token?: AccessToken;
  hasContextAccess?: boolean;
};

export type AccessToken = {
  expirationUtc: Date;
  token: string;
};

export type StoreFlow = Flow<Actions, State>;
