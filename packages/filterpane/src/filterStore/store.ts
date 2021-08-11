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
export class FilterStore<
  TSelections extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown
> extends EpicReducer<FilterStoreState<TSelections, TData>, Actions> {
  protected _filterFn: FilterFnStore<TData> = {};
  protected _filterSettings: FilterSettingsStore<TData> = {};

  public selection$ = new BehaviorSubject<TSelections>({} as TSelections);

  public getFilterSetting(key: string): Filter<TData, TSelection> {
    return this._filterSettings[key];
  }

  public registerFilterSettings(filter: Filter<TData, TSelection>): void {
    this._filterSettings[filter.key] = filter;
  }

  public unRegisterFilter(key: string): void {
    if (this.getFilterSetting(key)?.mandatory) return;
    delete this._filterFn[key];
  }

  public registerFilter(key: string, filterFn: FilterFn<TData, TSelection>): void {
    this._filterFn[key] = filterFn;
  }

  public updateFilterSelection(key: string, values: any): void {
    if (this._filterSettings[key]?.noFilterReset && !Object.keys(values).length) return;
    this.dispatch(actions.selection.update({ key, values }));
  }

  public clearAllFilterSelections(): void {
    this.dispatch(actions.selection.clearAll(this._filterSettings));
  }

  public clearSingleFilterSelection(key: string): void {
    this.dispatch(actions.selection.clearSingle(this._filterSettings[key]));
  }

  public unSetFilter(key: string): void {
    if (this.getFilterSetting(key).mandatory) return;
    this.dispatch(actions.selection.unSet(key));
  }

  public setFilter(key: string, values: any): void {
    this.dispatch(actions.selection.set({ [key]: values }));
  }

  public overwriteFilterSelection(values: TSelections): void {
    this.dispatch(actions.selection.override({ ...values }));
  }

  public setData(data: TData): void {
    this.dispatch(actions.data.set(data));

    this.dispatch(actions.selection.triggerFilter());
  }

  public filterSelectionData(key: string): Observable<TData> {
    const data$ = this.state$.pipe(pluck('data'));
    return this.state$.pipe(
      pluck('selection'),
      withLatestFrom(data$),
      switchMap(([selection, data]) => {
        console.log('filterSelectiondata', data);
        const filterFn = { ...this._filterFn };
        delete filterFn[key];
        const applyFilter = filterReducer(filterFn);
        return of(applyFilter(data, selection));
      })
    );
  }

  get data$(): Observable<TData> {
    const data$ = this.state$.pipe(pluck('data'));
    return this.selection$.pipe(
      withLatestFrom(data$),
      switchMap(([selection, data]) => {
        console.log(' get data$', data);
        const applyFilter = filterReducer(this._filterFn);

        return of(applyFilter(data, selection));
      })
    );
  }
}

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
