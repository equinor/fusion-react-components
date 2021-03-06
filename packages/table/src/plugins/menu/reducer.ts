import { ReducerTableState, ActionType, TableState, actions as tableActions } from 'react-table';
import { createReducer } from 'typesafe-actions';

import { actions } from './actions';

import { TableData } from './types';

export const reducer = <D extends TableData>(
  initial: TableState<D>
): ((state: TableState<D>, action: ActionType) => TableState<D> | undefined) =>
  createReducer<ReducerTableState<D>, ActionType>(initial)
    .handleAction(actions.toggle, (state, { payload }) => {
      const { menu } = state;
      const { columnId } = payload;

      // console.log(state, payload);

      if (columnId === menu.columnId) {
        const show = payload.show === undefined ? !menu.show : payload.show;
        return { ...state, menu: { columnId, show } };
      } else if (payload.show !== false) {
        console.log('ok');
        return { ...state, menu: { columnId, show: true } };
      }

      return state;
    })
    // @ts-ignore
    .handleAction(tableActions.init, (state) => {
      return { ...state, menu: {} };
    });

export default reducer;
