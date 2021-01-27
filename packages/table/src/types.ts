import { Column } from 'react-table';

// redeclare module for sort hook
declare module 'react-table' {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnInstance<D extends TableData> {
    isSorted: boolean;
    isSortedDesc: boolean;
    getSortByToggleProps: () => Record<string, unknown>;
  }
}

export type TableData = Record<string, unknown>;

export type TableType = 'table' | 'flex';

export type FusionColumn<D extends TableData> = Column<D> & {
  columns?: Array<FusionColumn<D>>;
};
