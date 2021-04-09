import React from 'react';
import { HeaderProps } from 'react-table';

import SortIcon, { IconType } from '../../../icons/Sort';
import { ColumnType, TableData } from '../../../types';
import { useMenuItemStyle } from './useMenuItemStyle';

const getIconType = (type?: ColumnType): IconType => {
  switch (type) {
    case 'text':
      return 'alpha';
    case 'number':
      return 'numeric';
  }
  return 'amount';
};

export const ColumnMenuItemSort = <D extends TableData>(props: HeaderProps<D>): JSX.Element => {
  const { column } = props;
  const sortOptions = column.getSortByToggleProps();
  const baseStyle = useMenuItemStyle();
  return (
    <span {...sortOptions} className={baseStyle.root}>
      <span>Sort</span>
      {column.isSorted && (
        <SortIcon type={getIconType(column.dataType)} descending={column.isSortedDesc} active={column.isSorted} />
      )}
    </span>
  );
};

export default ColumnMenuItemSort;
