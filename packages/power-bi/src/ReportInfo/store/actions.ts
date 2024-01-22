import { type ActionTypes, createAction, createAsyncAction, ActionError } from '@equinor/fusion-observable';
import type { Report } from '../../types';

export type Actions = ActionTypes<typeof actions>;

export const actions = {
  report: {
    fetch: createAsyncAction(
      'PBI/FETCH_REPORT',
      () => ({ payload: undefined }),
      (report: Report) => ({ payload: report }),
      (err: ActionError) => ({ payload: err }),
    ),
    cancel: createAction('PBI/FETCH_REPORT::cancel', (reason: string) => ({ payload: reason })),
  },
  description: {
    fetch: createAsyncAction(
      'PBI/FETCH_REPORT_DESCRIPTION',
      () => ({ payload: undefined }),
      (description: string) => ({ payload: description }),
      (err: ActionError) => ({ payload: err }),
    ),
    cancel: createAction('PBI/FETCH_REPORT_DESCRIPTION::cancel', (reason: string) => ({ payload: reason })),
  },
  accessDescription: {
    fetch: createAsyncAction(
      'PBI/FETCH_REPORT_ACCESS_DESCRIPTION',
      () => ({ payload: undefined }),
      (description: string) => ({ payload: description }),
      (err) => ({ payload: err }),
    ),
    cancel: createAction('PBI/FETCH_REPORT_ACCESS_DESCRIPTION::cancel', (reason: string) => ({ payload: reason })),
  },
  requirements: {
    fetch: createAsyncAction(
      'FETCH_REPORT_REQUIREMENTS',
      () => ({ payload: undefined }),
      (description: string) => ({ payload: description }),
      (err: ActionError) => ({ payload: err }),
    ),
    cancel: createAction('FETCH_REPORT_REQUIREMENTS', (reason: string) => ({ payload: reason })),
  },
};

export default actions;
