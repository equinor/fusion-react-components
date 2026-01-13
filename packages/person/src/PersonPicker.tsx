import type { ReactElement } from 'react';
import { PeoplePicker, type PeoplePickerProps } from './PeoplePicker';
import type { PersonInfo } from '.';

export type PersonPickerProps = Omit<PeoplePickerProps, 'multiple' | 'resolveIds' | 'people'> & {
  resolveId?: string;
  person?: PersonInfo;
};

export const PersonPicker = ({
  children,
  resolveId,
  person,
  ...props
}: PersonPickerProps): ReactElement => {
  const peoplePickerProps = props as PeoplePickerProps;

  // Set multiple to false
  peoplePickerProps.multiple = false;

  // Set resolveIds if resolveId is provided
  if (resolveId) {
    peoplePickerProps.resolveIds = [resolveId];
  }

  // Set people if person is provided
  if (person) {
    peoplePickerProps.people = [person];
  }

  // Return the PeoplePicker component with the props adapted to PersonPicker usage
  return <PeoplePicker {...peoplePickerProps}>{children}</PeoplePicker>;
};

export default PersonPicker;
