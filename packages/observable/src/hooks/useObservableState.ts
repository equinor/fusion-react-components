import { useState } from 'react';
import { Observable } from '../types';
import { useLayoutSubscription } from './useSubscription';

/**
 * Hook for extracting state of observable.
 * **note** when state changes the consumer of the hook will rerender
 * @param subject Observable subject
 * @param initial initial value
 * @returns current state of observable
 */
export const useObservableState = <S>(subject: Observable<S>, initial?: S): S | undefined => {
  const [state, setState] = useState<S | undefined>(initial);
  useLayoutSubscription(subject, setState);
  return state;
};

export default useObservableState;
