import { useMemo } from 'react';
import { useObservableState } from '@equinor/fusion-react-observable';
import { useFilterPanelContext } from './FilterPanelProvider';

import { map } from 'rxjs/operators';
import { FilterContainer } from '../misc';

export const FilterPanelFilters = (): JSX.Element => {
  const { filters$, showFilters } = useFilterPanelContext();

  const filters = useObservableState(
    useMemo(
      () =>
        filters$.pipe(
          map(({ filters, selectedFilters }) => filters.filter((filter) => selectedFilters.has(filter.props.filterKey)))
        ),
      [filters$]
    )
  );
  return <FilterContainer style={{ display: showFilters ? '' : 'none' }}>{filters}</FilterContainer>;
};

export default FilterPanelFilters;
