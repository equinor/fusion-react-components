/* eslint-disable react/no-multi-comp */
import {
  DropdownProvider,
  Dropdown,
  useDropdownProviderRef,
  DropdownProps,
  SearchableDropdownResolver,
  SearchableDropdownResult,
  SearchableDropdownResultItem
} from '@equinor/fusion-react-searchable-dropdown';

type ElementResolver = {
  resolver?: SearchableDropdownResolver;
};

export type ContextResult = SearchableDropdownResult;
export type ContextResultItem = SearchableDropdownResultItem;
export type ContextResolver = SearchableDropdownResolver;
export type ContextSelectorProps = DropdownProps & ElementResolver;

export const ContextSelector = ({ children, ...props }: React.PropsWithChildren<ContextSelectorProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(props.resolver);
  return (
    <DropdownProvider ref={providerRef}>
      <Dropdown {...props}>{children}</Dropdown>
    </DropdownProvider>
  );
};

export default ContextSelector;
