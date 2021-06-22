import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import FilterStoreState from '../models/FilterStoreState';
import actions, { Actions } from './actions';

const selectionReducer = <TSelection extends Record<string, unknown>>(initial: TSelection) =>
  createReducer<TSelection, Actions>(initial)
    .handleAction(actions.selection.update, (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.values,
    }))

    .handleAction(
      actions.selection.clearAll,
      (state, action) =>
        Object.keys(state).reduce((s, key) => {
          return {
            ...s,
            [key]: action.payload[key].noFilterReset ? state[key] : action.payload[key].resetFilterFn?.() || '',
          };
        }, {}) as TSelection
    )

    .handleAction(actions.selection.clear, (state, action) => {
      return { ...state, [action.payload]: [] };
    })
    .handleAction(actions.selection.set, (state, action) => ({
      ...state,
      ...(action.payload as TSelection),
    }))
    .handleAction(actions.selection.override, (state, action) => ({
      ...(action.payload as TSelection),
    }))
    .handleAction(actions.selection.triggerFilter, (state) => ({
      ...state,
    }))
    .handleAction(actions.selection.unSet, (state, action) => {
      delete state[action.payload as keyof typeof state];
      return { ...state };
    });

const dataReducer = <TData>(initial: TData) =>
  createReducer<TData, Actions>(initial).handleAction(actions.data.set, (state, action) => action.payload as TData);

const reducers = <TSelection extends Record<string, unknown> = Record<string, unknown>, TData = unknown>(
  initialState: FilterStoreState<TSelection, TData>
): any =>
  combineReducers({
    selection: selectionReducer(initialState.selection),
    data: dataReducer(initialState.data),
  });

export default reducers;
