/* eslint-disable react/no-multi-comp */
import {
  DropdownProvider,
  Dropdown,
  useDropdownProviderRef,
  DropdownProps,
  SearchableDropdownResolver,
} from '@equinor/fusion-react-searchable-dropdown';

type ElementResolver = {
  resolver?: SearchableDropdownResolver;
};

export { SearchableDropdownResult, SearchableDropdownResultItem } from '@equinor/fusion-react-searchable-dropdown';

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
