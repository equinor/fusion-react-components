import { useMemo } from 'react';
import { useObservableState } from '@equinor/fusion-react-observable';
import { useFilterPanelContext } from './FilterPanelProvider';

import { map } from 'rxjs/operators';
import { FilterContainer } from '../misc';

type FilterPanelFiltersProps = JSX.IntrinsicElements['div'] & {
  FilterSelector?: React.FC;
};

export const FilterPanelFilters = (props: FilterPanelFiltersProps): JSX.Element => {
  const { FilterSelector, ...args } = props;
  const { filters$, showFilters } = useFilterPanelContext();

  const filters = useObservableState(
    useMemo(
      () =>
        filters$.pipe(
          map(({ filters, selectedFilters }) =>
            filters.filter((filter) => selectedFilters.has(filter.props.filterKey)),
          ),
        ),
      [filters$],
    ),
  );
  return (
    <div {...args} style={{ display: showFilters ? '' : 'none' }}>
      {FilterSelector && <FilterSelector />}
      <FilterContainer>{filters}</FilterContainer>
    </div>
  );
};

export default FilterPanelFilters;
