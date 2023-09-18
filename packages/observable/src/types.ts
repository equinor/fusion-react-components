import { Observable } from 'rxjs';

export { Observable };

export type Reducer<S, A> = (prevState: S, action: A) => S;
export type ReducerState<R extends Reducer<unknown, unknown>> = R extends Reducer<infer S, unknown> ? S : never;
export type ReducerAction<R extends Reducer<unknown, unknown>> = R extends Reducer<unknown, infer A> ? A : never;

export type Action<T extends string = string> = { type: T };
export type ActionType<T extends Action> = T extends Action<infer R> ? R : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SideEffect<Input extends Action, State = unknown, Dependencies = any, Output extends Action = Input> = (
  action$: Observable<Input>,
  state$: Observable<State>,
  dependencies?: Dependencies,
) => Observable<Output>;
