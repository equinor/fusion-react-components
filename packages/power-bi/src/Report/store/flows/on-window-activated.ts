import { fromEvent } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { actions } from '../actions/access-token';

import { shouldUpdateToken } from './utils';

import type { AccessToken, StoreFlow } from '../types';

export const flow: StoreFlow = (_action$, state$) =>
  fromEvent(document, 'visibilitychange').pipe(
    // only trigger when tab is active
    filter(() => !document.hidden),
    // include current state
    withLatestFrom(state$),
    // select token from state
    map(([_, state]) => state.token),
    // only continue of a token exists
    filter((x): x is AccessToken => !!x),
    // only continue if token expired
    filter(shouldUpdateToken),
    // dispatch request for update of token
    map(() => actions.refresh({ reason: 'tab activated' })),
  );

export default flow;
