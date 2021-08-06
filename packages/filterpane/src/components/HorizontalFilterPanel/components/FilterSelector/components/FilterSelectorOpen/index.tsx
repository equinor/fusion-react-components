import React, { Children, PropsWithChildren, ReactElement, useContext, useMemo, useState } from 'react';
import { useSelector } from '@equinor/fusion';
import FilterContext from '../../../../../../FilterContext';
import FilterCategory from '../FilterCategory';
import useStyles from './useStyles';
import TextInput from '@equinor/fusion-react-textinput';
import Icon from '../../../../../Icon';
import { arrow_back } from '@equinor/eds-icons';

type FilterSelectorOpenProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  compact?: boolean;
};

export type FilterCategoryType = {
  filterKey: string;
  title: string;
  selected: boolean;
  disabled: boolean;
  description?: string;
};

const FilterSelectorOpen = ({
  setShow,
  compact = false,
  children,
}: PropsWithChildren<FilterSelectorOpenProps>): JSX.Element => {
  const [filterSearch] = useState('');

  const { store } = useContext(FilterContext);
  const selection = useSelector(store, 'selection');

  const filterCategories: FilterCategoryType[] = useMemo(
    () =>
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
              Object.prototype.hasOwnProperty.call(selection, (child as ReactElement).props.filter.key),
            disabled: Boolean((child as ReactElement).props.filter.mandatory),
            description: (child as ReactElement).props.filter.description,
          };
        }),
    [children, selection, filterSearch]
  );

  const styles = useStyles();

  return (
    <div className={styles.FilterSelectorOpenContainer}>
      <div className={styles.SelectorHeader} onClick={() => setShow(false)}>
        <span className={styles.SelectorHeaderText}>Filter Categories</span>
        <div>
          <Icon icon={arrow_back} />
        </div>
      </div>

      <TextInput value={filterSearch} placeholder={'Search'} />

      <div className={styles.SelectorSection}>
        {filterCategories.map((category) => (
          <FilterCategory key={category.filterKey} compact={compact} {...category} />
        ))}
      </div>
    </div>
  );
};

export default FilterSelectorOpen;
