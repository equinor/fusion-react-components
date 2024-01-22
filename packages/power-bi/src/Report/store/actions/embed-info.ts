import { type ActionTypes, createAction, createAsyncAction, type ActionError } from '@equinor/fusion-observable';

import type { EmbedInfo } from '../../../types';

export const actions = {
  fetch: createAsyncAction(
    '@PBI/FETCH_REPORT_EMBED_INFO',
    (payload: string) => ({ payload }),
    (payload: EmbedInfo) => ({ payload }),
    (payload: ActionError) => ({ payload }),
  ),
  cancel: createAction('@PBI/FETCH_REPORT_EMBED_INFO::cancel', (payload: string | void) => ({ payload })),
};

export type Actions = ActionTypes<typeof actions>;

export default actions;
