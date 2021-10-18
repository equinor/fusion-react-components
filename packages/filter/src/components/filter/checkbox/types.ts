import { FilterOption } from '../../../options';

export type CheckboxOption = FilterOption & {
  label: string;
  count: number;
  totalCount: number;
};
export type CheckboxOptionValue = { selected?: boolean };
