import { useMemo } from 'react';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useFilterPanelContext } from './FilterPanelProvider';

import { EdsProvider } from '@equinor/eds-core-react';

import { map } from 'rxjs/operators';
import { FilterContainer } from '../misc';

type FilterPanelFiltersProps = JSX.IntrinsicElements['div'] & {
  readonly FilterSelector?: React.FC;
};

export const FilterPanelFilters = (props: FilterPanelFiltersProps): JSX.Element => {
  const { FilterSelector, ...args } = props;
  const { filters$, showFilters } = useFilterPanelContext();

  const { value: filters } = useObservableState(
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
    <EdsProvider density="compact">
      <div {...args} style={{ display: showFilters ? '' : 'none' }}>
        {FilterSelector && <FilterSelector />}
        <FilterContainer>{filters}</FilterContainer>
      </div>
    </EdsProvider>
  );
};

export default FilterPanelFilters;
