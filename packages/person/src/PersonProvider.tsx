import { PropsWithChildren, useEffect, useRef } from 'react';
import { PersonProviderElement, PersonResolver } from '@equinor/fusion-wc-person';

/** Person porvider properties for the resolver */
export type PersonProviderProps = {
  /** Person resolver interface that contains getPresence and getDetails functions */
  personResolver: PersonResolver;
};

/**
 * Person provider component that checks and sets the resolver given as components property
 * @param props resolver and children
 * @returns wrapped fusion web-components person provider with its reference around children
 */

export const PersonProvider = (props: PropsWithChildren<PersonProviderProps>) => {
  const { personResolver, children } = props;
  const providerRef = useRef<PersonProviderElement>(null);

  useEffect(() => {
    if (providerRef.current) {
      providerRef.current.setResolver(personResolver);

      return () => {
        providerRef.current?.removeResolver();
      };
    }
  }, [providerRef, personResolver]);

  return <fwc-person-provider ref={providerRef}>{children}</fwc-person-provider>;
};

export default PersonProvider;
