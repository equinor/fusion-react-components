import { FunctionComponent, ReactNode } from 'react';
import { Column as ColumnDefault, ColumnInstance, HeaderProps, UseSortByOptions } from 'react-table';

export type ColumnType = 'text' | 'number' | 'datetime'; // person

export type TableData = Record<string | number, unknown>;

export type TableType = 'table' | 'flex';

export type ColumnMenuOptions<D extends TableData> = {
  readonly showMenu?: boolean;
  readonly menuItems?: FunctionComponent<HeaderProps<D>>[];
  MenuIcon?: (instance: ColumnInstance<D>) => ReactNode;
  // MenuPanel?: (instance: ColumnInstance<D>) => ReactNode;
};

export type FusionColumn<D extends TableData = TableData> = ColumnDefault<D> &
  UseSortByOptions<D> &
  ColumnMenuOptions<D> & {
    columns?: Array<FusionColumn<D>>;
    // sortType?: SortByFn<D> | DefaultSortTypes | string;
    dataType?: ColumnType;
  };

// redeclare module for sort hook
declare module 'react-table' {
  // @ts-ignore
  export interface TableOptions<D extends TableData>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      TableData {
    // @ts-ignore
    defaultColumn: Partial<FusionColumn<D>>;
  }

  // @ts-ignore
  export interface ColumnInstance<D extends TableData = TableData>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D>,
      // @ts-ignore
      ColumnMenuOptions<D> {
    dataType?: ColumnType;
  }

  // @ts-ignore
  export type Column<D extends TableData> = FusionColumn<D>;
}
