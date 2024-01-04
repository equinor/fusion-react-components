import { from, of, merge } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil, withLatestFrom } from 'rxjs/operators';

import { ActionError } from '@equinor/fusion-observable';

import { actions } from './actions';

import type { ApiClient } from '../../types';
import type { StoreFlow } from './types';

export const createFlows =
  (client: ApiClient): StoreFlow =>
  (action$, state$) => {
    return merge(
      /** ===== Report ===== */
      action$.pipe(
        filter(actions.report.fetch.match),
        withLatestFrom(state$),
        switchMap(([action, state]) =>
          from(client.getReport(state.id)).pipe(
            map((res) => actions.report.fetch.success(res)),
            catchError((error) => of(actions.report.fetch.failure(new ActionError(action, error)))),
            takeUntil(action$.pipe(filter(actions.report.cancel.match))),
          ),
        ),
      ),
      /** ===== Report description ===== */
      action$.pipe(
        filter(actions.description.fetch.match),
        withLatestFrom(state$),
        switchMap(([action, state]) =>
          from(client.getReportDescription(state.id)).pipe(
            map((res) => actions.description.fetch.success(res)),
            catchError((error) => of(actions.description.fetch.failure(new ActionError(action, error)))),
            takeUntil(action$.pipe(filter(actions.description.cancel.match))),
          ),
        ),
      ),
      /** ===== Access description ===== */
      action$.pipe(
        filter(actions.accessDescription.fetch.match),
        withLatestFrom(state$),
        switchMap(([action, state]) =>
          from(client.getReportAccessDescription(state.id)).pipe(
            map((res) => actions.accessDescription.fetch.success(res)),
            catchError((error) => of(actions.accessDescription.fetch.failure(new ActionError(action, error)))),
            takeUntil(action$.pipe(filter(actions.accessDescription.cancel.match))),
          ),
        ),
      ),
      /** ===== Report requirements ===== */
      action$.pipe(
        filter(actions.requirements.fetch.match),
        withLatestFrom(state$),
        switchMap(([action, state]) =>
          from(client.getReportRequirements(state.id)).pipe(
            map((res) => actions.requirements.fetch.success(res)),
            catchError((error) => of(actions.requirements.fetch.failure(new ActionError(action, error)))),
            takeUntil(action$.pipe(filter(actions.requirements.cancel.match))),
          ),
        ),
      ),
    );
  };

export default createFlows;
