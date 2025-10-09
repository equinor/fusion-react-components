import { createAction, type ActionType } from 'typesafe-actions';
import type { Filter } from './types';

export type SelectionValues<TValue = unknown> = Record<string, TValue>;

export const filter = {
  // biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
  add: createAction('@FILTER/FILTERS_ADD')<Filter<any, any>>(),
  remove: createAction('@FILTER/FILTERS_REMOVE')<string>(),
};

export const selection = {
  set: createAction('@FILTER/SELECTION_SET')<SelectionValues>(),
  initial: createAction('@FILTER/SELECTION_INITIAL')<SelectionValues>(),
  clear: createAction('@FILTER/SELECTION_CLEAR')<void>(),
  remove: createAction('@FILTER/SELECTION_REMOVE')<string | string[]>(),
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
