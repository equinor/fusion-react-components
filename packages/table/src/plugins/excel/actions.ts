import { createAsyncAction, ActionType } from 'typesafe-actions';

export const actions = {
  export: createAsyncAction(
    '@FUSION_TABLE/EXCEL/EXPORT_REQUEST',
    '@FUSION_TABLE/EXCEL/EXPORT_SUCCESS',
    '@FUSION_TABLE/EXCEL/EXPORT_FAILURE'
  )<undefined, undefined, Error>(),
};

export type Actions = ActionType<typeof actions>;

export default actions;
