import { CSSProperties } from 'react';
import { TSelection } from '../FilterProvider';
import { Filter } from './Filter';

export type FilterContainerProps<TData> = {
  filter: Filter<TData, TSelection>;
  useSearch?: boolean;
  useSelectAll?: boolean;
  style?: CSSProperties;
};
