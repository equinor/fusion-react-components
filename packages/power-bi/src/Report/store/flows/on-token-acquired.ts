import { of } from 'rxjs';
import { filter, switchMap, delay } from 'rxjs/operators';

import { actions } from '../actions/access-token';

import { accessTokenExpireTime } from './utils';

import type { StoreFlow } from '../types';

export const flow: StoreFlow = (action$) =>
  action$.pipe(
    filter(actions.fetch.success.match),
    switchMap((action) => {
      const expires = accessTokenExpireTime(action.payload);
      return of(actions.refresh({ reason: 'expired since acquired' })).pipe(delay(expires));
    }),
  );

export default flow;
