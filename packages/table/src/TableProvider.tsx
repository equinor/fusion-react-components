import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import {
  PluginHook,
  TableInstance,
  TableOptions,
  useFilters,
  useResizeColumns,
  useSortBy,
  useTable,
  TableState,
} from 'react-table';
import { useDefaultColumn } from './components';
import { useExcel } from './plugins/excel';
import { useColumnMenu } from './plugins/menu';
import { TableData } from './types';

export type TableContext<TData extends TableData> = {
  instance: TableInstance<TData>;
  state: TableState<TData>;
};

const context = createContext<TableContext<TableData> | undefined>(undefined);

export const useTableContext = <TData extends TableData = TableData>(): TableContext<TData> =>
  useContext(context) as TableContext<TData>;

export type TableProviderProps<TData extends TableData> = {
  options: TableOptions<TData>;
  plugins?: PluginHook<TData>[];
};

export const TableProvider = <TData extends TableData = TableData>(
  props: PropsWithChildren<TableProviderProps<TData>>
): JSX.Element => {
  const { children, options } = props;

  const _plugins = props.plugins || [];
  const plugins = useMemo(
    () => [useResizeColumns, useColumnMenu, useFilters, useSortBy, useExcel, ..._plugins],
    [..._plugins]
  );

  const defaultColumn = useDefaultColumn(options);

  const instance = useTable({ ...options, defaultColumn }, ...plugins) as TableInstance<TableData>;

  return <context.Provider value={{ instance, state: instance.state }}>{children}</context.Provider>;
};
