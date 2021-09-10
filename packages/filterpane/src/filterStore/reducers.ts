import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import FilterStoreState from '../types/FilterStoreState';
import actions, { Actions } from './actions';

const selectionReducer = <TSelections extends Record<string, unknown>>(initial: TSelections) =>
  createReducer<TSelections, Actions>(initial)
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
            [key]: action.payload[key].noFilterReset
              ? state[key]
              : action.payload[key].resetFilterFn?.(state[key]) || '',
          };
        }, {}) as TSelections
    )

    .handleAction(actions.selection.clearSingle, (state, { payload: { key, noFilterReset, resetFilterFn } }) => {
      return {
        ...state,
        [key]: noFilterReset ? state[key] : resetFilterFn?.(state[key]) || '',
      };
    })
    .handleAction(actions.selection.set, (state, action) => ({
      ...state,
      ...(action.payload as TSelections),
    }))
    .handleAction(actions.selection.override, (_, action) => ({
      ...(action.payload as TSelections),
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

const reducers = <TSelections extends Record<string, unknown> = Record<string, unknown>, TData = unknown>(
  initialState: FilterStoreState<TSelections, TData>
): any =>
  combineReducers({
    selection: selectionReducer(initialState.selection),
    data: dataReducer(initialState.data),
  });

export default reducers;
