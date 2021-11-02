import { CSSProperties } from 'react';
import { Filter } from './Filter';

export type FilterContainerProps<TData> = {
  filter: Filter<TData, Record<string, unknown>>;
  useSearch?: boolean;
  useSelectAll?: boolean;
  style?: CSSProperties;
};
