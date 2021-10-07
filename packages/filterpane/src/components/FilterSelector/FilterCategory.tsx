import { useMemo, useEffect, useCallback } from 'react';
import { Subject } from 'rxjs';
import CheckBox from '@equinor/fusion-react-checkbox';

import { FilterCategoryType } from './FilterSelector';
import useFilterContext from '../../hooks/useFilterContext';

import { useStyles } from './FilterCategory.style';

const useChangeHandler = (key: string) => {
  const { store } = useFilterContext();
  const change$: Subject<boolean> = useMemo(() => new Subject<boolean>(), []);

  useEffect(() => {
    const subscription = change$.subscribe((checked) => {
      checked ? store.registerSelection(key, []) : store.unregisterSelection(key);
    });
    return () => subscription.unsubscribe();
  }, [store, key, change$]);
  return useCallback((checked: boolean) => change$.next(checked), [change$]);
};

type FilterCategoryProps = FilterCategoryType & { compact?: boolean };

export const FilterCategory = ({
  filterKey,
  title,
  selected,
  disabled,
  description,
  compact = false,
}: FilterCategoryProps): JSX.Element => {
  const onChange = useChangeHandler(filterKey);
  const styles = useStyles();
  return (
    <li className={styles.FilterCategoryContainer} key={filterKey}>
      <CheckBox
        onInput={() => onChange(!selected)}
        checked={selected || undefined}
        reducedTouchTarget={compact}
        disabled={disabled || undefined}
      />
      <label className={styles.CategoryLabel} onClick={() => !disabled && onChange(!selected)} title={description}>
        {title}
      </label>
    </li>
  );
};

export default FilterCategory;
