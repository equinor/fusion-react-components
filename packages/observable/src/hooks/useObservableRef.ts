import React, { useCallback, useRef } from 'react';
import { useLayoutSubscription } from './useSubscription';
import { Observable } from '../types';

/**
 * TODO
 */
export const useObservableRef = <S>(subject: Observable<S>, initial?: S): React.RefObject<S | undefined> => {
  const ref = useRef<S | undefined>(initial);
  useLayoutSubscription(
    subject,
    useCallback((x: any) => (ref.current = x), []),
  );
  return ref;
};

export default useObservableRef;
