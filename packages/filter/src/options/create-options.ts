import type { FilterOption, FilterOptionBuilder, FilterOptionSelector } from './types';

export const propertySelector = <TData extends Record<string, any>>(
  key: Extract<keyof TData, string>,
): FilterOptionSelector<TData> => {
  return (data: TData) => ({ key: data[key], value: data[key] });
};

export const createOptionBuilder =
  <
    TData extends Record<string, unknown>,
    TOption extends FilterOption,
    TOptions extends Record<string, TOption> = Record<string, TOption>,
    TValue = keyof TOptions | string,
  >(
    selector: FilterOptionSelector<TData>,
    isSelected: (key: keyof TOptions | string, selection: Set<TValue>, data?: TData) => boolean = (
      key: keyof TOptions,
      selection: Set<TValue>,
    ) => (selection as unknown as Set<keyof TOptions>).has(key),
  ): FilterOptionBuilder<TData, TOption, TValue> =>
  (source: TData[], selection?: Set<TValue>, data?: TData[]): TOptions => {
    const hasEntry = (value: unknown) => data && !!data.find((x) => selector(x).value === value);
    const srcCount = (value: unknown) => source.filter((x) => selector(x).value === value).length;
    const dataCount = (value: unknown) =>
      (data || []).filter((x) => selector(x).value === value).length;
    const options = source.reduce((acc, item) => {
      const { key, value, label } = selector(item);
      if (acc[key as keyof typeof acc]) {
        return acc;
      }
      const option = {
        label: label || value,
        excluded: !hasEntry(value),
        selected: selection && isSelected(key, selection, item),
        count: dataCount(value),
        totalCount: srcCount(value),
      };
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      return { ...acc, [key]: option };
    }, {} as TOptions);

    return options;
  };
