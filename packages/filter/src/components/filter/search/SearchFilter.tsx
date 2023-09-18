import { useCallback, useMemo, useRef } from 'react';

import { useSubscription } from '@equinor/fusion-react-observable';

import { HTMLTextInputCustomElement, TextInput, TextInputProps } from '@equinor/fusion-react-textinput';

import { useFilter, useFilterSelection } from '../../../hooks';

import type { Filter, FilterFn } from '../../../types';

const defaultMatcher = <TData,>(data: TData[], query: string): TData[] => {
  /** early escape, no filter */
  if (!query) return data;
  const matcher = new RegExp(query, 'i');
  return data.filter((x) => !!JSON.stringify(Object.values(x ?? {})).match(matcher));
};

export type SearchFilterProps<TData> = Omit<TextInputProps, 'onInput' | 'ref'> & {
  /** identifier for filter */
  filterKey: string;
  /** function for filtering by provided query */
  filterFn?: FilterFn<TData, string>;
};

/**
 * Simple text filter
 *
 * __NOTE__ if not `filterFn` provided, default will be created, this filter is brute and
 * `JSON.stringify` provided data object, this might not be optimal for heavy data sets.
 */
export const SearchFilter = <TData,>(props: SearchFilterProps<TData>): JSX.Element => {
  const { filterKey, filterFn, ...args } = props;

  /** create search filter */
  const filter = useMemo<Filter<TData, string>>(
    () => ({
      key: filterKey,
      filterFn: filterFn || defaultMatcher,
    }),
    [filterKey, filterFn],
  );

  /** register filter in the filter context */
  const setSelection = useFilter(filter);

  /** create a reference to the text input */
  const inputRef = useRef<HTMLTextInputCustomElement>(null);

  /** update search selection when input value changes */
  const onInput = useCallback(
    (e: React.FormEvent<HTMLTextInputCustomElement>) => {
      setSelection(e.currentTarget.value);
    },
    [setSelection],
  );

  /** subscribe to changes in the filter selection */
  useSubscription(
    /** create an observable selection for filter  */
    useFilterSelection<string>(props.filterKey),
    /** update value of text input when selection changes */
    useCallback((query: any) => {
      if (inputRef.current) {
        inputRef.current.value = query || '';
      }
    }, []),
  );

  return <TextInput ref={inputRef} onInput={onInput} type="search" variant="outlined" icon="search" {...args} />;
};

export default SearchFilter;
