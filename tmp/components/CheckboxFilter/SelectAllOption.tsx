import React, { useCallback, useMemo } from 'react';

import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterSelection from '../../hooks/useFilterSelection';
import FilterCounters from '../../types/FilterCounters';
import FilterOption from '../../types/FilterOption';
import CheckboxOption from './CheckboxOption';

type SelectAllOptionProps = {
  filterKey: string;
  filterOptions: Record<string, FilterOption>;
  filterCounters: FilterCounters | null;
  resetSearchString: () => void;
  compact?: boolean;
};

const selectionUpdate = (change: { allSelected: boolean; filterOptionsKeys: Set<string> }) =>
  change.allSelected ? new Set() : change.filterOptionsKeys;

export const SelectAllOption = ({
  filterOptions,
  filterKey,
  filterCounters,
  resetSearchString,
  compact,
}: SelectAllOptionProps): JSX.Element => {
  const currentSelection = useFilterSelection<Set<string>>(filterKey);

  const validKeys = useMemo(
    () =>
      new Set(
        filterCounters
          ? Object.keys(filterOptions).filter((key) => filterCounters[key] > 0)
          : Object.keys(filterOptions)
      ),
    [filterOptions, filterCounters]
  );

  const handleSelectionChange = useFilterChangeHandler(filterKey, selectionUpdate);

  const onChange = useCallback(
    (_key, selected) => {
      handleSelectionChange({
        allSelected: !selected,
        filterOptionsKeys: validKeys,
      });
      resetSearchString();
    },
    [handleSelectionChange, validKeys, resetSearchString]
  );

  const allSelected = validKeys.size === currentSelection?.size;
  const selected = allSelected === undefined ? undefined : allSelected;
  const indeterminate = Boolean(!allSelected && currentSelection?.size);

  return (
    <CheckboxOption
      label="all"
      filterKey="all"
      selected={!!selected}
      indeterminate={indeterminate}
      onChange={onChange}
      compact={compact}
    />
  );
};

export default SelectAllOption;
