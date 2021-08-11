import FilterCounters from './FilterCounters';
import { FilterOptionsFn } from './FilterOption';

export type FilterFn<TData, TSelection> = (data: TData, selection: TSelection, allData?: TData) => TData;

export type Filter<TData, TSelection> = {
  key: string;
  title: string;
  optionsBuilderFn: FilterOptionsFn<TData>;
  mandatory?: boolean;
  noFilterReset?: boolean;
  filterFn?: FilterFn<TData, TSelection>;
  counterFn?: (data: TData) => FilterCounters;
  resetFilterFn?: (currentSelection?: TSelection) => TSelection;
  description?: string;
  priority?: number;
};

export type FilterFnStore<TData, TSelection = unknown> = Record<string, FilterFn<TData, TSelection>>;
export type FilterSettingsStore<TData, TSelection = unknown> = Record<string, Filter<TData, TSelection>>;
