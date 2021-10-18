import { useMemo } from 'react';

import { FilterOptionProvider } from '../../../options/FilterOptionProvider';
import { propertySelector } from '../../../options/create-options';
import { FilterOptionBuilder, FilterOptionSelector } from '../../../options/types';

import { CheckboxOption, CheckboxOptionValue } from './types';

const createFilterFn =
  <TData extends Record<string, unknown>>(selector: FilterOptionSelector<TData>) =>
  (data: TData[], selection: Record<string, unknown>) => {
    const selected = Object.keys(selection || {});
    return selected.length ? data.filter((x) => selected.includes(selector(x).key)) : data;
  };

export type CheckboxFilterProviderProps<
  TData extends Record<string, any>,
  TOptions extends CheckboxOption = CheckboxOption,
  TValue extends CheckboxOptionValue = CheckboxOptionValue
> = {
  filterKey: string;
  optionBuilder?: FilterOptionBuilder<TData, Record<string, TOptions>, TValue>;
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
};

export const CheckboxFilterProvider = <
  TData extends Record<string, any>,
  TOptions extends CheckboxOption = CheckboxOption,
  TValue extends CheckboxOptionValue = CheckboxOptionValue
>(
  props: React.PropsWithChildren<CheckboxFilterProviderProps<TData, TOptions, TValue>>
): JSX.Element => {
  const { filterKey, selector = filterKey, optionBuilder, children } = props;
  const selectorFn = useMemo(
    () =>
      typeof selector === 'function'
        ? selector
        : propertySelector(selector || (selector as Extract<keyof TData, string>)),
    [selector]
  );
  const filterFn = useMemo(() => createFilterFn(selectorFn), [selectorFn]);
  return (
    <FilterOptionProvider selector={selectorFn} optionBuilder={optionBuilder} filter={{ key: filterKey, filterFn }}>
      {children}
    </FilterOptionProvider>
  );
};

export default CheckboxFilterProviderProps;
