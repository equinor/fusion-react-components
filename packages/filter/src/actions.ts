import { createAction, ActionType } from 'typesafe-actions';
import { Filter } from './types';

export type SelectionValues<TValue = unknown> = Record<string, TValue>;

export const filter = {
  add: createAction('@FILTER/FILTERS_ADD')<Filter<any, any>>(),
  remove: createAction('@FILTER/FILTERS_REMOVE')<string>(),
};

export const selection = {
  set: createAction('@FILTER/SELECTION_SET')<SelectionValues>(),
  // clearSingle: createAction('@FILTER/SELECTION_CLEAR_SINGLE')<Filter<unknown, unknown>>(),
  // clearAll: createAction('@FILTER/SELECTION_CLEAR_ALL')<FilterSettings>(),
  // update: createAction('@FILTER/SELECTION_UPDATE')<{ key: string; values: unknown }>(),
  // // set filter values
  // override: createAction('@FILTER/SELECTION_OVERRIDE')<SelectionValues>(),
  // triggerFilter: createAction('@FILTER/TRIGGER_FILTER')<void>(),
  // unSet: createAction('@FILTER/SELECTION_UNSET')<string>(),
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
