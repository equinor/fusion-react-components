import { useState, useEffect } from 'react';

import { useFilterContext } from '../../provider';

export type FilterChips = {
  key: string;
  title: string;
  noFilterReset: boolean;
  selection: any;
};

export const useChipsSelection = () => {
  const { store } = useFilterContext();
  const [chips, setChips] = useState<FilterChips[]>([]);

  useEffect(() => {
    const subscription = store.selection$.subscribe((selections: Record<string, any>) => {
      const chips: FilterChips[] = Object.keys(selections)
        .filter((selection) => selections[selection].length)
        .map((key) => {
          const { title, noFilterReset } = store.getFilterSetting(key);
          return {
            key: key,
            title: title,
            noFilterReset: Boolean(noFilterReset),
            selection: selections[key],
          };
        });
      setChips(chips);
    });
    return () => subscription.unsubscribe();
  }, []);
  return chips;
};

export default useChipsSelection;
