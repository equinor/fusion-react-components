import { useEffect, useLayoutEffect } from 'react';
import { Observable, Observer } from 'rxjs';

export const useSubscription = <T>(
  observable: Observable<T>,
  observer: (value: T) => void | Partial<Observer<T>>
): void => {
  useEffect(() => {
    const subscription = observable.subscribe(observer);
    return () => subscription.unsubscribe();
  }, [observable, observer]);
};

export const useLayoutSubscription = <T>(
  observable: Observable<T>,
  observer: (value: T) => void | Partial<Observer<T>>
): void => {
  useLayoutEffect(() => {
    const subscription = observable.subscribe(observer);
    return () => subscription.unsubscribe();
  }, [observable, observer]);
};
