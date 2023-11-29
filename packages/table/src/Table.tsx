import { TableOptions, PluginHook } from 'react-table';
import { Layout, TableLayout } from './layout';
import { SpacingType, TableData } from './types';
import { TableProvider } from './TableProvider';
import { PropsWithChildren, ReactNode } from 'react';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import Paginator from './components/pagination/Paginator';

export type TableProps<TData extends TableData> = JSX.IntrinsicElements['div'] & {
  readonly options: TableOptions<TData>;
  readonly layout?: Layout<TData>;
  readonly spacing?: SpacingType;
  readonly classes?: Partial<Record<'table' | 'toolbar', string>>;
  readonly plugins?: Array<PluginHook<TData>>;
  readonly slots?: Partial<Record<'Toolbar', ReactNode>>;
};
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    toolbar: {},
    table: {
      minWidth: '100%',
    },
  }),
);

export const Table = <TData extends TableData>(props: PropsWithChildren<TableProps<TData>>): JSX.Element => {
  const { options, plugins: basePlugins = [], layout = TableLayout, slots = {}, spacing, classes, ...args } = props;
  const { Template } = layout;
  const { Toolbar } = slots;
  const plugins = basePlugins.concat((layout.plugins || []) as PluginHook<TData>[]);
  const styles = useStyles();
  return (
    <TableProvider options={options} plugins={plugins}>
      <div className={styles.root} {...args}>
        <div className={styles.toolbar}>{Toolbar}</div>
        <Template className={clsx(styles.table, classes?.table)} spacing={spacing} />
        <Paginator />
      </div>
    </TableProvider>
  );
};

export default Table;
