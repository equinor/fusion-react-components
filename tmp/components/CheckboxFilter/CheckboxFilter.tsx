import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import FilterOption from '../../types/FilterOption';
import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterOptionsCounter from '../../hooks/useFilterOptionsCounter';
import useFilterOptionsBuilder from '../../hooks/useFilterOptionsBuilder';
import useFilterSelection from '../../hooks/useFilterSelection';
import SelectAllOption from './SelectAllOption';
import { Filter } from '../../types/Filter';
import FilterStore from '../../store/store';
import { TextInput, HTMLTextInputCustomElement } from '@equinor/fusion-react-textinput';
import useStyles from './CheckboxFilter.style';
import { useFilterContext } from '../../provider';

import { CheckboxOption } from './CheckboxOption';

const optionVisible = (
  filter: FilterOption,
  selection: Set<string> | null,
  counters: Record<string, number> | null,
  search: string
) => {
  const { key, searchString } = filter;

  if (selection?.has(key)) return true;
  if (counters && (!counters[key] || counters[key] === 0)) return false;
  if (search.length && !searchString?.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return false;

  return true;
};

const selectionUpdate = (change: { key: string; checked: boolean }, selection: Set<string>) => {
  selection ??= new Set();
  const hasChanged = change.checked ? !selection.has(change.key) : selection.has(change.key);
  change.checked ? selection.add(change.key) : selection.delete(change.key);
  return hasChanged ? new Set(selection) : selection;
};

export type FilterContainerProps<TData> = {
  filter: Filter<TData, Set<string>>;
  showSearch?: boolean;
  showSelectAll?: boolean;
  compact?: boolean;
};

/**
 *Standard Checkbox filter.
 *List out all options, and user can check of each item they want to filter on.
 *
 * @param filter Filter definition
 * @param showSearch Show a search bar at top, searching withing the filter options
 * @param showSelectAll Add a (All) Checkbox on top that selects/deselects all options
 * @param compact Compact Filter options text and checkbox size
 * @param useSingleSelect When clicking the option text, only this options will remain selected.
 * @param style Add additional styling to the Filter container and header.
 *
 * @example
 * filterSettings: Filter<TData, TSelection> = {
    key: 'FilterKey',
    title: 'Filter Name',
    description: 'extended details on filter',
    filterFn: (data: TData, selection: TSelection, allData?: TData) => TData,
    optionsBuilderFn: (data: TData) => FilterOptions,
    counterFn: (data:TData) => FilterCounters,
};
 * <CheckboxFilter filter={filterSettings} useSearch showSelectAll />
 */
export const CheckboxFilter = <TSelections extends Record<string, Set<string>>, TData>({
  filter,
  showSearch,
  showSelectAll,
  compact = false,
}: FilterContainerProps<TData>): JSX.Element => {
  const [filterSearch, setFilterSearch] = useState('');

  const store = useFilterContext().store as FilterStore<TSelections, TData>;
  const { key, title, filterFn, optionsBuilderFn, counterFn, description } = filter;

  const handleSelectionChange = useFilterChangeHandler(key, selectionUpdate);
  const filterOptions = useFilterOptionsBuilder(optionsBuilderFn);
  const currentOptionsCounters = useFilterOptionsCounter(key, counterFn);
  const currentOptionsSelection = useFilterSelection<Set<string>>(key);

  const styles = useStyles();

  const onChange = (e: React.FormEvent<HTMLTextInputCustomElement>) => setFilterSearch(e.currentTarget.value);

  const onOptionChange = useCallback(
    (name, checked) => {
      handleSelectionChange({ key: name, checked });
    },
    [handleSelectionChange]
  );

  const { sortOrder = [] } = filterOptions || {};
  const items = Object.values(filterOptions?.options || {})
    .map((item) => ({
      ...item,
      count: (currentOptionsCounters || {})[item.key],
      selected: !!currentOptionsSelection?.has(item.key),
      visible: optionVisible(item, currentOptionsSelection, currentOptionsCounters, filterSearch),
    }))
    .sort((a, b) => sortOrder.indexOf(a.key) - sortOrder.indexOf(b.key));

  useLayoutEffect(() => {
    if (!filterFn || !store) return;
    store.registerFilter(key, filterFn);
    return () => store.unRegisterFilter(key);
  }, [store, key, filterFn]);

  useLayoutEffect(() => {
    if (!store) return;
    store.registerFilterSettings(filter);
  }, [store, filter]);

  return (
    <div className={styles.root} key={'Checkbox' + title}>
      <header title={description} className={styles.header}>
        {showSearch ? (
          <TextInput
            onInput={onChange}
            value={filterSearch}
            placeholder={'Search'}
            type={'search'}
            variant="outlined"
            label={title}
            icon="search"
            dense
          />
        ) : (
          <span className={styles.title}>{title}</span>
        )}
      </header>

      <div className={styles.items}>
        {showSelectAll && filterOptions && (
          <SelectAllOption
            filterKey={key}
            filterOptions={filterOptions.options}
            filterCounters={currentOptionsCounters}
            compact={compact}
            resetSearchString={() => setFilterSearch('')}
          />
        )}
        {items.map(({ key, label, selected, count, visible }) => {
          return (
            <CheckboxOption
              key={key}
              filterKey={key}
              onChange={onOptionChange}
              selected={selected}
              label={String(label)}
              counter={count}
              compact={compact}
              disabled={!visible}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxFilter;
