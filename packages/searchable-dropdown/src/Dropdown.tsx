/* eslint-disable react/no-multi-comp */
import { BaseSyntheticEvent } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import {
  SearchableDropdownElement,
  SearchableDropdownSelectEvent as HTMLSearchableDropdownSelectEvent,
} from '@equinor/fusion-wc-searchable-dropdown';

export {
  SearchableDropdownResult,
  SearchableDropdownResultItem,
  SearchableDropdownResolver,
} from '@equinor/fusion-wc-searchable-dropdown';

type ElementAttributes = Partial<
  Pick<
    SearchableDropdownElement,
    | 'id'
    | 'label'
    | 'placeholder'
    | 'variant'
    | 'meta'
    | 'value'
    | 'initialText'
    | 'leadingIcon'
    | 'dropdownHeight'
    | 'multiple'
    | 'graphic'
  >
>;

export type SearchableDropdownSelectEvent = BaseSyntheticEvent<HTMLSearchableDropdownSelectEvent>;

type ElementEvents = {
  onSelect?: (e: SearchableDropdownSelectEvent) => void;
};

type ElementProps = ElementAttributes & ElementEvents;

export type DropdownProps = ComponentProps<SearchableDropdownElement, ElementProps>;

export const Dropdown = createComponent<SearchableDropdownElement, ElementProps>(
  SearchableDropdownElement,
  'fwc-searchable-dropdown',
  { events: { onSelect: 'select' } }
);

export default Dropdown;
