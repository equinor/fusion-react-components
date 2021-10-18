import React, { useLayoutEffect, useRef } from 'react';
import { Observable } from '../types';

/**
 * TODO
 */
export const useObservableRef = <S>(subject: Observable<S>, initial?: S): React.RefObject<S | undefined> => {
  const ref = useRef<S | undefined>(initial);
  useLayoutEffect(() => {
    const subscription = subject.subscribe((x) => (ref.current = x));
    return () => subscription.unsubscribe();
  }, [ref, subject]);
  return ref;
};

export default useObservableRef;
