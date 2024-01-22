import { createAsyncAction, createAction, type ActionTypes, type ActionError } from '@equinor/fusion-observable';

export const actions = {
  checkAccess: createAsyncAction(
    '@PBI/CHECK_CONTEXT_ACCESS',
    (payload: { reportId: string; externalId: string; type: string; silent?: boolean }) => ({ payload }),
    () => ({ payload: undefined }),
    (payload: ActionError) => ({ payload }),
  ),
  cancel: createAction('@PBI/CHECK_CONTEXT_ACCESS::cancel', (payload: string | void) => ({ payload })),
  setAccess: createAction('@PBI/SET_CONTEXT_ACCESS::cancel', (payload: boolean) => ({ payload })),
};

export type Actions = ActionTypes<typeof actions>;

export default actions;
