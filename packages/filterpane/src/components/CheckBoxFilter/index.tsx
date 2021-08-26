import { useCallback, useContext, useEffect, useState } from 'react';
import FilterContext from '../../FilterContext';
import FilterOption from '../../types/FilterOption';
import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterOptionsCounter from '../../hooks/useFilterOptionsCounter';
import useFilterOptionsBuilder from '../../hooks/useFilterOptionsBuilder';
import useFilterSelection from '../../hooks/useFilterSelection';
import CheckboxOption from './components/CheckBoxOption';
import SelectAllOption from './components/SelectAllOption';
import { Filter } from '../../types/Filter';
import FilterStore from '../../filterStore/store';
import { TextInput, TextInputChangeEvent } from '@equinor/fusion-react-textinput';
import { TSelection } from '../../FilterProvider';
import useStyles, { CheckBoxFilterStyleProps } from './useStyles';

const optionVisible = (
  filter: FilterOption,
  selection: string[] | null,
  counters: Record<string, number> | null,
  search: string
) => {
  const { key, searchString } = filter;

  if (selection?.includes(key)) return true;
  if (counters && (!counters[key] || counters[key] === 0)) return false;
  if (search.length && !searchString?.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return false;

  return true;
};

const selectionUpdate = (change: { key: string; checked: boolean; singleSelect?: boolean }, selection: string[]) => {
  if (change.singleSelect) return [change.key];
  if (change.checked) return [...selection, change.key];

  selection.splice(selection.indexOf(change.key), 1);
  return [...selection];
};

export type FilterContainerProps<TData> = {
  filter: Filter<TData, TSelection>;
  useSearch?: boolean;
  useSelectAll?: boolean;
  useSingleSelect?: boolean;
  compact?: boolean;
  style?: CheckBoxFilterStyleProps;
};

/**
 *Standard Checkbox filter.
 *List out all options, and user can check of each item they want to filter on.
 *
 * @param filter Filter definition
 * @param useSearch Show a search bar at top, searching withing the filter options
 * @param useSelectAll Add a (All) Checkbox on top that selects/deselects all options
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
 * <CheckBoxFilter filter={filterSettings} useSearch useSelectAll />
 */
const CheckBoxFilter = <TSelections extends Record<string, TSelection>, TData>({
  filter,
  useSearch,
  useSelectAll,
  useSingleSelect = false,
  compact = false,
  style,
}: FilterContainerProps<TData>): JSX.Element => {
  const [filterSearch, setFilterSearch] = useState('');

  const context = useContext(FilterContext);
  const store = context.store as FilterStore<TSelections, TData>;
  const { key, title, filterFn, optionsBuilderFn, counterFn, description } = filter;

  const handleSelectionChange = useFilterChangeHandler(key, selectionUpdate);
  const filterOptions = useFilterOptionsBuilder(optionsBuilderFn);
  const currentOptionsCounters = useFilterOptionsCounter(key, counterFn);
  const currentOptionsSelection = useFilterSelection<string[]>(key);

  const onSelectionChange = useCallback(
    (key: string, selected: boolean, singleSelect?: boolean) =>
      handleSelectionChange({ key, checked: !selected, singleSelect }),
    [handleSelectionChange]
  );

  useEffect(() => {
    filterFn && store.registerFilter(key, filterFn);
    store.registerFilterSettings(filter);
    return () => store.unRegisterFilter(key);
  }, [store, key, filterFn, filter]);

  const styles = useStyles(style || {});

  const onInput = useCallback((e: TextInputChangeEvent) => setFilterSearch(e.currentTarget.value), [setFilterSearch]);

  return (
    <div className={styles.CheckBoxFilterContainer} key={'Checkbox' + title}>
      <header title={description} className={styles.FilterHeader}>
        {title}
      </header>
      {useSearch && <TextInput onInput={onInput} value={filterSearch} placeholder={'Search'} type={'search'} />}
      <ul className={styles.FilterOptionsContainer}>
        {useSelectAll && filterOptions && (
          <SelectAllOption
            filterKey={key}
            filterOptions={filterOptions.options}
            filterCounters={currentOptionsCounters}
            compact={compact}
            resetSearchString={() => setFilterSearch('')}
          />
        )}

        {filterOptions?.sortOrder?.map((key) => {
          const filterSetting = filterOptions.options[key];

          if (!optionVisible(filterSetting, currentOptionsSelection, currentOptionsCounters, filterSearch)) return;

          return (
            <CheckboxOption
              key={'FilterCheckBox' + key}
              filterKey={key}
              onSelectionChange={onSelectionChange}
              selected={!!currentOptionsSelection?.includes(key)}
              label={filterSetting.label}
              counter={currentOptionsCounters ? currentOptionsCounters?.[key] || '0' : undefined}
              compact={compact}
              singleSelect={useSingleSelect}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CheckBoxFilter;
