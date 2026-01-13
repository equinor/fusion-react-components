// export components
export { PersonAvatar } from './PersonAvatar';
export { PersonCard } from './PersonCard';
export { PersonListItem } from './PersonListItem';
export { PersonCell } from './PersonCell';
export { PersonSelect } from './PersonSelect';
export { PersonProvider } from './PersonProvider';
// export enum
export { AvatarSize } from './PersonAvatar';
export { PersonAvailability, PersonAccountType } from '@equinor/fusion-wc-person';
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
} from '@equinor/fusion-wc-person';
