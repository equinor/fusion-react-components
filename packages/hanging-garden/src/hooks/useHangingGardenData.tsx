import { useHangingGardenGetData } from './useHangingGardenGetData';
import { formatDistance } from 'date-fns';
import { useState, useRef, useCallback, useEffect } from 'react';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';
import { GardenDataError } from '../models/GardenDataError';

/**
 * The useHangingGardenData hook fetched and stores your raw garden data. It also gives you cache invalidation capabilities and error handling. 
 * 
 * @param getDataAsync A function that retrieves data from API Endpoint. Needs to return as a HTTPResponse Promise 
 * @param applyToFetchedData Optional. A function that takes in and return the fetched data. Can be used if one wants "massage" the dat before returned
 * @param searchableValues Optional. A function that is used in a map to add a searchable field to each fetched item. 
 * @returns data: fetched data, array of T. error: null if OK, else a GardenError object. isFetching: fetching state. retry: a function to initiate a new fetch. Will first remove current data.
 * invalidate: a function to initiate a new fetch. Will NOT first remove current data. cacheIsInvalid: state of the cache, is invalid if cache is 30 min or older. cacheAge: age of cache in minutes
 * @example 
 *  
 * 
export const setItemSearchableValues = (commpkg: HandoverPackage) => ({
    ...commpkg,
    searchableValues: [
        commpkg.commpkgNo,
        commpkg.description,
        commpkg.area,
        commpkg.responsible,
    ].join(),
});
 * 
 *  const applyToFetchedData = (data: HandoverPackage[]) => data.filter((item) => !item.isDemolition);
 * 
 * const {
        data,
        error,
        isFetching,
        retry,
        invalidate,
        cacheAge,
        cacheIsInvalid,
    } = useHangingGardenData(
        'dataProxy',
        'getHandoverAsync',
        applyToFetchedData,
        setItemSearchableValues
    );
 */

type UseHangingGardenData<T> = {
  data: T[];
  error: GardenDataError | null;
  isFetching: boolean;
  retry: () => void;
  invalidate: () => void;
  cacheIsInvalid: boolean;
  cacheAge: string;
};

export const useHangingGardenData = <T,>(
  getDataAsync: (invalidateCache: boolean) => Promise<HttpResponse<T[]>>,
  applyToFetchedData?: ((data: T[]) => T[]) | null,
  searchableValues?: ((data: T) => T) | null,
): UseHangingGardenData<T> => {
  const { isFetching, error, getData } = useHangingGardenGetData<T>(getDataAsync);
  const [data, setData] = useState<T[]>([]);

  const [cacheAgeDate, setCacheAgeDate] = useState<Date>(new Date());
  const [cacheDuration, setCacheDuration] = useState<number>(30);
  const [cacheAge, setCacheAge] = useState('');
  const [cacheIsInvalid, setCacheIsInvalid] = useState(true);
  const cacheCheckTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const checkCacheValidity = useCallback(() => {
    setCacheAge(formatDistance(cacheAgeDate, new Date()));
    const isInvalid = new Date(cacheAgeDate).setMinutes(cacheAgeDate.getMinutes() + cacheDuration) < Date.now();
    setCacheIsInvalid(isInvalid);
    cacheCheckTimerRef.current = setTimeout(checkCacheValidity, 60000);
  }, [cacheAgeDate, cacheDuration]);

  useEffect(() => {
    if (cacheCheckTimerRef.current) clearTimeout(cacheCheckTimerRef.current);

    checkCacheValidity();

    return () => cacheCheckTimerRef.current && clearTimeout(cacheCheckTimerRef.current);
  }, [checkCacheValidity]);

  const formatData = useCallback(
    (data: T[]) => {
      const formattedData = applyToFetchedData ? applyToFetchedData(data) : data;
      return searchableValues ? formattedData.map(searchableValues) : formattedData;
    },
    [searchableValues, applyToFetchedData],
  );

  const fetch = useCallback(
    async (invalidateCache: boolean) => {
      const result = await getData(invalidateCache);
      setData(formatData(result?.data || []));
      setCacheAgeDate(result?.cacheAge || new Date());
      setCacheDuration(result?.cacheDurationInMinutes || 30);
    },
    [isFetching, error, getData, formatData],
  );

  useEffect(() => {
    setData([]);
    fetch(false);
  }, [getData]);

  const retry = useCallback(() => {
    setData([]);
    fetch(true);
  }, [fetch]);

  const invalidate = useCallback(() => {
    fetch(true);
  }, [fetch]);

  return {
    data,
    error,
    isFetching,
    retry,
    invalidate,
    cacheIsInvalid,
    cacheAge,
  };
};
