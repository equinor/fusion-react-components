import { PropsWithChildren, useEffect, useRef } from 'react';
import HTMLPersonProviderCustomElement, { PersonResolver } from '@equinor/fusion-wc-person/person-provider';
import { PersonAvailability, PersonDetails } from '@equinor/fusion-wc-person';

HTMLPersonProviderCustomElement;

export type PersonProviderProps = {
  resolve: PersonResolver;
};

export const PersonProvider = (props: PropsWithChildren<PersonProviderProps>) => {
  const { resolve } = props;
  const ref = useRef<HTMLPersonProviderCustomElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    el.setResolver(resolve);
    return () => {
      el.removeResolver();
    };
  }, [ref, resolve]);
  return <fwc-person-provider ref={ref}>{props.children}</fwc-person-provider>;
};

export const createPersonResolver = (
  details: PersonResolver['getDetails'] | PersonDetails,
  presence?: PersonResolver['getPresence'] | PersonAvailability
): PersonResolver => {
  const getDetails = typeof details === 'function' ? details : () => details;
  const getPresence =
    typeof presence === 'function'
      ? presence
      : async () => {
          if (typeof details === 'function') {
            throw Error('unsupported arguments, when presences is static, details also need to be provided statically');
          }
          return {
            azureId: details.azureId,
            // TODO - should handle undefined
            availability: presence ?? PersonAvailability.Offline,
          };
        };
  const resolver: PersonResolver = {
    getDetails,
    getPresence,
  };
  return resolver;
};

export default PersonProvider;
