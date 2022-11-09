/* eslint-disable react/no-multi-comp */
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import { SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';
export {
  SearchableDropdownResult,
  SearchableDropdownResultItem,
  SearchableDropdownResolver,
} from '@equinor/fusion-wc-searchable-dropdown';

type ElementAttributes = Partial<
  Pick<
    SearchableDropdownElement,
    'label' | 'placeholder' | 'variant' | 'meta' | 'selected' | 'initialText' | 'trailingIcon'
  >
>;

type ElementEvents = {
  onSelect?: (e: Event) => void;
};

type ElementProps = ElementAttributes & ElementEvents;

export type DropdownProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const Dropdown = createComponent<SearchableDropdownElement, ElementProps>(
  SearchableDropdownElement,
  'fwc-searchable-dropdown',
  { events: { onSelect: 'select' } }
);

export default Dropdown;
