import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { Action, Reducer } from './types';

export class ReactiveSubject<S, A extends Action = Action> extends Observable<S> {
  private __state$: BehaviorSubject<S>;
  private __action$ = new Subject<A>();

  get value(): S {
    return this.__state$.value;
  }

  get state$(): Observable<S> {
    return this.__state$.asObservable();
  }

  get action$(): Observable<A> {
    return this.__action$.asObservable();
  }

  constructor(reducer: Reducer<S, A>, initial: S) {
    super((subscriber) => this.__state$.subscribe(subscriber));
    this.__state$ = new BehaviorSubject<S>(initial);
    this.__action$
      .pipe(
        withLatestFrom(this.__state$),
        map(([action, state]) => reducer(state, action)),
        distinctUntilChanged()
      )
      .subscribe(this.__state$);
  }

  next(action: A): void {
    if (!this.__action$.closed) {
      this.__action$.next(action);
    }
  }
}

export default ReactiveSubject;
