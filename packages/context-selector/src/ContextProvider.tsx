import type { PropsWithChildren, ReactElement } from 'react';
import {
  DropdownProvider,
  type SearchableDropdownResolver,
  useDropdownProviderRef,
} from '@equinor/fusion-react-searchable-dropdown';

import type { ContextProviderProps } from './types';

export const ContextProvider = ({
  children,
  ...props
}: PropsWithChildren<ContextProviderProps>): ReactElement => {
  const contextResolverRef = useDropdownProviderRef(props.resolver as SearchableDropdownResolver);
  return <DropdownProvider ref={contextResolverRef}>{children}</DropdownProvider>;
};

export default ContextProvider;
