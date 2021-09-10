import { useMemo } from 'react';
import EpicReducer from '../reducer';
import { useObservableSelector } from './useObservableSelector';

/**
 * Hook for selecting an attribute of a epic
 * @param reducer
 * @param property
 * @param compare
 */
export const useSelector = <S, P extends keyof S>(
  reducer: EpicReducer<S>,
  property: P,
  compare?: (x: S[P], y: S[P]) => boolean
): S[P] | undefined => {
  const state$ = useMemo(() => reducer.state$, [reducer]);
  return useObservableSelector(state$, property, { compare, initial: reducer.value[property] });
};

export default useSelector;
