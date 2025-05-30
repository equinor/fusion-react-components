import { useEffect, useMemo } from 'react';

import { combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useObservable } from '@equinor/fusion-observable/react';

import { useFilterData, useFilterSelection, useFilter, useFilterContext } from '../hooks';
import type { Filter } from '../types';

import { Provider } from './context';
import { actions } from './actions';
import { createOptionReducer } from './reducer';
import { createOptionBuilder, propertySelector } from './create-options';

import type { FilterOption, FilterOptionBuilder, FilterOptionSelector } from './types';

const optionReducer = createOptionReducer({} as Record<string, FilterOption>);

export type FilterComponentProviderProps<TData, TOption extends FilterOption, TValue> = {
  filter: Filter<TData, Set<TValue>>;
  optionBuilder?: FilterOptionBuilder<TData, TOption, TValue>;
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  initial?: Set<TValue>;
};

export const FilterOptionProvider: <
  TData extends Record<string, any>,
  TOption extends FilterOption,
  TValue,
>(
  props: React.PropsWithChildren<FilterComponentProviderProps<TData, TOption, TValue>>,
) => JSX.Element = <TData extends Record<string, any>, TOption extends FilterOption, TValue>(
  props: React.PropsWithChildren<FilterComponentProviderProps<TData, TOption, TValue>>,
): JSX.Element => {
  /** append change method if not provided */
  const filter = useMemo(() => {
    props.filter.hasChanged ??= (a, b) => a !== b;
    return props.filter;
  }, [props.filter]);

  const setSelection = useFilter(filter);
  const selection$ = useFilterSelection<TValue>(filter.key);

  const context = useFilterContext<Set<TValue>, TData>();
  const options$ = useObservable(optionReducer, {});

  /** memorize method for creating filter options */
  const optionBuilder = useMemo<FilterOptionBuilder<TData, TOption, TValue>>(() => {
    /** return provided builder if any */
    if (props.optionBuilder) return props.optionBuilder;
    if (props.selector) {
      /** create a default option builder */
      return createOptionBuilder(
        /** if selector is not a key of object return the selector for creating option */
        typeof props.selector === 'string'
          ? propertySelector(props.selector as Extract<keyof TData, string>)
          : props.selector,
      );
    }
    throw Error('either provide a builder for option or a selector for option creation');
  }, [props.optionBuilder, props.selector]);

  const data$ = useFilterData<TData>(useMemo(() => ({ exclude: [filter.key] }), [filter.key]));

  useEffect(() => {
    const subscription = combineLatest([context.source$, data$, selection$])
      .pipe(
        switchMap(([source, data, selection]) => {
          return of(optionBuilder(source, selection, data));
        }),
        map((x) => actions.set(x)),
      )
      .subscribe(options$);
    return () => subscription.unsubscribe();
  }, [context, selection$, options$, data$, optionBuilder]);

  const value = {
    options$,
    selection$,
    setSelection,
  };
  return <Provider value={value}>{props.children}</Provider>;
};

export default FilterOptionProvider;
