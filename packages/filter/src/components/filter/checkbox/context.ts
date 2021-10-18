import { useFilterOptionContext, FilterOptionContext } from '../../../options';
import { CheckboxOption, CheckboxOptionValue } from './types';

export const useCheckboxFilterOptionContext = <
  TOptions extends Record<string, CheckboxOption> = Record<string, CheckboxOption>,
  TValue extends Partial<Record<keyof TOptions, CheckboxOptionValue>> = Partial<
    Record<keyof TOptions, CheckboxOptionValue>
  >
>(): FilterOptionContext<TOptions, TValue> => useFilterOptionContext<TOptions, TValue>();
