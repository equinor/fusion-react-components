import type { FilterOption } from '../types';

export type FilterOptionSearchFn<TOptions extends Record<string, FilterOption>> = (
  options: TOptions,
  query: string
) => Record<string, TOptions>;

export type FilterOptionMatchFn<
  TOption extends FilterOption,
  TResult extends { changed: boolean } = { hide: boolean; changed: boolean }
> = (query: string) => (key: string, value: TOption) => TResult;
