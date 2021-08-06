import { ActionType, createAction } from 'typesafe-actions';
import { FilterSettingsStore } from './store';

export type SelectionValues<TValue = unknown> = Record<string, TValue>;

const actions = {
  selection: {
    clear: createAction('@FILTER/SELECTION_CLEAR')<string>(),
    clearAll: createAction('@FILTER/SELECTION_CLEAR_ALL')<FilterSettingsStore<any>>(),
    update: createAction('@FILTER/SELECTION_UPDATE')<{ key: string; values: unknown }>(),
    // set filter values
    set: createAction('@FILTER/SELECTION_SET')<SelectionValues>(),
    override: createAction('@FILTER/SELECTION_OVERRIDE')<SelectionValues>(),
    triggerFilter: createAction('@FILTER/TRIGGER_FILTER')<void>(),
    unSet: createAction('@FILTER/SELECTION_UNSET')<string>(),
  },
  data: {
    set: createAction('@FILTER/DATA_SET')<unknown>(),
  },
};
export default actions;

export type Actions = ActionType<typeof actions>;
