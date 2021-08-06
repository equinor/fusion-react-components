import { EpicReducer } from '@equinor/fusion/lib/epic';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { pluck, switchMap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import Filter from '../models/Filter';
import FilterStoreState from '../models/FilterStoreState';
import actions, { Actions } from './actions';
import epics from './epics';
import reducers from './reducers';

export type FilterFn<TData> = (data: TData, selection: unknown, allData?: TData) => TData;
export type FilterFnStore<TData> = Record<string, FilterFn<TData>>;
export type FilterSettingsStore<TData> = Record<string, Filter<TData>>;

const filterReducer =
  <TSelection extends Record<string, unknown>, TData>(filters: FilterFnStore<TData>) =>
  (data: TData, selection: TSelection): TData =>
    Object.keys(filters).reduce((acc, key) => filters[key](acc, selection[key] as unknown, data), data) as TData;

export class FilterStore<
  TSelection extends Record<string, unknown> = Record<string, unknown>,
  TData = unknown
> extends EpicReducer<FilterStoreState<TSelection, TData>, Actions> {
  protected _filterFn: FilterFnStore<TData> = {};
  protected _filterSettings: FilterSettingsStore<TData> = {};

  public selection$ = new BehaviorSubject<TSelection>({} as TSelection);

  public getFilterSetting(key: string): Filter<TData> {
    return this._filterSettings[key];
  }

  public registerFilterSettings(filter: Filter<TData>): void {
    this._filterSettings[filter.key] = filter;
  }

  public unRegisterFilter(key: string): void {
    delete this._filterFn[key];
  }

  public registerFilter(key: string, filterFn: FilterFn<TData>): void {
    this._filterFn[key] = filterFn;
  }

  public updateFilterSelection(key: string, values: any): void {
    if (this._filterSettings[key]?.noFilterReset && !Object.keys(values).length) return;
    this.dispatch(actions.selection.update({ key, values }));
  }

  public clearAllFilterSelections(): void {
    this.dispatch(actions.selection.clearAll(this._filterSettings));
  }

  public unSetFilter(key: string): void {
    if (this.getFilterSetting(key).mandatory) return;
    this.dispatch(actions.selection.unSet(key));
  }

  public setFilter(key: string, values: any): void {
    this.dispatch(actions.selection.set({ [key]: values }));
  }

  public overwriteFilterSelection(values: TSelection): void {
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
        const applyFilter = filterReducer(this._filterFn);
        return of(applyFilter(data, selection));
      })
    );
  }
}

export const createFilterStore = <TSelection extends Record<string, unknown>, TData>(
  initialData: TData,
  initialSelection?: TSelection
): FilterStore<TSelection, TData> => {
  const store = new FilterStore<TSelection, TData>(
    reducers,
    epics, //TODO: CAN WE GET RID OF THIS ?????
    { data: initialData, selection: initialSelection || ({} as TSelection) },
    undefined
  );

  store.state$.pipe(pluck('selection'), distinctUntilChanged()).subscribe(store.selection$);

  return store;
};

export default FilterStore;
