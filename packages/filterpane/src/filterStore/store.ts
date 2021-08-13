import { EpicReducer } from '@equinor/fusion/lib/epic';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { pluck, switchMap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import { TSelection } from '../FilterProvider';
import { Filter, FilterFn, FilterFnStore, FilterSettingsStore } from '../models/Filter';
import FilterStoreState from '../models/FilterStoreState';
import actions, { Actions } from './actions';
import epics from './epics';
import reducers from './reducers';

const filterReducer =
  <TSelections extends Record<string, unknown>, TData>(filters: FilterFnStore<TData>) =>
  (data: TData, selections: TSelections): TData => {
    return Object.keys(filters).reduce(
      (acc, key) => filters[key](acc, selections[key] as unknown, data),
      data
    ) as TData;
  };

/**
 *The engine of the Filter provider.
 *Holds all registered filters and selections.
 *Controlled through actions, that will trigger and apply filters when needed.
 */
export class FilterStore<
  TSelections extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown
> extends EpicReducer<FilterStoreState<TSelections, TData>, Actions> {
  protected _filterFn: FilterFnStore<TData> = {};
  protected _filterSettings: FilterSettingsStore<TData> = {};

  /**
   * Holds all filter selections.
   */
  public selection$ = new BehaviorSubject<TSelections>({} as TSelections);

  /**
   *
   * @param key Filter key
   * @returns Filter settings for given key
   */
  public getFilterSetting(key: string): Filter<TData, TSelection> {
    return this._filterSettings[key];
  }

  /**
   *  Register filterSettings for a new Filter
   * @param filter Filter settings
   */
  public registerFilterSettings(filter: Filter<TData, TSelection>): void {
    this._filterSettings[filter.key] = filter;
  }

  /**
   * unregister a filter.
   * Removes the filter functions from the filtering routine.
   * @param key Registered Filter key
   */
  public unRegisterFilter(key: string): void {
    if (this.getFilterSetting(key)?.mandatory) return;
    delete this._filterFn[key];
  }

  /**
   * Registers the filter functions for use in the filtering process
   *
   * @param key filter Key
   * @param filterFn Function for filtering given filter.
   */
  public registerFilter(key: string, filterFn: FilterFn<TData, TSelection>): void {
    this._filterFn[key] = filterFn;
  }
  /**
   * Updates a filter selection with new selection. Overwrites the current selection.
   * This triggers the filtering process.
   *
   * @param key  Filter key
   * @param values new Selection values
   *
   */
  public updateFilterSelection(key: string, values: any): void {
    if (this._filterSettings[key]?.noFilterReset && !Object.keys(values).length) return;
    this.dispatch(actions.selection.update({ key, values }));
  }

  /**
   * Clears the filter selection for all Registered filters.
   */
  public clearAllFilterSelections(): void {
    this.dispatch(actions.selection.clearAll(this._filterSettings));
  }

  /**
   * Clears filter selection for give filter key
   * @param key Filter key
   */
  public clearSingleFilterSelection(key: string): void {
    this.dispatch(actions.selection.clearSingle(this._filterSettings[key]));
  }

  /**
   * Remove selection from selections
   * @param key Filter key
   * @returns
   */
  public unregisterSelection(key: string): void {
    if (this.getFilterSetting(key).mandatory) return;
    this.dispatch(actions.selection.unSet(key));
  }
  /**
   * Add a new selection to the selections.
   * @param key filter key
   * @param values selections values
   */
  public registerSelection(key: string, values: any): void {
    this.dispatch(actions.selection.set({ [key]: values }));
  }

  /**
   * ovewrites the current selections completly.
   * @param values new selections object
   */
  public setFilterSelections(values: TSelections): void {
    this.dispatch(actions.selection.override({ ...values }));
  }

  /**
   * set or orverwrites the current dataset in the provider.
   * @param data new dataset
   */
  public setData(data: TData): void {
    this.dispatch(actions.data.set(data));
    this.dispatch(actions.selection.triggerFilter());
  }

  /**
   * Get filtered data for given Filter key, to be used for getting filter Options.
   * This will return a filtered dataset, without filtering on the given filter key.
   *
   * @param key filter key
   * @returns filtered dataset
   */
  public filterSelectionData(key: string): Observable<TData> {
    const data$ = this.state$.pipe(pluck('data'));
    return this.state$.pipe(
      pluck('selection'),
      withLatestFrom(data$),
      switchMap(([selection, data]) => {
        const filterFn = { ...this._filterFn };
        delete filterFn[key];
        const applyFilter = filterReducer(filterFn);
        return of(applyFilter(data, selection));
      })
    );
  }

  /**
   *@return filtered dataset based on all registered filters and selections
   */
  get data$(): Observable<TData> {
    const data$ = this.state$.pipe(pluck('data'));
    return this.selection$.pipe(
      withLatestFrom(data$),
      switchMap(([selection, data]) => {
        const applyFilter = filterReducer(this._filterFn);
        return of(applyFilter(data, selection));
      })
    );
  }
}

/**
 *Creates the initial context.
 *Selections can be provided to get an inital filtering of the dataset.
 *
 * @param initialData Dataset that will be used for filtering
 * @param initialSelections Add intial/default selections that filters the dataset on load
 * @returns store
 */
export const createFilterStore = <TSelections extends Record<string, unknown>, TData>(
  initialData: TData,
  initialSelections?: TSelections
): FilterStore<TSelections, TData> => {
  const store = new FilterStore<TSelections, TData>(
    reducers,
    epics, //TODO: CAN WE GET RID OF THIS ?????
    { data: initialData, selection: initialSelections || ({} as TSelections) },
    undefined
  );

  store.state$.pipe(pluck('selection'), distinctUntilChanged()).subscribe(store.selection$);

  return store;
};

export default FilterStore;
