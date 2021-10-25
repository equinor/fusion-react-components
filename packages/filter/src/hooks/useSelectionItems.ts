import { useState } from 'react';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { useFilterContext } from '.';

export const useSelectionItems = () => {
  const context = useFilterContext();
  const [gg] = useState(() =>
    combineLatest([context.filter$, context.selection$]).pipe(
      distinctUntilChanged(),
      switchMap(([filters, selections]) => {
        const gg = Object.values(filters)
          .map((filter) => {
            const { title, key } = filter;
            const selection = selections[key] || [];
            return { key, title, selection: [...selection] };
          })
          .filter((x) => !!x.title && !!x.selection);
        return of(gg);
      })
    )
  );
  return gg;
};

export default useSelectionItems;
