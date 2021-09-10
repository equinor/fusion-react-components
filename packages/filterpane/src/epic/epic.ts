import { Observable } from 'rxjs';
import { PayloadActionCreator } from 'typesafe-actions';

import { StatefulObserver } from './StatefulObserver';

export type ObservableType<T> = T extends Observable<infer R> ? R : T;
export type Action<T extends string = string> = { type: T };
export type ActionError<T = Error | any, A extends Action = any> = {
  error: T;
  action: A;
};

export type ActionPayload<T> = T extends PayloadActionCreator<string, infer R> ? R : T;

export type Epic<Input extends Action = any, Output extends Input = Input, State = any, Dependencies = any> = (
  action$: Observable<Input>,
  state$: StatefulObserver<State>,
  dependencies: Dependencies
) => Observable<Output>;
