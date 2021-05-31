import { HeaderProps } from 'react-table';

import { TableData } from '../../../types';

export const ColumnMenuItemFilter = <D extends TableData>(props: HeaderProps<D>): JSX.Element | null => {
  const { column } = props;
  return column.canFilter ? <span>{column.render('Filter')}</span> : null;
};
export default ColumnMenuItemFilter;
