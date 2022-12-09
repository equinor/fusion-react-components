/* eslint-disable react/no-multi-comp */
import { DropdownProvider, useDropdownProviderRef } from '@equinor/fusion-react-searchable-dropdown';

import { ContextProviderProps } from './types';

export const ContextProvider = ({ children, ...props }: React.PropsWithChildren<ContextProviderProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(props.resolver);
  return <DropdownProvider ref={providerRef}>{children}</DropdownProvider>;
};

export default ContextProvider;
