import { createAction, ActionType } from 'typesafe-actions';
import { Filter } from './types';

export type SelectionValues<TValue = unknown> = Record<string, TValue>;

export const filter = {
  add: createAction('@FILTER/FILTERS_ADD')<Filter<any, any>>(),
  remove: createAction('@FILTER/FILTERS_REMOVE')<string>(),
};

export const selection = {
  set: createAction('@FILTER/SELECTION_SET')<SelectionValues>(),
  initial: createAction('@FILTER/SELECTION_INITIAL')<SelectionValues>(),
  clear: createAction('@FILTER/SELECTION_CLEAR')<void>(),
};

export const source = {
  update: createAction('@FILTER/SOURCE_UPDATE')<unknown>(),
};

export const actions = {
  filter,
  selection,
  source,
};

export type Actions = ActionType<typeof actions>;

export default actions;
