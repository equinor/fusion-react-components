import { Observable, ReactiveSubject } from '@equinor/fusion-react-observable';
import { Actions } from './actions';

export type FilterOption = {
  label?: string;
  count?: number;
  totalCount?: number;
  selected?: boolean;
  disabled?: boolean;
  inactive?: boolean;
  excluded?: boolean;
  hide?: boolean;
};

export type FilterOptionContext<
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>> | undefined
> = {
  options$: ReactiveSubject<TOptions, Actions>;
  selection$: Observable<TValue>;
  setSelection: (selection: TValue) => void;
};

export type FilterOptionSelector<TData extends Record<string, any>> = (data: TData) => {
  key: string;
  label?: string;
  value: string;
};

export type FilterOptionBuilder<
  TData,
  TOptions extends Record<string, FilterOption>,
  TValue extends Partial<Record<keyof TOptions, any>> | undefined
> = (source: TData[], selection: TValue, data: TData[]) => TOptions;

export type FilterOptionType<T extends unknown> = T extends (a: infer TData, b: infer TSelection) => infer C
  ? { data: TData; selection: TSelection; options: C }
  : never;

export type FilterOptionDataType<T extends unknown> = FilterOptionType<T>['data'];
export type FilterOptionsType<T extends unknown> = FilterOptionType<T>['options'];
export type FilterOptionSelectionType<T extends unknown> = FilterOptionType<T>['selection'];
