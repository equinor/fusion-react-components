import { useCallback } from 'react';
import { TableInstance } from 'react-table';

import actions from './actions';

import { TableData } from './types';

export const useInstance = <TData extends TableData>(instance: TableInstance<TData>): void => {
  const { allColumns, state, dispatch } = instance;
  const toggleMenu = useCallback(
    (columnId: string, show?: boolean) => {
      dispatch(actions.toggle({ columnId, show }));
    },
    [dispatch]
  );
  allColumns.forEach((column) => {
    const { menu } = state;
    Object.assign(column, {
      toggleMenu,
      openMenu: () => toggleMenu(column.id, true),
      closeMenu: () => toggleMenu(column.id, false),
      showMenu: menu?.columnId === column.id && menu.show,
    });
  });
};

export default useInstance;
