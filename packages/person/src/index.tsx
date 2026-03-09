// export components
export { PersonAvatar } from './PersonAvatar';
export { PersonCard } from './PersonCard';
export { PersonListItem } from './PersonListItem';
export { PersonCell } from './PersonCell';
export { PersonSelect } from './PersonSelect';
export { PersonProvider } from './PersonProvider';
export { PeoplePicker } from './PeoplePicker';
export { PersonPicker } from './PersonPicker';
export { PeopleViewer } from './PeopleViewer';

// export enum
export {
  PersonAvailability,
  PersonAccountType,
  AvatarSize,
} from '@equinor/fusion-wc-person';

// export types
export type { AvatarData, PersonAvatarProps } from './PersonAvatar';
export type { CardData, PersonItemSize, PersonCardProps } from './PersonCard';
export type { ListItemData, PersonListItemProps } from './PersonListItem';
export type { PersonCellData, PersonCellProps } from './PersonCell';
export type { PersonSelectProps, PersonSelectEvent } from './PersonSelect';
export type { PersonResolver } from '@equinor/fusion-wc-person/provider';
export type {
  PersonDetails,
  PersonPresence,
  PersonPicture,
  PersonInfo,
  PersonSearchResult,
  PersonSuggestResult,
  PersonSuggestResultAccountType,
  PersonSuggestResultPersonAccountType,
} from '@equinor/fusion-wc-person';
export type { PeoplePickerProps } from './PeoplePicker';
export type { PersonPickerProps } from './PersonPicker';
export type { PeopleViewerProps } from './PeopleViewer';
export type {
  SelectionChangedEvent,
  PersonAddedEvent,
  PersonRemovedEvent,
} from '@equinor/fusion-wc-people';
