import { useLayoutEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Hook for selecting an attribute of a epic
 * @param reducer
 * @param property
 * @param compare
 */
export const useObservableState = <S>(
  state$: Observable<S>,
  options?: {
    compare?: (x: S, y: S) => boolean;
    initial?: S;
  }
): S | undefined => {
  const [state, setState] = useState<S | undefined>(options?.initial);
  useLayoutEffect(() => {
    const subscription = state$.pipe(distinctUntilChanged(options?.compare)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [setState, state$, options?.compare]);
  return state;
};

export default useObservableState;
