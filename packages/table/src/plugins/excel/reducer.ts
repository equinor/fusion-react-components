import { ReducerTableState, ActionType, TableState, actions as tableActions } from 'react-table';
import { TableData } from '../..//types';
import { createReducer } from 'typesafe-actions';
import { actions } from './actions';

export const reducer = <D extends TableData>(
  initial: TableState<D>,
): ((state: TableState<D>, action: ActionType) => TableState<D> | undefined) =>
  createReducer<ReducerTableState<D>, ActionType>(initial)
    .handleAction(actions.export.request, (state) => {
      return { ...state, export: { requesting: true } };
    })
    .handleAction(actions.export.success, (state) => {
      return { ...state, export: { requesting: false } };
    })
    .handleAction(actions.export.failure, (state, { payload }) => {
      return { ...state, export: { requesting: false, error: payload } };
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .handleAction(tableActions.init, (state) => {
      return { ...state, export: {} };
    });

export default reducer;
