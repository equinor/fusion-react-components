import { Observable, from, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { ApiClient } from '../../../types';
import { StatefulObserver } from '@equinor/fusion/lib/epic';

import { fetchEmbedInfo as fetchEmbedInfoAction, FetchEmbedInfoAction } from '../actions/embed-info';

export type Dependencies = { clients: ApiClient };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fecthEmbedInfo = <S = any>(
  action$: Observable<FetchEmbedInfoAction>,
  _: StatefulObserver<S>,
  { clients }: Dependencies
) =>
  action$.pipe(
    filter(isActionOf(fetchEmbedInfoAction.request)),
    switchMap((action) =>
      from(clients.getEmbedInfo(action.payload)).pipe(
        map((res) => fetchEmbedInfoAction.success(res)),
        catchError((error) => of(fetchEmbedInfoAction.failure({ action, error }))),
        takeUntil(action$.pipe(filter(isActionOf(fetchEmbedInfoAction.cancel))))
      )
    )
  );

export default fecthEmbedInfo;
