import { createAction, ActionType } from 'typesafe-actions';
import type { FilterOption } from './types';

export const actions = {
  set: createAction('@FILTER_OPTIONS/SELECTION_SET')<Record<string, FilterOption>>(),
};

export type Actions = ActionType<typeof actions>;

export default actions;
