import {
  DropdownProvider,
  type SearchableDropdownResolver,
  useDropdownProviderRef,
} from '@equinor/fusion-react-searchable-dropdown';

import type { ContextProviderProps } from './types';

export const ContextProvider = ({
  children,
  ...props
}: React.PropsWithChildren<ContextProviderProps>): JSX.Element => {
  const contextResolverRef = useDropdownProviderRef(props.resolver as SearchableDropdownResolver);
  return <DropdownProvider ref={contextResolverRef}>{children}</DropdownProvider>;
};

export default ContextProvider;
