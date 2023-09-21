import { useMemo } from 'react';

import { FilterOptionProvider } from '../../../options/FilterOptionProvider';
import { propertySelector } from '../../../options/create-options';
import { FilterOptionBuilder, FilterOptionSelector } from '../../../options/types';

import type { CheckboxOption } from './types';
import type { FilterFn } from '../../../types';

const createFilterFn =
  <TData extends Record<string, unknown>, TValue = string>(selector: FilterOptionSelector<TData>) =>
  (data: TData[], selection: Set<TValue>) => {
    return selection.size ? data.filter((x) => selection.has(selector(x).key as unknown as TValue)) : data;
  };

export type CheckboxFilterProviderProps<
  TData extends Record<string, any>,
  TOption extends CheckboxOption = CheckboxOption,
> = {
  filterKey: string;
  title?: string;
  filter?: {
    filterFn: FilterFn<TData, Set<string>>;
    optionFn: FilterOptionBuilder<TData, TOption, string>;
  };
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  initial?: Set<string>;
};

export const CheckboxFilterProvider: <
  TData extends Record<string, any>,
  TOptions extends CheckboxOption = CheckboxOption,
>(
  props: React.PropsWithChildren<CheckboxFilterProviderProps<TData, TOptions>>,
) => JSX.Element = <TData extends Record<string, any>, TOptions extends CheckboxOption = CheckboxOption>(
  props: React.PropsWithChildren<CheckboxFilterProviderProps<TData, TOptions>>,
): JSX.Element => {
  const { filterKey, selector = filterKey, title, initial, filter, children } = props;
  const selectorFn = useMemo(
    () =>
      typeof selector === 'function'
        ? selector
        : propertySelector(selector || (selector as Extract<keyof TData, string>)),
    [selector],
  );
  const filterFn = useMemo<FilterFn<TData, Set<string>>>(() => {
    if (filter?.filterFn) return filter.filterFn;
    if (!selectorFn) throw Error('Could not create filter. Please provide either filterFn or filterSelector.');
    return createFilterFn(selectorFn);
  }, [selectorFn, filter?.filterFn]);
  return (
    <FilterOptionProvider
      selector={selectorFn}
      optionBuilder={filter?.optionFn}
      filter={{ key: filterKey, title, initial, filterFn }}
    >
      {children}
    </FilterOptionProvider>
  );
};

export default CheckboxFilterProviderProps;
