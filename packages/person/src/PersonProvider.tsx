import { PropsWithChildren, useEffect, useRef } from 'react';
import { PersonProviderElement, PersonResolver } from '@equinor/fusion-wc-person';

/** Person porvider properties for the resolver */
export type PersonProviderProps = {
  /** Person resolver interface that contains getPresence and getDetails functions */
  resolve: PersonResolver;
};

/**
 * Person provider component that checks and sets the resolver given as components property
 * @param props resolver and children
 * @returns wrapped fusion web-components person provider with its reference around children
 */

export const PersonProvider: React.FC<PersonProviderProps> = (props: PropsWithChildren<PersonProviderProps>) => {
  const { resolve, children } = props;
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef.current) {
      providerRef.current.resolver = resolve;
    }
  }, [providerRef, resolve]);

  return <fwc-person-provider ref={providerRef}>{children}</fwc-person-provider>;
};

export default PersonProvider;
