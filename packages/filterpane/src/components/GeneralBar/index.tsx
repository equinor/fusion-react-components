import { useCallback, useContext, useEffect, useMemo, useState, PropsWithChildren } from 'react';
import { Subject } from 'rxjs';
import { pluck, withLatestFrom } from 'rxjs/operators';
import FilterContext from '../../FilterContext';
import Button from '@equinor/fusion-react-button';
import useStyles from './useStyles';
import FilterSelectionChips from '../FilterSelectionChips';
import HorizontalBar from '../HorizontalBar';
import FilterStore from '../../filterStore/store';
import { TSelection } from 'filterpane/src/FilterProvider';
import { TextInput, TextInputChangeEvent } from '@equinor/fusion-react-textinput';

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
      setSearchValue(selection || '');
    });
    return () => subscription.unsubscribe();
  }, []);

  return searchValue;
};

type GeneralBarProps<TData, TSelection> = {
  onMinimize: React.Dispatch<React.SetStateAction<boolean>>;
  minimized: boolean;
  searchFilterFn: (data: TData, searchString: TSelection) => TData;
};

/**
 *A general purpose Bar that implements a "global" search for your dataset.
 *Show/hide buttons for the filter section and Clear filters button.
 *When minimized it also shows Chips, that summarized the chosen filters.
 *
 *Own components can be added as children. These will be shown after built in components.
 *
 * @param searchFilterFn How the search box should interact with the data
 * @param minimized open/close state of main filter view
 * @param onMinimize function added to Show/Hide filter button
 * @returns
 */
const GeneralBar = <TData,>({
  searchFilterFn,
  minimized,
  onMinimize,
  children,
}: PropsWithChildren<GeneralBarProps<TData, TSelection>>): JSX.Element => {
  const context = useContext(FilterContext);
  const store = context.store as FilterStore<Record<string, string>, TData>;
  const SEARCH_KEY = 'GENERALBAR_SEARCH';

  const filterSearch = useSearch(SEARCH_KEY);
  const handleChange = useChangeHandler(SEARCH_KEY);
  const onChange = useCallback(
    (searchValue: TextInputChangeEvent) => handleChange(searchValue.currentTarget.value),
    [handleChange]
  );

  useEffect(() => {
    store.registerFilter(SEARCH_KEY, searchFilterFn);
    return () => store.unRegisterFilter(SEARCH_KEY);
  }, [searchFilterFn]);

  const styles = useStyles();

  return (
    <HorizontalBar>
      <TextInput onInput={onChange} value={filterSearch} placeholder={'Search'} type={'search'} />
      <div className={styles.ButtonContainer}>
        <Button variant={'outlined'} icon={'filter_list'} onClick={() => onMinimize(!minimized)}>
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
