import { useMemo } from 'react';

import { merge, asyncScheduler } from 'rxjs';
import { observeOn, catchError } from 'rxjs/operators';

import { ReactiveSubject } from '../ReactiveSubject';
import { Action, SideEffect } from '../types';

import { useLayoutSubscription } from './useSubscription';

/**
 * Apply side effect to Reactive Subject.
 *
 * __IMPORTANT__ observable returned from epics must return new action or will create infinite loop
 *
 * @param subject Subject too observe actions from
 * @param effect Array of effect to handle side effects. should be memorized
 * @param dependencies Dependencies used by epics, should be memorized
 */
export const useObservableEffect = <S, A extends Action = Action, D = unknown>(
  subject: ReactiveSubject<S, A>,
  effect: SideEffect<A, S> | Array<SideEffect<A, S>>,
  dependencies?: D
): void => {
  const effect$ = useMemo(() => {
    const { action$, state$ } = subject;
    const effects = Array.isArray(effect) ? effect : [effect];
    return merge(
      ...effects.map((fn) => {
        const output$ = fn(action$, state$, dependencies);
        if (!output$) {
          throw new TypeError(
            `useObservableEffect: one of the provided effects "${
              fn.name || '<anonymous>'
            }" does not return a stream. Double check you're not missing a return statement!`
          );
        }
        return output$;
      })
    );
  }, [subject, effect, dependencies]);

  useLayoutSubscription(
    effect$.pipe(
      catchError((err, caught) => {
        console.error('Unhandled Exception!', err);
        return caught;
      }),
      observeOn(asyncScheduler)
    ),
    subject
  );
};

export default useObservableEffect;
