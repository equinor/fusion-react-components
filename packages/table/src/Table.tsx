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
/**
 * The main component for tabular display of data.
 * Requires an array of columns and data passed as props.
 * The component is very customizable and supports custom table layouts,
 * table plugins, pagination, styling, filtering and sorting of columns.
 * @param options - Table options such as columns, data, disablePagination, disableMenu.
 * @param layout - A custom table layout. Defaults to the default table layout if not passed.
 * @param plugins - Custom plugins added to the component.
 * @param spacing - Spacing for the table layout.
 * @param style - CSS style for the table layout.
 * @param className - HTML attribute classname for the table layout.
 * @example ```jsx
 *     const columns: Column[] = [
 *      {
 *        Header: "First Name",
 *        accessor: "firstName",
 *        dataType: "string"
 *      },
 *      {
 *        Header: "Last Name",
 *        accessor: "firstName",
 *        dataType: "string"
 *      }
 *    ];
 *
 *    const data = {
 *        firstName: "James",
 *        lastName: "Bond"
 *    }
 *
 *  const MyApp = () => (
 *    <Table options={{columns, data}} layout={VirtualLayout}/>
 * )
 * ```
 */
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
