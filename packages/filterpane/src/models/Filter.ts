import FilterCounters from './FilterCounters';
import { FilterOptions, FilterOptionsFn } from './FilterOption';

export type FilterFn<TData> = (data: TData, selection: unknown, allData?: TData) => TData;

export type Filter<TData> = {
  key: string;
  title: string;
  optionsBuilderFn: FilterOptionsFn<TData>;
  mandatory?: boolean;
  noFilterReset?: boolean;
  filterFn?: FilterFn<TData>;
  counterFn?: (data: TData) => FilterCounters;
  resetFilterFn?: (options?: FilterOptions) => unknown;
  description?: string;
  priority?: number;
};

export type FilterFnStore<TData> = Record<string, FilterFn<TData>>;
export type FilterSettingsStore<TData> = Record<string, Filter<TData>>;
