import FilterCounters from './FilterCounters';
import { FilterOptionsFn } from './FilterOption';

/**
 * @param data The dataset to be filtered, this passes through the all the filter functions
 * @param selection the currently selected options for the filter
 * @param allData(optional) The full dataset
 *
 * @returns return the filtered set of data.
 */
export type FilterFn<TData, TSelection> = (data: TData, selection: TSelection, allData?: TData) => TData;

/**
 * Filter definition for Registering Filters.
 * Provider will only accept this format, when registering a filter.
 *
 * @param key Unique key for the filter.
 * @param title Title to be show to end users
 * @param optionsBuilderFn A function that returns the valid options based on dataSet.
 * @param mandatory (optional) Is the filter mandatory. Filter Provider will not remove this on filter resets.
 * @param noFilterReset (optional) Stop Provider from resetting the filter, when reset functions are fired.
 * @param filterFn(optional) Function that filters data based on the selection. If not supplied, the filter can no be added to the filtering process.
 * @param counterFn(optional) Functions that counts the occurrence of each option in the dataset.
 * @param resetFilterFn(optional) Function that overrides default filter reset. If not supplied, filter selection will be emptied.
 * @param description(optional) description of the filter and how it work.
 * @param priority (optional) Control sort order
 */
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

/**
 * Holds all filter functions that are currently active.
 */
export type FilterFnStore<TData, TSelection = unknown> = Record<string, FilterFn<TData, TSelection>>;

/**
 * Holds settings for all registered filters. Even if they are currently inactive.
 */
export type FilterSettingsStore<TData, TSelection = unknown> = Record<string, Filter<TData, TSelection>>;
