import { useContext, useState, useMemo, useEffect } from 'react';
import FilterContext from '../FilterContext';
import FilterCounters from '../types/FilterCounters';

/**
 * This hook uses the supplied function to count the amount of times a given options occurs in the filtered dataset
 * Updates every time the data set gets filtered, recounting the remaining options.
 *
 * @param key Filter key
 * @param counterFn function that describes how the options should be counted
 * @returns FilterCounters {key: number}
 * @example
 *
 * const countNames = (data) => data.reduce((namesCount,data) => { ...namesCount, [name]: (namesCount[name] || 0) + 1 } )
 * const currentOptionsCounters = useFilterOptionsCounter(key, countNames);
 */
const useFilterOptionsCounter = <TData,>(
  key: string,
  counterFn?: (data: TData) => FilterCounters
): FilterCounters | null => {
  const { store } = useContext(FilterContext);
  const [optionsCount, setOptionsCount] = useState<FilterCounters | null>(null);

  const filteredSelectionData = useMemo(() => store.filterSelectionData(key), [store]);

  useEffect(() => {
    if (!counterFn) {
      setOptionsCount(null);
      return;
    }

    const subscription = filteredSelectionData.subscribe((filteredData) => {
      setOptionsCount(counterFn(filteredData as TData));
    });

    return () => subscription.unsubscribe();
  }, [filteredSelectionData, counterFn]);

  return optionsCount;
};

export default useFilterOptionsCounter;
