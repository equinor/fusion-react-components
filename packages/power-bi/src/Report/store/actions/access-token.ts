import { createAsyncAction, createAction, type ActionTypes, type ActionError } from '@equinor/fusion-observable';

import type { AccessToken } from '../types';

export const actions = {
  fetch: createAsyncAction(
    '@PBI/FETCH_REPORT_TOKEN',
    (payload: { reportId: string; silent?: boolean }) => ({
      payload,
    }),
    (payload: AccessToken) => ({ payload }),
    (payload: ActionError) => ({ payload }),
  ),
  cancel: createAction('@PBI/FETCH_REPORT_TOKEN::cancel', (payload: string | void) => ({ payload })),
  refresh: createAction('@PBI/REFRESH_REPORT_TOKEN', (payload: { reason: string }) => ({ payload })),
};

export type Actions = ActionTypes<typeof actions>;

export default actions;
