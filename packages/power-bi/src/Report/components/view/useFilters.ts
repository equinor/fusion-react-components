import { useCallback, useMemo } from 'react';

import { Report, models } from 'powerbi-client';

import { EMPTY, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

import { useObservableSubscription } from '@equinor/fusion-observable/react';

import { PowerBIEmbedEvents, PowerBIEmbedEventEntry } from '../../context';

const resetClick: MonoTypeOperatorFunction<PowerBIEmbedEventEntry> = (event$) => {
  /** observe button clicks which matches reset filters */
  const onReset$ = event$.pipe(
    filter((x) => x.type === PowerBIEmbedEvents.buttonClicked),
    filter((x) => x.event?.detail.title?.toLowerCase() === 'reset filter'),
  );
  return onReset$.pipe(
    switchMap(() =>
      /** wait until next render before returning event */
      event$.pipe(
        filter((x) => x.type === PowerBIEmbedEvents.rendered),
        first(),
      ),
    ),
  );
};

export const usePowerBIFilters = (event$: Observable<PowerBIEmbedEventEntry>, filters?: models.IFilter[]) => {
  useObservableSubscription(
    useMemo(() => (filters ? event$.pipe(resetClick) : EMPTY), [event$, filters]),
    useCallback(
      (event: PowerBIEmbedEventEntry) => {
        const { entity } = event;
        if (entity && 'setFilters' in entity) {
          (entity as Report).setFilters(filters ?? []);
        }
      },
      [filters],
    ),
  );
};

export default usePowerBIFilters;
