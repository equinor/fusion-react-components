import type { Observable, FlowSubject } from '@equinor/fusion-observable';
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
  options$: FlowSubject<Record<string, TOption>, Actions>;
  selection$: Observable<Set<TValue>>;
  setSelection: (selection?: Set<TValue>) => void;
};

export type FilterOptionSelector<TData> = (data: TData) => {
  key: string;
  label?: string;
  value: string;
};

export type FilterOptionBuilder<TData, TOption extends FilterOption, TValue = string> = (
  source: TData[],
  selection: Set<TValue>,
  data: TData[],
) => Record<string, TOption>;

export type FilterOptionType<T> = T extends (a: infer TData, b: infer TSelection) => infer C
  ? { data: TData; selection: TSelection; options: C }
  : never;

export type FilterOptionDataType<T> = FilterOptionType<T>['data'];
export type FilterOptionsType<T> = FilterOptionType<T>['options'];
export type FilterOptionSelectionType<T> = FilterOptionType<T>['selection'];
