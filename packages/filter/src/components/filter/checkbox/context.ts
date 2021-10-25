import { useFilterOptionContext, FilterOptionContext } from '../../../options';
import { CheckboxOption } from './types';

export const useCheckboxFilterOptionContext = <
  TOption extends CheckboxOption = CheckboxOption,
  TValue = string
>(): FilterOptionContext<TOption, TValue> => useFilterOptionContext<TOption, TValue>();
