import { Observable, map } from 'rxjs';
import { filterActionFn } from './filter-action';
import { Action } from '../types';

export const mapAction =
  <T extends string, TOut extends Action = Action>(action: string, fn: (action: Action<T>) => TOut) =>
  (source: Observable<Action>): Observable<TOut> => {
    return source.pipe(
      filterActionFn(action),
      map((x) => fn(x as Action<T>))
    );
  };
