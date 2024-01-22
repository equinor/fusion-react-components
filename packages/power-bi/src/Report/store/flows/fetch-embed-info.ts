import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { actions } from '../actions/embed-info';

import type { ApiClient } from '../../../types';
import type { StoreFlow } from '../types';

export type Dependencies = { clients: ApiClient };

export const createFlow =
  (clients: ApiClient): StoreFlow =>
  (action$) =>
    action$.pipe(
      filter(actions.fetch.match),
      switchMap((action) =>
        from(clients.getEmbedInfo(action.payload)).pipe(
          map((res) => actions.fetch.success(res)),
          catchError((error) => of(actions.fetch.failure({ action, error }))),
          takeUntil(action$.pipe(filter(actions.cancel.match))),
        ),
      ),
    );

export default createFlow;
