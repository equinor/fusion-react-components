import { useMemo } from 'react';
import { TableOptions } from 'react-table';
import { FusionColumn, TableData } from '../types';

import { ColumnMenuItemSort } from './menu/items';

import MenuIcon from './menu/ColumnMenuButton';

export const createDefaultColumn = <D extends TableData>(_props?: TableOptions<D>): Partial<FusionColumn<D>> => ({
  get menuItems() {
    // TODO: check which menu items to apply
    return [ColumnMenuItemSort];
  },
  MenuIcon,
  get showMenu() {
    return !this.columns;
  },
});

export const useDefaultColumn = <D extends TableData>(props: TableOptions<D>): Partial<FusionColumn<D>> => {
  const column = useMemo(() => createDefaultColumn(props), [props]);
  return column as Partial<FusionColumn<D>>;
};

export default useDefaultColumn;
