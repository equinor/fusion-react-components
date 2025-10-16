import { useCallback, type FormEvent, type ReactElement } from 'react';

import { Checkbox } from '@equinor/eds-core-react';

import { initialState, useFilterPanelContext, actions } from './FilterPanelProvider';
import { useObservableState } from '@equinor/fusion-observable/react';

export type FilterPanelSelectorProps = {
  title?: string;
};

export const FilterPanelSelector = (): ReactElement => {
  const { filters$ } = useFilterPanelContext();

  const { filters, selectedFilters } = useObservableState(filters$).value || initialState;

  const onInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const key = e.currentTarget.value;
      const selected = e.currentTarget.checked;
      filters$.next(selected ? actions.remove(key) : actions.add(key));
    },
    [filters$],
  );

  return (
    <div>
      {filters.map(({ props: { filterKey, title } }) => (
        <Checkbox
          key={filterKey}
          value={filterKey}
          label={title}
          checked={selectedFilters.has(filterKey)}
          onInput={onInput}
        />
      ))}
    </div>
  );
};

export default FilterPanelSelector;
