import { Children, PropsWithChildren, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useSelector } from '@equinor/fusion';
import FilterContext from '../../FilterContext';
import FilterCategory from './components/FilterCategory';
import useStyles from './useStyles';
import { TextInput, TextInputChangeEvent } from '@equinor/fusion-react-textinput';
import Icon from '../Icon';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';
import { Filter } from '../../models/Filter';

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
 * @param compact Compact Filter options text and checkbox size
 * @returns
 */

const FilterSelector = ({
  useSearch = false,
  compact = false,
  children,
}: PropsWithChildren<FilterSelectorProps>): JSX.Element => {
  const [show, setShow] = useState(true);
  const [filterSearch, setFilterSearch] = useState('');

  const { store } = useContext(FilterContext);
  const selection = useSelector(store, 'selection');

  const onInput = useCallback((e: TextInputChangeEvent) => setFilterSearch(e.currentTarget.value), [setFilterSearch]);

  const categories = useMemo(
    () => filterCategories(children, selection, filterSearch),
    [children, selection, filterSearch]
  );

  const styles = useStyles();

  const filterSelectorContainer = useMemo(
    () => clsx(styles.FilterSelectorContainer, show ? styles.FilterSelectorOpen : styles.FilterSelectorMinimized),
    [show, styles]
  );

  return (
    <div className={filterSelectorContainer}>
      <div className={styles.SelectorHeader} onClick={() => setShow((s) => !s)}>
        {show ? (
          <>
            <span className={styles.SelectorHeaderText}>Filter Categories</span>
            <Icon icon={arrow_back} />
          </>
        ) : (
          <Icon icon={arrow_forward} />
        )}
      </div>

      {show && (
        <>
          {useSearch && <TextInput onInput={onInput} value={filterSearch} placeholder={'Search'} type={'search'} />}
          <div className={styles.SelectorSection}>
            {categories.map((category) => (
              <FilterCategory key={category.filterKey} compact={compact} {...category} />
            ))}
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default FilterSelector;
