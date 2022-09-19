/* eslint-disable react/no-multi-comp */
import { SearchableDropdownElement } from '@equinor/fusion-wc-searchable-dropdown';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ElementAttributes = Partial<
  Pick<
    SearchableDropdownElement,
    'label' | 'placeholder' | 'variant' | 'meta' | 'selected' | 'initialText' | 'trailingIcon'
  >
>;

type ElementEvents = {
  onAction?: (e: Event) => void;
};

type ElementProps = ElementAttributes & ElementEvents;

export type DropdownProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const Dropdown = createComponent<SearchableDropdownElement, ElementProps>(
  SearchableDropdownElement,
  'fwc-searchable-dropdown',
  { events: { onAction: 'action' } }
);

export default Dropdown;
