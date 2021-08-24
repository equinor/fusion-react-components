import { useSelector } from '@equinor/fusion';
import { useContext, useMemo } from 'react';
import FilterContext from '../FilterContext';
import { FilterOptions, FilterOptionsFn } from '../types/FilterOption';

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
  const { store } = useContext(FilterContext);
  const data$ = useSelector(store, 'data');
  const filterOptions = useMemo(() => (data$ ? optionsBuilderFn(data$) : null), [optionsBuilderFn, data$]);

  return filterOptions
    ? {
        options: filterOptions.options,
        sortOrder: filterOptions.sortOrder || Object.keys(filterOptions.options),
      }
    : null;
};

export default useFilterOptionsBuilder;
