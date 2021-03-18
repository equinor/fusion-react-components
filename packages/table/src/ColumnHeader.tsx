import { PropsWithChildren, useMemo } from 'react';

import { HeaderProps } from 'react-table';
import { TableData, FusionColumn, TableType } from './types';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.typography.table.cell_header.style,
      },
    }),
  { name: 'fusion-table-header' }
);

const createHeader = (type: TableType = 'table') => <D extends TableData>(column: FusionColumn<D>): FusionColumn<D> =>
  ({
    ...column,
    // eslint-disable-next-line react/display-name
    Header: (args: HeaderProps<D>) => (
      <FusionColumnHeader {...args} type={type}>
        <span>{column.Header}</span>
      </FusionColumnHeader>
    ),
  } as FusionColumn<D>);

const createHeaders = (type: TableType = 'table') => <D extends TableData>(columns: FusionColumn<D>[]) => {
  const ctor = createHeader(type);
  return columns.map((column) => {
    // only apply sortable headers on header, not groups
    if (column.columns) {
      return {
        ...column,
        columns: column.columns?.map(ctor),
      };
    }
    return ctor(column);
  });
};

export const useTableHeaders = <D extends TableData>(
  columns: FusionColumn<D>[],
  type: TableType = 'table'
): Array<FusionColumn<D>> => useMemo(() => createHeaders(type)(columns), [columns, type]);

export type FusionColumnHeaderProps<D extends TableData> = PropsWithChildren<
  HeaderProps<D> & {
    type: TableType;
    classes?: {
      tableContent?: string;
    };
  }
>;

export const FusionColumnHeader = <D extends TableData>(args: FusionColumnHeaderProps<D>): JSX.Element => {
  const { column, children, type = 'table', classes = {} } = args;
  type;
  classes;
  const sort = !!column.getSortByToggleProps;
  const attr = sort ? column.getHeaderProps(column.getSortByToggleProps()) : column.getHeaderProps();
  const styles = useStyle();
  return (
    <div {...attr} className={styles.root}>
      {children}
      {sort && <span>{column.isSorted ? (column.isSortedDesc ? '⬇' : '⬆') : ''}</span>}
    </div>
  );
};

export default FusionColumnHeader;
