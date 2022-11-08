/* eslint-disable react/no-multi-comp */
import { ComponentProps } from '@equinor/fusion-react-utils';
import { SearchableDropdownElement, SearchableDropdownResolver } from '@equinor/fusion-wc-searchable-dropdown';

import DropdownProvider from './DropdownProvider';
import Dropdown from './Dropdown';
import { useDropdownProviderRef } from './useDropdownProviderRef';

type ElementAttributes = Partial<
  Pick<
    SearchableDropdownElement,
    'label' | 'placeholder' | 'variant' | 'meta' | 'graphic' | 'selected' | 'initialText' | 'trailingIcon'
  >
>;

type ElementResolver = {
  resolver?: SearchableDropdownResolver;
};

type ElementProps = ElementAttributes & ElementResolver;

export type ContextSelectorProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const ContextSelector = ({ children, ...props }: React.PropsWithChildren<ElementProps>): JSX.Element => {
  const providerRef = useDropdownProviderRef(props.resolver);
  return (
    <DropdownProvider ref={providerRef}>
      <Dropdown {...props}>{children}</Dropdown>
    </DropdownProvider>
  );
};

export default ContextSelector;
