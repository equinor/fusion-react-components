import { useEffect, useMemo } from 'react';

import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useObservable, useSelector } from '@equinor/fusion-react-observable';

import { useFilter, useFilterContext, Filter } from '..';

import { Provider } from './context';
import { actions } from './actions';
import { createOptionReducer } from './reducer';
import { FilterOption, FilterOptionBuilder, FilterOptionSelector } from './types';

import { createOptionBuilder, propertySelector } from './create-options';

const optionReducer = createOptionReducer({} as Record<string, FilterOption>);

export type FilterComponentProviderProps<
  TData,
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>> | undefined
> = {
  filter: Filter<TData, TValue>;
  optionBuilder?: FilterOptionBuilder<TData, TOptions, TValue>;
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
};

export interface FilterOptionProvider<
  TData extends Record<string, any>,
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>>
> {
  (
    props: React.PropsWithChildren<{
      filter: Filter<TData, TValue>;
      selector: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
    }>
  ): JSX.Element;
}

export interface FilterOptionProvider<
  TData extends Record<string, any>,
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>>
> {
  (
    props: React.PropsWithChildren<{
      filter: Filter<TData, TValue>;
      optionBuilder: FilterOptionBuilder<TData, TOptions, TValue>;
    }>
  ): JSX.Element;
}

export const FilterOptionProvider = <
  TData extends Record<string, any>,
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>>
>(
  props: React.PropsWithChildren<FilterComponentProviderProps<TData, TOptions, TValue>>
): JSX.Element => {
  const { filter, optionBuilder, selector } = props;

  const createOptions = useMemo<FilterOptionBuilder<TData, TOptions, TValue>>(() => {
    if (optionBuilder) return optionBuilder;
    if (selector) {
      return createOptionBuilder(
        typeof selector === 'string' ? propertySelector(selector as Extract<keyof TData, string>) : selector
      );
    }
    throw Error('either provide a builder for option or a selector for option creation');
  }, [optionBuilder, selector]);

  const context = useFilterContext<TValue, TData>();
  const options$ = useObservable(optionReducer, {});

  const setSelection = useFilter(filter);
  const selection$ = useSelector(context.selection$, filter.key) as Observable<TValue>;

  // TODO clear

  useEffect(() => {
    const data$ = context.makeFilterData({ exclude: [filter.key] });
    const subscription = combineLatest([context.source$, data$, selection$])
      .pipe(
        switchMap(([source, data, selection]) => {
          return of(createOptions(source, selection, data));
        }),
        map((x) => actions.set(x))
      )
      .subscribe((x) => options$.dispatch(x));
    return () => subscription.unsubscribe();
  }, [context, selection$, options$, createOptions, filter.key]);

  const value = {
    options$,
    selection$,
    setSelection,
  };
  // @ts-ignore
  return <Provider value={value}>{props.children}</Provider>;
};

export default FilterOptionProvider;
