import {
  PluginHook,
  TableInstance,
  TableOptions,
  useFilters,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable as useReactTable,
} from 'react-table';
import { useDefaultColumn } from './components';
import { useColumnMenu } from './plugins';

import { TableData } from './types';

export const useTable = <TData extends TableData>(
  options: TableOptions<TData>,
  plugins: Array<PluginHook<TData>> = []
): TableInstance<TData> => {
  // TODO: check if sort is allready added?
  true && plugins.push(useFilters);
  true && plugins.push(useSortBy);
  true && plugins.push(usePagination);
  true && plugins.push(useResizeColumns);
  true && plugins.push(useColumnMenu);

  const defaultColumn = useDefaultColumn<TData>(options);
  const instance = useReactTable({ ...options, defaultColumn }, ...plugins);
  return instance;
};
