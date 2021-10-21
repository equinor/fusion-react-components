import { useState, useCallback } from 'react';

import { ApiErrorGardenResponse, GardenDataError } from '../models/GardenDataError';

// TODO - @olerichard this should be removed from here, pass client as an provider
import { HttpClientRequestFailedError, HttpResponse } from '@equinor/fusion/lib/http/HttpClient';
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

type GetDataPromise<T> = { data: T[]; cacheAge: Date; cacheDurationInMinutes: number };

type UseHangingGardenGetData<T> = {
  getData: (invalidateCache?: boolean) => Promise<GetDataPromise<T> | null>;
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
        const { response } = e as HttpClientRequestFailedError<ApiErrorGardenResponse>;
        setError({
          errorType: response.error.code || ' error',
          errorResponse: response.error,
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
