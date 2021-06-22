import { PropsWithChildren, useEffect, useMemo } from 'react';
import FilterContext from './FilterContext';
import { createFilterStore } from './filterStore/store';

type FilterProviderProps<TSelection extends Record<string, unknown>, TData> = {
  initialData: TData;
  initialFilters?: TSelection;
};

const FilterProvider = <TSelection extends Record<string, unknown>, TData>(
  props: PropsWithChildren<FilterProviderProps<TSelection, TData>>
): JSX.Element => {
  const { initialData, initialFilters = {}, children } = props;
  const store = useMemo(() => createFilterStore(initialData, initialFilters as TSelection), []);

  useEffect(() => {
    store.setData(initialData);
  }, [initialData]);

  return <FilterContext.Provider value={{ store }}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
