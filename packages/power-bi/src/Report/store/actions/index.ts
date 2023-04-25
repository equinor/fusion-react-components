import { ActionType, createAction } from 'typesafe-actions';

import { HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

import embedInfoActions from './embed-info';
import accessTokenActions from './access';
import contextAccessActions from './context';

export const actions = {
  ...embedInfoActions,
  ...accessTokenActions,
  ...contextAccessActions,
  reset: createAction('@PBI/CLEAR_STATE')<void>(),
};

export const refreshAccessToken = createAction('@PBI/FETCH_REPORT_TOKEN_REFRESH')<{
  reason?: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiError = ActionError<HttpClientRequestFailedError<any>>;

export type Actions = ActionType<typeof actions>;
