import { useMemo } from 'react';
import useSelector from '../epic/hooks/useSelector';

import { FilterOptions, FilterOptionsFn } from '../types/FilterOption';
import { useFilterContext } from '../provider';

/**
 * Handles building filter options for a filter.
 * uses the dataset in the filterstore to create a set of options for filter.
 *
 * @param optionsBuilderFn function that takes in all data and creates a set off options for a filter.
 * @returns FilterOptions
 * @example
 * const optionsBuilderFn = (data) => { 
 *  const options = data.reduce(c,d) => curr[data.name] = {
      key: option,
      searchString: option,
      label: option,
      }
    };
    
    return {
      options,
      sortOrder: Object.keys(options).sort((a, b) => a.localeCompare(b)),
    }
  }
 * 
 * const {options,sortOrder} = useFilterOptionsBuilder(optionsBuilderFn);
 */
const useFilterOptionsBuilder = <TData,>(optionsBuilderFn: FilterOptionsFn<TData>): FilterOptions | null => {
  const { store } = useFilterContext();
  const data$ = useSelector(store, 'data');
  const filterOptions = useMemo(() => (data$ ? optionsBuilderFn(data$ as TData) : null), [optionsBuilderFn, data$]);

  return filterOptions
    ? {
        options: filterOptions.options,
        sortOrder: filterOptions.sortOrder || Object.keys(filterOptions.options),
      }
    : null;
};

export default useFilterOptionsBuilder;
