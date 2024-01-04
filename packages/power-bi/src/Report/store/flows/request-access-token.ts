import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { actions } from '../actions/access-token';

import type { ApiClient } from '../../../types';
import type { StoreFlow } from '../types';

export const createFlow =
  (client: ApiClient): StoreFlow =>
  (action$) =>
    action$.pipe(
      filter(actions.fetch.match),
      switchMap((action) =>
        from(client.acquireAccessToken(action.payload.reportId)).pipe(
          map((res) => actions.fetch.success(res)),
          catchError((error) => of(actions.fetch.failure({ action, error }))),
          takeUntil(action$.pipe(filter(actions.cancel.match))),
        ),
      ),
    );

export default createFlow;
