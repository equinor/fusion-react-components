import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider } from '@equinor/fusion-react-person';
import { PeopleViewer, PeoplePicker, type PeopleViewerProps, type PersonInfo, PersonRemovedEvent, PersonAddedEvent, SelectionChangedEvent } from '@equinor/fusion-react-people';

import { resolver, generateIds, generatePerson } from '../person/person-resolver';
import { Theme } from '../../components/Theme';
import { useCallback, useEffect, useState } from 'react';

faker.seed(123);

const meta: Meta<typeof PeopleViewer> = {
  title: 'people/PeopleViewer',
  component: PeopleViewer,
};

export default meta;

type Story = StoryObj<typeof PeopleViewer>;

export const basic: Story = {
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={resolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],
};

export const tableView: Story = {
  ...basic,
  args: {
    viewMode: 'table',
    showViewMode: false,
    resolveIds: generateIds(1, 10),
  }
};

export const resolveIds: Story = {
  ...basic,
  args: {
    resolveIds: generateIds(1, 10),
  }
};

export const people: Story = {
  ...basic,
  loaders: [async () => {
    return {
      people: await Promise.all(generateIds(1, 10).map(async (id) => await generatePerson({ azureId: id }))),
    };
  }],
  render: (args, { loaded: { people } }) => <PeopleViewer people={people} {...args} />,
};

const CombinedWithPeoplePicker = (args: PeopleViewerProps) => {
  const [people, setPeople] = useState<PersonInfo[]>([]);

  const handlePersonAdded = useCallback((e: PersonAddedEvent) => {
    setPeople((prev) => [...prev, e.detail]);
  }, [people]);

  const handleSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    setPeople(e.detail);
  }, []);
  
  const handlePersonRemoved = useCallback((e: PersonRemovedEvent) => {
    setPeople(people.filter((p) => p.azureId !== e.detail.azureId));
  }, [people]);

  useEffect(() => {
    console.log('people::updated', people);
  }, [people]);

  return (
    <>
      <PeoplePicker multiple={false} showSelectedPeople={false} onPersonAdded={handlePersonAdded} onPersonRemoved={handlePersonRemoved} style={{ marginBottom: '3em' }} />
      <PeopleViewer people={people} onSelectionChanged={handleSelectionChanged} {...args} />
    </>
  );
}

export const combinedWithPeoplePicker: Story = {
  ...basic,
  args: {
    resolveIds: generateIds(1, 10),
  },
  render: (args) => <CombinedWithPeoplePicker {...args} />,
};
