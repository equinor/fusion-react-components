import { useCallback, useContext, useEffect, useMemo, useState, PropsWithChildren } from 'react';

import { Subject } from 'rxjs';
import { pluck, withLatestFrom } from 'rxjs/operators';
import FilterContext from '../../../../FilterContext';
import { FilterFn } from '../../../../filterStore/store';
import TextInput from '@equinor/fusion-react-textinput';
import Button from '@equinor/fusion-react-button';
import useStyles from './useStyles';
import FilterSelectionChips from '../../../FilterSelectionChips';
import HorizontalBar from '../HorizontalBar';

const useChangeHandler = (key: string) => {
  const { store } = useContext(FilterContext);
  const change$: Subject<string> = useMemo(() => new Subject<string>(), []);
  useEffect(() => {
    const subscription = change$
      .pipe(withLatestFrom(store.selection$.pipe(pluck(key))))
      .subscribe(([change]) => store.updateFilterSelection(key, change));

    return () => subscription.unsubscribe();
  }, [key]);
  return useCallback((searchValue: string) => change$.next(searchValue), [change$]);
};

const useSearch = (searchKey: string) => {
  const { store } = useContext(FilterContext);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const subscription = store.selection$.pipe(pluck(searchKey)).subscribe((selection) => {
      setSearchValue(selection);
    });
    return () => subscription.unsubscribe();
  }, []);

  return searchValue;
};

type GeneralBarProps<TData> = {
  onMinimize: React.Dispatch<React.SetStateAction<boolean>>;
  minimized: boolean;
  searchFilterFn: FilterFn<TData>;
};

const GeneralBar = <TData,>({
  searchFilterFn,
  minimized,
  onMinimize,
  children,
}: PropsWithChildren<GeneralBarProps<TData>>): JSX.Element => {
  const context = useContext(FilterContext);
  const store = context.store;
  const SEARCH_KEY = 'GENERALBAR_SEARCH';

  const filterSearch = useSearch(SEARCH_KEY);
  const handleChange = useChangeHandler(SEARCH_KEY);
  const onChange = useCallback((searchValue: string) => handleChange(searchValue), [handleChange]);

  useEffect(() => {
    store.registerFilter(SEARCH_KEY, searchFilterFn);
    return () => store.unRegisterFilter(SEARCH_KEY);
  }, [searchFilterFn]);

  const styles = useStyles();

  return (
    <HorizontalBar>
      <div className={styles.SearchBar} style={{ background: 'lightgrey', lineHeight: '48px' }}>
        "SEARCH BAR"
      </div>

      <div className={styles.ButtonContainer}>
        <Button variant={'outlined'} icon={'filter_list'} onClick={() => onMinimize((prevState) => !prevState)}>
          {minimized ? 'Show filters' : 'Hide filters'}
        </Button>
        <Button variant={'outlined'} icon={'close'} onClick={() => store.clearAllFilterSelections()}>
          Clear filters
        </Button>
      </div>
      {minimized && <FilterSelectionChips />}
      <div>{children}</div>
    </HorizontalBar>
  );
};

export default GeneralBar;
