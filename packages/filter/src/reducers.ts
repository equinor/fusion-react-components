/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { createReducer, ActionType } from 'typesafe-actions';

import { actions } from './actions';
import { Filter } from './types';

export const createFilterReducer = <T extends Record<string, Filter>>(initial: T) =>
  createReducer<T, ActionType<typeof actions.filter>>(initial)
    .handleAction(actions.filter.add, (state, { payload }) => ({ ...state, [payload.key]: payload }))
    .handleAction(actions.filter.remove, (state, action) => {
      delete state[action.payload as keyof T];
      return { ...state };
    });

export const createSelectionReducer = <TSelections extends Record<string, unknown>>(initial: TSelections) =>
  createReducer<TSelections, ActionType<typeof actions.selection>>(initial)
    .handleAction(actions.selection.set, (state, action) => ({
      ...state,
      ...(action.payload as TSelections),
    }))
    .handleAction(actions.selection.initial, (state, action) => {
      return {
        ...state,
        ...(action.payload as TSelections),
      };
    })
    .handleAction(actions.selection.clear, () => initial);

export const createDataReducer = <TData>(initial: TData) =>
  createReducer<TData, ActionType<typeof actions.source>>(initial).handleAction(
    actions.source.update,
    (_, action) => action.payload as TData
  );
