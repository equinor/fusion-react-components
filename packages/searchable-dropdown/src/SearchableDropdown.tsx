import type { ComponentProps } from '@equinor/fusion-react-utils';
import type {
  SearchableDropdownElement,
  SearchableDropdownResolver,
} from '@equinor/fusion-wc-searchable-dropdown';

import DropdownProvider from './DropdownProvider';
import { Dropdown, type DropdownProps } from './Dropdown';
import { useDropdownProviderRef } from './useDropdownProviderRef';

type ElementProps = DropdownProps & { resolver?: SearchableDropdownResolver };

export type SearchableDropdownProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const SearchableDropdown = ({
  children,
  resolver,
  ...props
}: React.PropsWithChildren<SearchableDropdownProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(resolver);
  return (
    <DropdownProvider ref={providerRef}>
      <Dropdown {...props}>{children}</Dropdown>
    </DropdownProvider>
  );
};

export default SearchableDropdown;
