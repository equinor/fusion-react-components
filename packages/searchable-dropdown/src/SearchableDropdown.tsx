/* eslint-disable react/no-multi-comp */
import { ComponentProps } from '@equinor/fusion-react-utils';
import { SearchableDropdownElement, SearchableDropdownResolver } from '@equinor/fusion-wc-searchable-dropdown';

import DropdownProvider from './DropdownProvider';
import Dropdown from './Dropdown';
import { useDropdownProviderRef } from './useDropdownProviderRef';

type ElementAttributes = Partial<
  Pick<
    SearchableDropdownElement,
    'label' | 'placeholder' | 'variant' | 'meta' | 'selected' | 'initialText' | 'trailingIcon'
  >
>;

type ElementEvents = {
  onAction?: (e: Event) => void;
};

type ElementResolver = {
  resolver?: SearchableDropdownResolver;
};

type ElementProps = ElementAttributes & ElementEvents & ElementResolver;

export type SearchableDropdownProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const SearchableDropdown = ({ children, ...props }: React.PropsWithChildren<ElementProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(props.resolver);
  return (
    <DropdownProvider ref={providerRef}>
      <Dropdown {...props}>{children}</Dropdown>
    </DropdownProvider>
  );
};

export default SearchableDropdown;
