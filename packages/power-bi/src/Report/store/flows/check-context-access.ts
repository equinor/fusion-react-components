import { from, of } from 'rxjs';
import { filter, switchMap, map, takeUntil, catchError } from 'rxjs/operators';

import { actions } from '../actions/context-access';

import type { ApiClient } from '../../../types';
import type { StoreFlow } from '../types';

export type Dependencies = { clients: ApiClient };

export const createFlow =
  (client: ApiClient): StoreFlow =>
  (action$) => {
    return action$.pipe(
      filter(actions.checkAccess.match),
      switchMap((action) => {
        const { reportId, externalId, type } = action.payload;
        return from(client.checkContextAccess(reportId, externalId, type)).pipe(
          map(() => actions.checkAccess.success()),
          catchError((error) => of(actions.checkAccess.failure({ action, error }))),
          takeUntil(action$.pipe(filter(actions.cancel.match))),
        );
      }),
    );
  };

export default createFlow;
