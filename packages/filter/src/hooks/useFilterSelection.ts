import { useSelector } from '@equinor/fusion-react-observable';
import type { Observable } from '@equinor/fusion-react-observable';

import { useFilterContext } from '../context';

/**
 * Use the filter selection from filter provider context
 * @param filterKey {string} the key that the filter was registered on
 * @returns {Observable<TSelection>}
 */
export const useFilterSelection = <TSelection>(filterKey: string): Observable<Set<TSelection>> =>
  useSelector(useFilterContext().selection$ as Observable<Record<string, any>>, filterKey);

export default useFilterSelection;
