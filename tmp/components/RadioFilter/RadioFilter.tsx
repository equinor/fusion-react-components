import React, { useCallback, useEffect, useState } from 'react';
import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterOptionsBuilder from '../../hooks/useFilterOptionsBuilder';
import useFilterSelection from '../../hooks/useFilterSelection';
import { Filter } from '../../types/Filter';
import FilterStore from '../../store/store';
import { TextInput, HTMLTextInputCustomElement } from '@equinor/fusion-react-textinput';
import Radio, { HTMLRadioCustomElement } from '@equinor/fusion-react-radio';
import useStyles from './RadioFilter.style';
import FilterOption from '../../types/FilterOption';
import { useFilterContext } from '../../provider';

const optionVisible = (option: FilterOption, searchString: string): boolean =>
  Boolean(
    searchString.length
      ? (option.searchString || option.label?.toString())
          ?.toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      : true
  );

export type RadioFilterContainerProps<TData> = {
  filter: Filter<TData, unknown>;
  useSearch?: boolean;
  compact?: boolean;
};

/**
 *Standard Checkbox filter.
 *List out all options, and user can check of each item they want to filter on.
 *
 * @param filter Filter definition
 * @param useSearch Show a search bar at top, searching withing the filter options
 * @param style Add additional styling to the Filter container and header.
 */

export const RadioFilter = <TSelections extends Record<string, unknown>, TData>({
  filter,
  useSearch,
  compact,
}: RadioFilterContainerProps<TData>): JSX.Element => {
  const context = useFilterContext();
  const store = context.store as FilterStore<TSelections, TData>;
  const { key, title, filterFn, optionsBuilderFn, description } = filter;

  const [filterSearch, setFilterSearch] = useState('');

  const selectionUpdate = (change: { key: string }) => change.key;
  const handleChange = useFilterChangeHandler(key, selectionUpdate);

  const onInput = useCallback(
    (e: React.FormEvent<HTMLRadioCustomElement>) => {
      setFilterSearch('');
      handleChange({ key: e.currentTarget.value });
    },
    [handleChange, setFilterSearch]
  );

  const filterOptions = useFilterOptionsBuilder(optionsBuilderFn);
  const currentOptionsSelection = useFilterSelection<string>(key);

  useEffect(() => {
    filterFn && store.registerFilter(key, filterFn);
    store.registerFilterSettings(filter);
    return () => store.unRegisterFilter(key);
  }, [store, key, filterFn, filter]);

  const styles = useStyles();

  const onSearchValueChange = (e: React.FormEvent<HTMLTextInputCustomElement>) =>
    setFilterSearch(e.currentTarget.value);

  return (
    <div className={styles.root} key={'Radio' + title}>
      <header title={description} className={styles.header}>
        {useSearch ? (
          <TextInput
            onInput={onSearchValueChange}
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
        {filterOptions?.sortOrder?.map((filterKey) => {
          const data = filterOptions.options[filterKey];

          if (!optionVisible(data, filterSearch)) return;

          const { label } = data;
          const size = compact ? 14 : undefined;
          const reducedTouchTarget = compact;
          const checked = currentOptionsSelection === filterKey;

          return (
            <Radio
              key={filterKey}
              name={key}
              value={filterKey}
              label={label}
              size={size}
              checked={checked}
              onInput={onInput}
              reducedTouchTarget={reducedTouchTarget}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RadioFilter;
