import { CSSProperties } from 'react';
import Filter from './Filter';

export type FilterContainerProps<TData> = {
  filter: Filter<TData>;
  useSearch?: boolean;
  useSelectAll?: boolean;
  style?: CSSProperties;
};
