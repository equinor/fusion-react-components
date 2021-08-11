import { Children, PropsWithChildren, ReactElement, useContext, useMemo, useState } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useSelector } from '@equinor/fusion';
import FilterContext from '../../../../FilterContext';
import FilterCategory from './components/FilterCategory';
import useStyles from './useStyles';
import TextInput from '@equinor/fusion-react-textinput';
import Icon from '../../../Icon';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';

type FilterSelectorProps = { compact?: boolean };

export type FilterCategoryType = {
  filterKey: string;
  title: string;
  selected: boolean;
  disabled: boolean;
  description?: string;
};

const filterCategories = (children: React.ReactNode, selection: any, filterSearch: string): FilterCategoryType[] =>
  Children.toArray(children)
    .filter((child) =>
      (child as ReactElement).props.filter.title.toLocaleLowerCase().includes(filterSearch.toLocaleLowerCase())
    )
    .map((child) => {
      return {
        filterKey: (child as ReactElement).props.filter.key,
        title: (child as ReactElement).props.filter.title,
        selected:
          Boolean((child as ReactElement).props.filter.mandatory) ||
          Object.hasOwnProperty.call(selection, (child as ReactElement).props.filter.key),
        disabled: Boolean((child as ReactElement).props.filter.mandatory),
        description: (child as ReactElement).props.filter.description,
      };
    });

const FilterSelector = ({ compact = false, children }: PropsWithChildren<FilterSelectorProps>): JSX.Element => {
  const [show, setShow] = useState(true);
  const [filterSearch] = useState('');

  const { store } = useContext(FilterContext);
  const selection = useSelector(store, 'selection');

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
          <TextInput value={filterSearch} placeholder={'Search'} />
          <div className={styles.SelectorSection}>
            {categories.map((category) => (
              <FilterCategory key={category.filterKey} compact={compact} {...category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterSelector;
