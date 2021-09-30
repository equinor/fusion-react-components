import {
  Column as ColumnDefault,
  PluginHook as PluginHookDefault,
  HeaderProps,
  Renderer,
  UseFiltersColumnOptions,
  UseSortByColumnOptions,
} from 'react-table';

import { theme } from '@equinor/fusion-react-styles';

export type ColumnType = 'boolean' | 'datetime' | 'number' | 'text' | 'url'; // person

// @ts-ignore
export type TableData = Record<string | number, unknown>;

export type TableType = 'table' | 'flex';

export type SpacingType = keyof typeof theme.spacing.comfortable;

import { ColumnMenuOptions, ColumnMenuProps, MenuState } from './plugins/menu';
import { Sheet } from '.';
import { ExportState } from './plugins/excel/types';

export type Column<TData extends TableData = TableData> = ColumnDefault<TData> &
  UseSortByColumnOptions<TData> &
  ColumnMenuOptions<TData> &
  UseFiltersColumnOptions<TData> & {
    columns?: Array<Column<TData>>;
    ColumnHeader?: Renderer<HeaderProps<TData>>;
    // sortType?: SortByFn<D> | DefaultSortTypes | string;
    dataType?: ColumnType;
    readonly spacing?: SpacingType;
  };
interface UseExportToExcelOptions {
  exportFn: (data: { sheets: Sheet[] }) => Promise<{ url: string; fileName: string }>;
}
declare module 'react-table' {
  // @ts-ignore
  export interface TableOptions<TData extends TableData = TableData>
    extends UseExpandedOptions<TData>,
      UseFiltersOptions<TData>,
      UseGlobalFiltersOptions<TData>,
      UseGroupByOptions<TData>,
      UsePaginationOptions<TData>,
      UseResizeColumnsOptions<TData>,
      UseRowSelectOptions<TData>,
      UseRowStateOptions<TData>,
      UseSortByOptions<TData>,
      UseExportToExcelOptions,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      TableData {
    disableMenu?: boolean;

    // readonly spacing?: SpacingType;
    // @ts-ignore
    // defaultColumn: Partial<FusionColumn<D>>;
  }

  // @ts-ignore
  export interface ColumnInstance<TData extends TableData = TableData>
    extends UseFiltersColumnProps<TData>,
      UseGroupByColumnProps<TData>,
      UseResizeColumnsColumnProps<TData>,
      UseSortByColumnProps<TData>,
      // @ts-ignore
      ColumnMenuProps<TData> {
    dataType?: ColumnType;
    spacing: SpacingType;
  }

  // @ts-ignore
  export type Column<TData extends TableData> = Column<TData>;

  // @ts-ignore
  export type PluginHook<TData extends TableData> = PluginHookDefault<TData>;

  // @ts-ignore
  export interface TableState {
    menu?: MenuState;
    export?: ExportState;
    /*     export?: (data: { sheets: Sheet[] }) => Promise<void>; */
  }

  // @ts-ignore
  export interface UseTableInstanceProps<D extends TableData> {
    export: () => void;
  }
  //@ts-ignore
  export interface TableInstance<D extends TableData = TableData> extends UseExportToExcelOptions {}
}
export { TableOptions } from 'react-table';
