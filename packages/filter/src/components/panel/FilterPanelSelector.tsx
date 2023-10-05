import { useCallback } from 'react';

import { Checkbox, HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox';

import { initialState, useFilterPanelContext, actions } from './FilterPanelProvider';
import { useObservableState } from '@equinor/fusion-react-observable';

export type FilterPanelSelectorProps = {
  title?: string;
};

export const FilterPanelSelector: React.FC = () => {
  const { filters$ } = useFilterPanelContext();

  const { filters, selectedFilters } = useObservableState(filters$) || initialState;

  const onInput = useCallback(
    (e: React.FormEvent<HTMLCheckboxCustomElement>) => {
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
