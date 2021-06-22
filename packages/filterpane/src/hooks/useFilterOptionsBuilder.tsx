import { useSelector } from '@equinor/fusion';
import { useContext, useMemo } from 'react';
import FilterContext from '../FilterContext';
import { FilterOptions, FilterOptionsFn } from '../models/FilterOption';

const useFilterOptionsBuilder = <TData,>(option: FilterOptionsFn<TData>): FilterOptions | null => {
  const { store } = useContext(FilterContext);
  const data$ = useSelector(store, 'data');
  const filterOptions = useMemo(() => (data$ ? option(data$) : null), [data$]);

  return filterOptions
    ? {
        options: filterOptions.options,
        sortOrder: filterOptions.sortOrder || Object.keys(filterOptions.options),
      }
    : null;
};

export default useFilterOptionsBuilder;
