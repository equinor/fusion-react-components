import {
  SearchableDropdownResolver,
  SearchableDropdownResult,
  SearchableDropdownResultItem,
  SearchableDropdownSelectEvent,
} from '@equinor/fusion-react-searchable-dropdown';

export type ContextResult = SearchableDropdownResult;
export type ContextResultItem = SearchableDropdownResultItem;
export type ContextResolver = SearchableDropdownResolver;
export type ContextSelectEvent = SearchableDropdownSelectEvent;

export * from './ContextProvider';
export * from './ContextSelector';

export { ContextSelector as default } from './ContextSelector';
