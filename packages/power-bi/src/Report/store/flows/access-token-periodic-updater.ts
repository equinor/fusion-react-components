import { filter, withLatestFrom, throttleTime, map } from 'rxjs/operators';

import { actions } from '../actions/access-token';

import type { StoreFlow } from '../types';

const DEFAULT_THROTTLE = 60 * 1000;

export const createFlow =
  (args?: { throttleTime?: number }): StoreFlow =>
  (action$, state$) =>
    action$.pipe(
      filter(actions.refresh.match),
      withLatestFrom(state$),
      throttleTime(args?.throttleTime ?? DEFAULT_THROTTLE),
      map(([_, state]) => actions.fetch({ reportId: state.id, silent: true })),
    );

export default createFlow;
