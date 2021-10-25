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

export type FilterOptionContext<TOption extends FilterOption, TValue = string> = {
  options$: ReactiveSubject<Record<string, TOption>, Actions>;
  selection$: Observable<Set<TValue>>;
  setSelection: (selection?: Set<TValue>) => void;
};

export type FilterOptionSelector<TData extends Record<string, any>> = (data: TData) => {
  key: string;
  label?: string;
  value: string;
};

export type FilterOptionBuilder<TData, TOption extends FilterOption, TValue = string> = (
  source: TData[],
  selection: Set<TValue>,
  data: TData[]
) => Record<string, TOption>;

export type FilterOptionType<T extends unknown> = T extends (a: infer TData, b: infer TSelection) => infer C
  ? { data: TData; selection: TSelection; options: C }
  : never;

export type FilterOptionDataType<T extends unknown> = FilterOptionType<T>['data'];
export type FilterOptionsType<T extends unknown> = FilterOptionType<T>['options'];
export type FilterOptionSelectionType<T extends unknown> = FilterOptionType<T>['selection'];
