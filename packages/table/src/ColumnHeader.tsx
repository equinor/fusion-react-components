import { PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';

import { HeaderProps } from 'react-table';
import { TableData, FusionColumn, TableType } from './types';

const TableHeaderContent = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
`;

const TableHeader = styled.th`
  ${TableHeaderContent} {
  }
`;
const FlexHeader = styled.div`
  ${TableHeaderContent} {
  }
`;

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
  const Component = type === 'flex' ? FlexHeader : TableHeader;
  const sort = !!column.getSortByToggleProps;
  const attr = sort ? column.getHeaderProps(column.getSortByToggleProps()) : column.getHeaderProps();
  return (
    <Component {...attr} className={classes.tableContent}>
      <TableHeaderContent>
        {children}
        {sort && <span>{column.isSorted ? (column.isSortedDesc ? '⬇' : '⬆') : ''}</span>}
      </TableHeaderContent>
    </Component>
  );
};

export default FusionColumnHeader;
