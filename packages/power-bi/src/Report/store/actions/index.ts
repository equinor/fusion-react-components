import { createAction, ActionTypes } from '@equinor/fusion-observable';

import embedInfo from './embed-info';
import accessToken from './access-token';
import contextAccess from './context-access';

export const actions = {
  embedInfo,
  accessToken,
  contextAccess,
  reset: createAction('@PBI/CLEAR_STATE', () => ({ payload: undefined })),
};

export type Actions = ActionTypes<typeof actions>;
