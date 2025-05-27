import { type PropsWithChildren, useLayoutEffect, useRef } from 'react';
import type { PersonProviderElement, PersonResolver } from '@equinor/fusion-wc-person';

/** Person provider properties for the resolver */
export type PersonProviderProps = {
  /** Person resolver interface that contains search, getDetails, getInfo and getPhoto functions */
  readonly resolve: PersonResolver;
};

/**
 * Person provider component that checks and sets the resolver given as components property
 * @param props resolver and children
 * @returns wrapped fusion web-components person provider with its reference around children
 */
export const PersonProvider = (props: PropsWithChildren<PersonProviderProps>) => {
  const { resolve, children } = props;
  const providerRef = useRef<PersonProviderElement>(null);

  useLayoutEffect(() => {
    if (providerRef.current) {
      providerRef.current.resolver = resolve;
    }
  }, [providerRef, resolve]);

  return <fwc-person-provider ref={providerRef}>{children}</fwc-person-provider>;
};

export default PersonProvider;
