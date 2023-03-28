import { Observable, from, of } from 'rxjs';
import { filter, switchMap, map, takeUntil, catchError } from 'rxjs/operators';

import { isActionOf, ActionType } from 'typesafe-actions';

import { ApiClient } from '../../../types';

import { StatefulObserver } from '@equinor/fusion/lib/epic';
import { ContextActions, checkContextAccess as checkContextAccessAction } from '../actions/context';

export type Dependencies = { clients: ApiClient };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkContextAccess = <S = any>(
  action$: Observable<ContextActions>,
  _: StatefulObserver<S>,
  { clients }: Dependencies
) => {
  const fetch = (action: ActionType<typeof checkContextAccessAction.request>) => {
    const { reportId, externalId, type } = action.payload;
    return from(clients.checkContextAccess(reportId, externalId, type)).pipe(
      map(() => checkContextAccessAction.success()),
      catchError((error) => of(checkContextAccessAction.failure({ action, error }))),
      takeUntil(action$.pipe(filter(isActionOf(checkContextAccessAction.cancel))))
    );
  };

  return action$.pipe(filter(isActionOf(checkContextAccessAction.request)), switchMap(fetch));
};

export default checkContextAccess;
