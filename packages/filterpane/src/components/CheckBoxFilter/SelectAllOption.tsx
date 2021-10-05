import { useCallback, useMemo } from 'react';

import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterSelection from '../../hooks/useFilterSelection';
import FilterCounters from '../../types/FilterCounters';
import FilterOption from '../../types/FilterOption';
import CheckboxOption from './CheckBoxOption';

type SelectAllOptionProps = {
  filterKey: string;
  filterOptions: Record<string, FilterOption>;
  filterCounters: FilterCounters | null;
  resetSearchString: () => void;
  compact?: boolean;
};

const selectionUpdate = (change: { allSelected: boolean; filterOptionsKeys: string[] }) =>
  change.allSelected ? [] : change.filterOptionsKeys;

export const SelectAllOption = ({
  filterOptions,
  filterKey,
  filterCounters,
  resetSearchString,
  compact,
}: SelectAllOptionProps): JSX.Element => {
  const currentOptionsSelection = useFilterSelection<string[]>(filterKey);

  const validFilterOptionsKeys = useMemo(
    () =>
      filterCounters ? Object.keys(filterOptions).filter((key) => filterCounters[key] > 0) : Object.keys(filterOptions),
    [filterOptions, filterCounters]
  );

  const allSelected = useMemo(
    () => validFilterOptionsKeys.length === currentOptionsSelection?.length,
    [validFilterOptionsKeys, currentOptionsSelection]
  );

  const handleSelectionChange = useFilterChangeHandler(filterKey, selectionUpdate);

  const onSelectionChange = useCallback(
    (_, selected: boolean) => {
      resetSearchString();
      handleSelectionChange({
        allSelected: selected,
        filterOptionsKeys: validFilterOptionsKeys,
      });
    },
    [handleSelectionChange, validFilterOptionsKeys, resetSearchString]
  );

  return (
    <CheckboxOption
      key={'SelectAllOption' + filterKey}
      filterKey={filterKey}
      onSelectionChange={onSelectionChange}
      selected={allSelected}
      label={'(All)'}
      indeterminate={Boolean(!allSelected && currentOptionsSelection?.length)}
      compact={compact}
    />
  );
};

export default SelectAllOption;
