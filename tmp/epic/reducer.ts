import { Subject, Subscription, BehaviorSubject, PartialObserver, merge, Observable } from 'rxjs';
import { map, distinctUntilChanged, pairwise, filter } from 'rxjs/operators';
import actions from '../store/actions';

import { Action } from './epic';

export type Reducer<S, A> = (prevState: S, action: A) => S;
export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;

import { StatefulObserver } from './StatefulObserver';

export type SideEffect<Input extends Action, Output extends Input = Input, State = unknown, Dependencies = unknown> = (
  action$: Observable<Input>,
  state$: StatefulObserver<State>,
  dependencies?: Dependencies
) => Observable<Output>;

/**
 * State machine
 */
export class EpicReducer<S, A extends Action = any, R extends Reducer<S, A> = Reducer<S, A>, D = any> {
  private readonly _state$: BehaviorSubject<S>;
  private readonly _action$: Subject<A> = new Subject<A>();
  private readonly _subscription: Subscription;

  /** current state */
  get value(): S {
    return this._state$.value;
  }

  /** observable state */
  get state$(): Observable<S> {
    return this._state$.asObservable();
  }

  /** observable actions */
  get action$(): Observable<A> {
    return this._action$.asObservable();
  }

  /** transaction of state changes */
  get transaction$(): Observable<[S, S]> {
    return this._state$.pipe(pairwise());
  }

  constructor(readonly reducer: (s: S) => R, readonly initial: S) {
    this._state$ = new BehaviorSubject(initial);
    this._subscription = this._subscribe();
  }

  /**
   * internal subscription
   */
  protected _subscribe(): Subscription {
    const reducer = this.reducer(this.initial);
    return this._action$
      .pipe(
        map((action) => reducer(this._state$.value, action)),
        distinctUntilChanged()
      )
      .subscribe(this._state$);
  }

  /**
   * Subscribe to state changes of the epic
   * @example
   * ```ts
   * epic.subscribe(x => console.log(x));
   * epic.subscribe({
   *  next: x => console.log(x),
   *  error: x => console.error(x),
   *  complete: () => console.log('closed')
   * });
   * ```
   * @param observerOrNext
   * @param error
   * @param complete
   */
  subscribe(
    observerOrNext?: PartialObserver<S> | ((value: S) => void),
    error?: ((value: unknown) => void) | null,
    complete?: VoidFunction | null
  ): Subscription {
    return typeof observerOrNext === 'object'
      ? this._state$.subscribe(observerOrNext as PartialObserver<S>)
      : this._state$.subscribe(observerOrNext, error || undefined, complete || undefined);
  }

  /**
   * close epic
   */
  unsubscribe(): void {
    this._subscription.unsubscribe();
  }

  /**
   * dispatch action to process
   * @param action
   */
  dispatch(action: A): void {
    if (!this._action$.closed) {
      this._action$.next(action);
    }
  }
}

export default EpicReducer;
