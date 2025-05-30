import { useFilterOptionContext, type FilterOptionContext } from '../../../options';
import type { CheckboxOption } from './types';

export const useCheckboxFilterOptionContext = <
  TOption extends CheckboxOption = CheckboxOption,
  TValue = string,
>(): FilterOptionContext<TOption, TValue> => useFilterOptionContext<TOption, TValue>();
