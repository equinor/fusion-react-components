import { createAction, ActionType } from 'typesafe-actions';

export const actions = {
  toggle: createAction('@FUSION_TABLE/MENU/SHOW')<{ columnId: string; show?: boolean }>(),
};

export type Actions = ActionType<typeof actions>;

export default actions;
