/* eslint-disable react/no-multi-comp */
import {
  DropdownProps,
  SearchableDropdownResultItem,
  SearchableDropdownSelectEvent,
} from '@equinor/fusion-react-searchable-dropdown';

export type ContextResultItem = Pick<
  SearchableDropdownResultItem,
  'children' | 'graphic' | 'id' | 'isDisabled' | 'isError' | 'isSelected' | 'meta' | 'subTitle' | 'title' | 'type'
>;
export type ContextResult = Array<ContextResultItem>;
export type ContextSelectEvent = SearchableDropdownSelectEvent;
export type ContextSelectorProps = DropdownProps;

export interface ContextResolver {
  searchQuery: (queryString: string) => Promise<ContextResult> | ContextResult;
  initialResult?: ContextResult;
  closeHandler?: (e: MouseEvent) => void;
}

export type ContextProviderProps = {
  resolver?: ContextResolver;
};
