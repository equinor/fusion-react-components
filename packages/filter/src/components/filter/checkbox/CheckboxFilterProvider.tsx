import { useMemo } from 'react';

import { FilterOptionProvider } from '../../../options/FilterOptionProvider';
import { propertySelector } from '../../../options/create-options';
import { FilterOptionBuilder, FilterOptionSelector } from '../../../options/types';

import type { CheckboxOption } from './types';

const createFilterFn =
  <TData extends Record<string, unknown>, TValue = string>(selector: FilterOptionSelector<TData>) =>
  (data: TData[], selection: Set<TValue>) => {
    return selection.size ? data.filter((x) => selection.has(selector(x).key as unknown as TValue)) : data;
  };

export type CheckboxFilterProviderProps<
  TData extends Record<string, any>,
  TOption extends CheckboxOption = CheckboxOption
> = {
  filterKey: string;
  title?: string;
  optionBuilder?: FilterOptionBuilder<TData, TOption, string>;
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  initial?: Set<string>;
};

export const CheckboxFilterProvider = <
  TData extends Record<string, any>,
  TOptions extends CheckboxOption = CheckboxOption
>(
  props: React.PropsWithChildren<CheckboxFilterProviderProps<TData, TOptions>>
): JSX.Element => {
  const { filterKey, selector = filterKey, optionBuilder, title, initial, children } = props;
  const selectorFn = useMemo(
    () =>
      typeof selector === 'function'
        ? selector
        : propertySelector(selector || (selector as Extract<keyof TData, string>)),
    [selector]
  );
  const filterFn = useMemo(() => createFilterFn(selectorFn), [selectorFn]);
  return (
    <FilterOptionProvider
      selector={selectorFn}
      optionBuilder={optionBuilder}
      filter={{ key: filterKey, title, initial, filterFn }}
    >
      {children}
    </FilterOptionProvider>
  );
};

export default CheckboxFilterProviderProps;
