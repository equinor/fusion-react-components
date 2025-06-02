import { createReducer } from 'typesafe-actions';
import { type Actions, actions } from './actions';
import type { FilterOption } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createOptionReducer = (initial: Record<string, FilterOption>) =>
  createReducer<Record<string, FilterOption>, Actions>(initial).handleAction(
    actions.set,
    (_, { payload }) => payload,
  );
