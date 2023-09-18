import { useEffect, useLayoutEffect } from 'react';
import { Observable, Observer } from 'rxjs';

export const useSubscription = <T>(
  observable: Observable<T>,
  observer: Partial<Observer<T>> | ((value: T) => void),
): void => {
  useEffect(() => {
    const subscription = observable.subscribe(observer as Partial<Observer<T>>);
    return () => subscription.unsubscribe();
  }, [observable, observer]);
};

export const useLayoutSubscription = <T>(
  observable: Observable<T>,
  observer: Partial<Observer<T>> | ((value: T) => void),
): void => {
  useLayoutEffect(() => {
    const subscription = observable.subscribe(observer as Partial<Observer<T>>);
    return () => subscription.unsubscribe();
  }, [observable, observer]);
};
