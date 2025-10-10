import { type InputHTMLAttributes, type ReactElement, useCallback, useMemo, useRef } from 'react';

import { useObservableSelector } from '@equinor/fusion-observable/react';

import { TextField, type TextFieldProps, Icon } from '@equinor/eds-core-react';

import { useFilter, useFilterSelection } from '../../../hooks';

import type { Filter, FilterFn } from '../../../types';

import { search } from '@equinor/eds-icons';

Icon.add({ search });

const defaultMatcher = <TData,>(data: TData[], query: string): TData[] => {
  /** early escape, no filter */
  if (!query) return data;
  const matcher = new RegExp(query, 'i');
  return data.filter((x) => !!JSON.stringify(Object.values(x ?? {})).match(matcher));
};

export type SearchFilterProps<TData> = Omit<TextFieldProps, 'onInput' | 'ref' | 'id'> & {
  /** identifier for filter */
  readonly filterKey: string;
  /** function for filtering by provided query */
  readonly filterFn?: FilterFn<TData, string>;
};

/**
 * Simple text filter
 *
 * __NOTE__ if not `filterFn` provided, default will be created, this filter is brute and
 * `JSON.stringify` provided data object, this might not be optimal for heavy data sets.
 */
export const SearchFilter = <TData,>(props: SearchFilterProps<TData>): ReactElement => {
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
  const inputRef = useRef<HTMLInputElement>(null);

  /** update search selection when input value changes */
  const onInput: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setSelection(e.currentTarget.value);
    },
    [setSelection],
  );

  /** subscribe to changes in the filter selection */
  useObservableSelector(
    /** create an observable selection for filter  */
    useFilterSelection<string>(props.filterKey),
    /** update value of text input when selection changes */
    useCallback((query?: Set<string>) => {
      if (inputRef.current) {
        inputRef.current.value = query ? Array.from(query)[0] || '' : '';
      }
    }, []),
  );

  return (
    <TextField
      id={filterKey}
      ref={inputRef}
      onInput={onInput}
      type="search"
      inputIcon={<Icon name="search" />}
      {...(args as Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>)}
    />
  );
};

export default SearchFilter;
