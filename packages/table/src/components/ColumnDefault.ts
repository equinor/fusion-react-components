import { FunctionComponent, useMemo } from 'react';
import { TableOptions, HeaderProps } from 'react-table';
import { Column, SpacingType, TableData } from '../types';

import { ColumnFilterText } from './filters';
import { ColumnMenuItemSort, ColumnMenuItemFilter } from './menu/items';

import MenuIcon from './menu/ColumnMenuButton';
import Menu from './menu/ColumnMenu';

import ColumnHeader from './ColumnHeader';

export const createDefaultColumn = <D extends TableData>(props?: TableOptions<D>): Partial<Column<D>> => ({
  minWidth: 60,
  ColumnHeader,
  get spacing() {
    return (props?.spacing || 'small') as SpacingType;
  },

  // Filter
  Filter: ColumnFilterText,

  // Menu
  get menuItems(): FunctionComponent<HeaderProps<D>>[] {
    const items: FunctionComponent<HeaderProps<D>>[] = [];
    if (!props?.disableMenu) {
      // TODO: check which menu items to apply
      !props?.disableSortBy && items.push(ColumnMenuItemSort);
      !props?.disableFilters && items.push(ColumnMenuItemFilter);
    }
    return items;
  },
  Menu,
  MenuIcon,
  get showMenu() {
    return !this.columns;
  },
  ...(props?.defaultColumn || {}),
});

export const useDefaultColumn = <D extends TableData>(props: TableOptions<D>): Partial<Column<D>> => {
  const column = useMemo(() => createDefaultColumn(props), []);
  return column as Partial<Column<D>>;
};

export default useDefaultColumn;
