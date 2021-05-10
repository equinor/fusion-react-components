import { GardenDataError } from '../models/GardenDataError';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';
import { useState, useCallback } from 'react';
/**
 * The useHangingGardenGetData is used by useHangingGardenData for the acutal api call, but can be used on it own.
 *
 * @param client Name of ApiClient to be used when fetching data.
 * @param endpoint Name of endpoint on given ApiClient to be used when fetching data.
 * @returns getData: takes in currentContext Id and InvalidateCache boolean. Does the api call and return the raw data. error: handles errors gives a GardenDataError or null. isFetching: a fetching flag boolean
 * @example
 * const { isFetching, error, getData } = useHangingGardenGetData('ApiClient', 'endpoint');
 *
 * const currentContext = useCurrentContext();
 * const data = await getData(currentContext.id, true);
 *
 */

type UseHangingGardenGetData<T> = {
  getData: (
    invalidateCache?: boolean | undefined
  ) => Promise<{
    data: T[];
    cacheAge: Date;
    cacheDurationInMinutes: number;
  } | null>;
  error: GardenDataError | null;
  isFetching: boolean;
};

export const useHangingGardenGetData = <T,>(
  getDataAsync: (invalidateCache: boolean) => Promise<HttpResponse<T[]>>
): UseHangingGardenGetData<T> => {
  const [error, setError] = useState<GardenDataError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(
    async (invalidateCache?: boolean) => {
      setIsFetching(true);
      try {
        const response = await getDataAsync(Boolean(invalidateCache));

        if (response === null) {
          setError({ errorType: 'noData' });
          setIsFetching(false);
          return null;
        }

        if (response.status === 202) {
          setError({ errorType: 'noCache' });
          setIsFetching(false);
          return null;
        }

        if (response.status === 200 && !response.data.length) {
          setError({ errorType: 'noData' });
          setIsFetching(false);
          return null;
        }

        const cacheAgeHeader = response?.headers?.get('x-pp-cache-age');
        const cacheAge = cacheAgeHeader == null || cacheAgeHeader === 'live' ? new Date() : new Date(cacheAgeHeader);
        const cacheDurationHeader = response?.headers?.get('x-pp-cache-duration-minutes');
        const cacheDuration = parseInt(cacheDurationHeader || '30', 10);

        setIsFetching(false);
        return {
          data: response.data,
          cacheAge,
          cacheDurationInMinutes: cacheDuration,
        };
      } catch (e) {
        setError({
          errorType: e?.response?.error?.code || 'error',
          errorResponse: e?.response?.error || null,
        });
        setIsFetching(false);
        return null;
      }
    },
    [getDataAsync]
  );

  const getData = useCallback(
    (invalidateCache?: boolean) => {
      setError(null);
      setIsFetching(false);
      return fetchData(invalidateCache);
    },
    [fetchData]
  );

  return {
    getData,
    error,
    isFetching,
  };
};
