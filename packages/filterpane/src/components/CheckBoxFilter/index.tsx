import { useCallback, useContext, useEffect, useState } from 'react';
import FilterContext from '../../FilterContext';
import FilterOption from '../../models/FilterOption';
import useFilterChangeHandler from '../../hooks/useFilterChangeHandler';
import useFilterOptionsCounter from '../../hooks/useFilterOptionsCounter';
import useFilterOptionsBuilder from '../../hooks/useFilterOptionsBuilder';
import useFilterSelection from '../../hooks/useFilterSelection';
import CheckboxOption from './components/CheckBoxOption';
import SelectAllOption from './components/SelectAllOption';
import { CSSProperties } from 'react';
import { Filter } from '../../models/Filter';
import FilterStore from '../../filterStore/store';
import TextInput from '@equinor/fusion-react-textinput';
import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { TSelection } from 'filterpane/src/FilterProvider';

export type CheckBoxFilterStyleProps = { checkBoxFilterContainer?: CSSProperties; filterHeader?: CSSProperties };

const useStyles = makeStyles<FusionTheme, CheckBoxFilterStyleProps>(() =>
  createStyles({
    CheckBoxFilterContainer: ({ checkBoxFilterContainer }) => ({
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      paddingBottom: '0px',
      boxSizing: 'border-box',
      minWidth: '100px',
      maxWidth: '240px',
      ...checkBoxFilterContainer,
    }),
    FilterHeader: {
      padding: '0 8px',
      fontWeight: 'bold',
    },
    TextInputIcon: {
      transform: 'scale(0.8)',
      cursor: 'pointer',
    },
    FilterOptionsContainer: {
      flexDirection: 'column',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
    },
  })
);

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
  compact?: boolean;
  style?: CheckBoxFilterStyleProps;
};

const CheckBoxFilter = <TSelections extends Record<string, TSelection>, TData>({
  filter,
  useSearch,
  useSelectAll,
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

  return (
    <div className={styles.CheckBoxFilterContainer} key={'Checkbox' + title}>
      <header title={description} className={styles.FilterHeader}>
        {title}
      </header>
      {useSearch && <TextInput value={filterSearch} placeholder={'Search'} type={'search'} />}
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
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CheckBoxFilter;
