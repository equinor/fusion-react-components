import { TableOptions, PluginHook } from 'react-table';
import { Layout, LayoutProps, TableLayout } from './layout';
import { TableData } from './types';
import { TableProvider } from './TableProvider';
import { PropsWithChildren } from 'react';
import Paginator from './components/pagination/Paginator';

export type TableProps<TData extends TableData> = LayoutProps & {
  options: TableOptions<TData>;
  layout?: Layout<TData>;
  plugins?: Array<PluginHook<TData>>;
};

export const Table = <TData extends TableData>(props: PropsWithChildren<TableProps<TData>>): JSX.Element => {
  const { options, plugins: basePlugins = [], layout = TableLayout, children, ...layoutProps } = props;
  const { Template } = layout;

  const plugins = basePlugins.concat((layout.plugins || []) as PluginHook<TData>[]);

  return (
    <TableProvider options={options} plugins={plugins}>
      <Template {...layoutProps} />
      <Paginator />
      {children}
    </TableProvider>
  );
};

export default Table;
