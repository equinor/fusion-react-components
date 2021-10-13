import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Action } from '../types';

export const filterActionFn = <T extends string>(type: T): MonoTypeOperatorFunction<Action> =>
  filter<Action>((x) => x.type === type);

export const filterAction =
  <T extends string>(type: T) =>
  (source: Observable<Action>): Observable<Action<T>> =>
    source.pipe(filterActionFn(type)) as Observable<Action<T>>;

export default filterAction;
