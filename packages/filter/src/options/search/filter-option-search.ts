import type { FilterOption } from '../types';
import type { FilterOptionMatchFn } from './types';

export const filterOptionSearch =
  <TOption extends FilterOption>(matcher: FilterOptionMatchFn<TOption>) =>
  (options: Record<string, FilterOption>, query: string): Record<string, TOption> => {
    const match = matcher(query);
    let hasChanged = false;
    const res = Object.entries(options).reduce((acc, [key, value]) => {
      const { hide, changed } = match(key, value as TOption);

      if (!hasChanged && changed) {
        hasChanged = true;
      }

      return Object.assign(acc, { [key]: { ...value, hide } });
    }, {});

    return (hasChanged ? res : options) as Record<string, TOption>;
  };

export default filterOptionSearch;
