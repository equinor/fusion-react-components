import { useState } from 'react';
import { combineLatest, of } from 'rxjs';
import type { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { useFilterContext } from '.';

export type SelectionItem = {
  key: string;
  title?: string;
  selection: Record<string, any>[];
};

export const useSelectionItems = (): Observable<SelectionItem[]> => {
  const context = useFilterContext();
  const [item$] = useState(() =>
    combineLatest([context.filter$, context.selection$]).pipe(
      distinctUntilChanged(),
      switchMap(([filters, selections]) => {
        const items = Object.values(filters)
          .map((filter) => {
            const { title, key } = filter;
            const selection = selections[key] || [];
            return { key, title, selection: [...selection] as Record<string, any>[] };
          })
          .filter((x) => !!x.title && !!x.selection);
        return of(items);
      })
    )
  );
  return item$;
};

export default useSelectionItems;
