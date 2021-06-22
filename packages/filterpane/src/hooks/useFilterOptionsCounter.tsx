import { useContext, useState, useMemo, useEffect } from 'react';
import FilterContext from '../FilterContext';
import FilterCounters from '../models/FilterCounters';

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
