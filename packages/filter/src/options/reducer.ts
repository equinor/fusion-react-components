import { createReducer } from 'typesafe-actions';
import { Actions, actions } from './actions';
import type { FilterOption } from './types';

export const createOptionReducer = (initial: Record<string, FilterOption>) =>
  createReducer<Record<string, FilterOption>, Actions>(initial).handleAction(actions.set, (_, { payload }) => payload);
