import React, { Children, PropsWithChildren, ReactElement, useCallback, useMemo, useState } from 'react';
import { clsx } from '@equinor/fusion-react-styles';

import FilterCategory from './FilterCategory';
import useStyles from './FilterSelector.style';
import { HTMLTextInputCustomElement, TextInput } from '@equinor/fusion-react-textinput';
import Icon from '../Icon';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';
import { Filter } from '../../types/Filter';
import { useFilterContext } from '../../provider';
import useSelector from '../../epic/hooks/useSelector';
import CheckBox, { HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox';

type FilterSelectorProps = { useSearch?: boolean; compact?: boolean };

export type FilterCategoryType = {
  filterKey: string;
  title: string;
  selected: boolean;
  disabled: boolean;
  description?: string;
};

const filterCategories = (children: React.ReactNode, selection: unknown, filterSearch: string): FilterCategoryType[] =>
  Children.toArray(children)
    .filter((child) =>
      (child as ReactElement).props.filter.title.toLocaleLowerCase().includes(filterSearch.toLocaleLowerCase())
    )
    .map((child) => {
      const { key, title, mandatory, description } = (child as ReactElement).props.filter as Filter<unknown, unknown>;
      return {
        filterKey: key,
        title: title,
        selected: Boolean(mandatory) || Object.hasOwnProperty.call(selection, key),
        disabled: Boolean(mandatory),
        description: description,
      };
    });

/**
 * Filter Selector provides a way to select and unselect Filters.
 * Supplied filters will be list out and can be (un)selected through a checkbox.
 * The filter will then be (de)registered as an active filter.
 *
 * Component decides which filter that is selected by looking at the Selections.
 * If the key is in selections, filter will be marked as selected.
 *
 * @param useSearch Add a search bar to filter selector, to search for filters.
 * @param compact Compact Filter options text and checkbox size
 * @param children Add Filters components as children.
 * @example
 * <FilterSelector useSearch compact >
 *     <CheckboxFilter filter={filterSettings}  />
 * </FilterSection>
 */

export const FilterSelector = ({
  useSearch = false,
  compact = false,
  children,
}: PropsWithChildren<FilterSelectorProps>): JSX.Element => {
  const [show, setShow] = useState(true);
  const [filterSearch, setFilterSearch] = useState('');

  const { store } = useFilterContext();
  const selection = useSelector(store, 'selection');

  const onSearchFilter = (e: React.FormEvent<HTMLTextInputCustomElement>) => setFilterSearch(e.currentTarget.value);
  const onCheckboxChange = useCallback(
    (e: React.FormEvent<HTMLCheckboxCustomElement>) => {
      const { name, checked } = e.currentTarget;
      checked ? store.unregisterSelection(name) : store.registerSelection(name, []);
    },
    [store]
  );

  const categories = useMemo(
    () => filterCategories(children, selection, filterSearch),
    [children, selection, filterSearch]
  );
  const styles = useStyles({ compact });

  return (
    <div className={clsx(styles.root, show && styles.FilterSelectorOpen)}>
      <header className={styles.header}>
        {show && !useSearch && <span className={styles.title}>Filter Categories</span>}
        {show && useSearch && (
          <TextInput
            className={styles.searchBox}
            icon="search"
            label="Filter Categories"
            onInput={onSearchFilter}
            value={filterSearch}
            placeholder={'Search'}
            type="search"
            variant="outlined"
            dense={compact}
          />
        )}
        <Icon
          className={styles.toggleBtn}
          icon={show ? arrow_back : arrow_forward}
          onClick={() => setShow((s) => !s)}
        />
      </header>
      {show && (
        <div className={styles.categories}>
          {categories.map((category) => (
            <CheckBox
              key={category.filterKey}
              label={category.title}
              title={category.description}
              name={category.filterKey}
              onInput={onCheckboxChange}
              checked={category.selected}
              reducedTouchTarget={compact}
              disabled={category.disabled}
              size={compact ? 14 : undefined}
            />
            // <FilterCategory key={category.filterKey} compact={compact} {...category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelector;
