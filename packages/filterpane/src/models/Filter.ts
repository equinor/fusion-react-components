import { FilterFn } from '../filterStore/store';
import FilterCounters from './FilterCounters';
import { FilterOptions, FilterOptionsFn } from './FilterOption';

type Filter<TData> = {
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

export default Filter;
