import type { FilterOption } from '../types';

export const filterOptionMatch = <TOption extends FilterOption>(query: string) => {
  const pattern = new RegExp(query, 'i');
  return (key: string, value: TOption): { hide: boolean; changed: boolean } => {
    const hide = !(value.label || key).match(pattern);
    const changed = hide !== value.hide;
    return { hide, changed };
  };
};

export default filterOptionMatch;
