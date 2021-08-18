import { useCallback, useContext, useEffect, useState } from 'react';
import FilterContext from '../../FilterContext';

import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterOptionsBuilder from '../../hooks/useFilterOptionsBuilder';
import useFilterSelection from '../../hooks/useFilterSelection';

import { Filter } from '../../models/Filter';
import FilterStore from '../../filterStore/store';
import { TextInput, TextInputChangeEvent } from '@equinor/fusion-react-textinput';
import Radio from '@equinor/fusion-react-radio';
import useStyles, { RadioFilterStyles } from './useStyles';
import { TSelection } from '../../FilterProvider';
import FilterOption from '../../models/FilterOption';

const optionVisible = (option: FilterOption, searchString: string): boolean =>
  Boolean(
    searchString.length
      ? (option.searchString || option.label?.toString())
          ?.toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      : true
  );

export type RadioFilterContainerProps<TData> = {
  filter: Filter<TData, TSelection>;
  useSearch?: boolean;
  styles?: RadioFilterStyles;
};

/**
 *Standard Checkbox filter.
 *List out all options, and user can check of each item they want to filter on.
 *
 * @param filter Filter definition
 * @param useSearch Show a search bar at top, searching withing the filter options
 * @param style Add additional styling to the Filter container and header.
 */

const RadioFilter = <TSelections extends Record<string, TSelection>, TData>({
  filter,
  useSearch,
  styles,
}: RadioFilterContainerProps<TData>): JSX.Element => {
  const context = useContext(FilterContext);
  const store = context.store as FilterStore<TSelections, TData>;
  const { key, title, filterFn, optionsBuilderFn, description } = filter;

  const [filterSearch, setFilterSearch] = useState('');

  const selectionUpdate = (change: { key: string }) => change.key;
  const handleChange = useFilterChangeHandler(key, selectionUpdate);

  const onChange = useCallback(
    (key: string) => {
      setFilterSearch('');
      handleChange({ key: key || '' });
    },
    [handleChange]
  );

  const filterOptions = useFilterOptionsBuilder(optionsBuilderFn);
  const currentOptionsSelection = useFilterSelection<string>(key);

  useEffect(() => {
    filterFn && store.registerFilter(key, filterFn);
    store.registerFilterSettings(filter);
    return () => store.unRegisterFilter(key);
  }, [store, key, filterFn, filter]);

  const Styles = useStyles(styles || {});

  const onInput = useCallback((e: TextInputChangeEvent) => setFilterSearch(e.currentTarget.value), [setFilterSearch]);

  return (
    <div className={Styles.RadioFilterContainer} key={'Radio' + title}>
      <header className={Styles.FilterHeader} title={description}>
        {title}
      </header>
      {useSearch && <TextInput onInput={onInput} value={filterSearch} placeholder={'Search'} type={'search'} />}

      <div className={Styles.FilterOptionsContainer}>
        {filterOptions?.sortOrder?.map((key) => {
          const data = filterOptions.options[key];

          if (!optionVisible(data, filterSearch)) return;

          return (
            <div className={Styles.FilterOption} key={key} onClick={() => onChange(key)}>
              <Radio checked={currentOptionsSelection === key ? true : undefined} />
              <label className={Styles.FilterOptionLabel}>{data.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioFilter;
