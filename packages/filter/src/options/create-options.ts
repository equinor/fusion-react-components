import { FilterOption, FilterOptionBuilder, FilterOptionSelector } from './types';

export const propertySelector = <TData extends Record<string, any>>(
  key: Extract<keyof TData, string>
): FilterOptionSelector<TData> => {
  return (data: TData) => ({ key: data[key], value: data[key] });
};

export const createOptionBuilder =
  <TData extends Record<string, any>, TType, TProp extends keyof TData = keyof TData>(
    selector: FilterOptionSelector<TData>
  ): FilterOptionBuilder<TData, any, any> =>
  (source: TData[], selection?: Partial<Record<TProp, TType>>, data?: TData[]): Record<TProp, FilterOption> => {
    const hasEntry = (value: any) => data && !!data.find((x) => selector(x).value === value);
    const srcCount = (value: any) => source.filter((x) => selector(x).value === value).length;
    const dataCount = (value: any) => (data || []).filter((x) => selector(x).value === value).length;
    const options = source.reduce((acc, item) => {
      const { key, value, label } = selector(item);
      if (acc[key as keyof typeof acc]) {
        return acc;
      }
      const option = {
        label: label || value,
        excluded: !hasEntry(value),
        selected: selection && !!selection[key as keyof typeof acc],
        count: dataCount(value),
        totalCount: srcCount(value),
      };
      return { ...acc, [key]: option };
    }, {} as Record<TProp, FilterOption>);

    return options;
  };
