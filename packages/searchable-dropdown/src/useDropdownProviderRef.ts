import { useRef, useEffect, MutableRefObject } from 'react';
import { SearchableDropdownProviderElement, SearchableDropdownResolver } from '@equinor/fusion-wc-searchable-dropdown';

export const useDropdownProviderRef = (
  resolver?: SearchableDropdownResolver
): MutableRefObject<SearchableDropdownProviderElement | null> => {
  const providerRef = useRef<SearchableDropdownProviderElement>(null);
  useEffect(() => {
    const current = providerRef?.current;
    if (current && resolver) {
      current.connectResolver(resolver);
      return () => {
        current.removeResolver();
      };
    }
  }, [providerRef, resolver]);

  return providerRef;
};
