/* eslint-disable react/no-multi-comp */
import {
  DropdownProvider,
  useDropdownProviderRef,
  SearchableDropdownResolver,
} from '@equinor/fusion-react-searchable-dropdown';

export type ContextResolver = SearchableDropdownResolver;

export type ContextProviderProps = {
  resolver?: ContextResolver;
};

export const ContextProvider = ({ children, ...props }: React.PropsWithChildren<ContextProviderProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(props.resolver);
  return <DropdownProvider ref={providerRef}>{children}</DropdownProvider>;
};

export default ContextProvider;
