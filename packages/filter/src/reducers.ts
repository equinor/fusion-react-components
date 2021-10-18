/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { createReducer, ActionType } from 'typesafe-actions';

import { actions } from './actions';
import { Filter } from './types';

export const createFilterReducer = <T extends Record<string, Filter<unknown, unknown>>>(initial: T) =>
  createReducer<T, ActionType<typeof actions.filter>>(initial)
    .handleAction(actions.filter.add, (state, { payload }) => Object.assign(state, { [payload.key]: payload }))
    .handleAction(actions.filter.remove, (state, action) => {
      delete state[action.payload as keyof T];
      return state;
    });

export const createSelectionReducer = <TSelections extends Record<string, unknown>>(initial: TSelections) =>
  createReducer<TSelections, ActionType<typeof actions.selection>>(initial).handleAction(
    actions.selection.set,
    (state, action) => ({
      ...state,
      ...(action.payload as TSelections),
    })
  );
// .handleAction(actions.selection.update, (state, action) => ({
//   ...state,
//   [action.payload.key]: action.payload.values,
// }))

// .handleAction(actions.selection.clearAll, (state, action) => {
//   const { payload } = action;
//   return Object.entries(state).reduce((s, [key, value]) => {
//     const filter = payload[key];
//     return {
//       ...s,
//       [key]: filter.noFilterReset ? value : filter.resetFilterFn?.(value) || '',
//     };
//   }, {}) as TSelections;
// })

// .handleAction(actions.selection.clearSingle, (state, action) => {
//   const { key, noFilterReset, resetFilterFn } = action.payload;
//   return {
//     ...state,
//     [key]: noFilterReset ? state[key] : resetFilterFn?.(state[key]) || '',
//   };
// })

// .handleAction(actions.selection.override, (_, action) => ({
//   ...(action.payload as TSelections),
// }))
// .handleAction(actions.selection.triggerFilter, (state) => ({
//   ...state,
// }))
// .handleAction(actions.selection.unSet, (state, action) => {
//   delete state[action.payload as keyof typeof state];
//   return { ...state };
// });

export const createDataReducer = <TData>(initial: TData) =>
  createReducer<TData, ActionType<typeof actions.source>>(initial).handleAction(
    actions.source.update,
    (_, action) => action.payload as TData
  );
