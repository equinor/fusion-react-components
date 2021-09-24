import { useMemo } from 'react';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import useObservableState from './useObservableState';

/**
 * Hook selector for attribute on a observable
 *
 * @param state$
 * @param property
 * @param options
 */
export const useObservableSelector = <S, P extends keyof S>(
  state$: Observable<S>,
  property: P,
  options?: {
    compare?: (x: S[P], y: S[P]) => boolean;
    initial?: S[P];
  }
): S[P] | undefined => {
  const prop$ = useMemo(() => state$.pipe(pluck(property)), [state$, property]);
  return useObservableState(prop$, options);
};

export default useObservableSelector;
