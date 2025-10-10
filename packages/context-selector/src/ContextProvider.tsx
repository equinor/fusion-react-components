import type { ReactElement } from 'react';
import {
  DropdownProvider,
  type SearchableDropdownResolver,
  useDropdownProviderRef,
} from '@equinor/fusion-react-searchable-dropdown';

import type { ContextProviderProps } from './types';

export const ContextProvider = ({
  children,
  ...props
}: React.PropsWithChildren<ContextProviderProps>): ReactElement => {
  const contextResolverRef = useDropdownProviderRef(props.resolver as SearchableDropdownResolver);
  return <DropdownProvider ref={contextResolverRef}>{children}</DropdownProvider>;
};

export default ContextProvider;
