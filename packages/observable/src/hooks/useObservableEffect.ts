import { useLayoutEffect } from 'react';
import { ReactiveSubject } from '../ReactiveSubject';
import { Action, SideEffect } from '../types';

export const useObservableEffect = <S, A extends Action = Action>(
  subject: ReactiveSubject<S, A>,
  effect: SideEffect<A, S>
): void => {
  useLayoutEffect(() => {
    const subscription = effect(subject.action$, subject.state$).subscribe(subject);
    return () => subscription.unsubscribe();
  }, [subject, effect]);
};
