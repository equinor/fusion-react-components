import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider, PeopleViewer, PeoplePicker, type PeopleViewerProps, type PersonInfo, PersonRemovedEvent, PersonAddedEvent, SelectionChangedEvent } from '@equinor/fusion-react-person';

import { resolver, generateIds, generatePerson } from '../person-resolver';
import { Theme } from '../../../components/Theme';
import { useCallback, useState } from 'react';

faker.seed(123);

const meta: Meta<typeof PeopleViewer> = {
  title: 'person/people/PeopleViewer',
  component: PeopleViewer,
};

export default meta;

type Story = StoryObj<typeof PeopleViewer>;

export const basic: Story = {
  argTypes: {
    resolveIds: { control: 'object', description: 'An array of ids to resolve and display in the viewer. The ids can be azureId or upn.', type: { name: 'symbol' } },
    people: { control: 'object', description: 'The people to display in the viewer. Should be of type PersonInfo', type: { name: 'symbol' } },
    display: {
      control: 'select',
      options: ['list', 'table'],
      description: 'The display mode of the viewer. list or table.',
      type: { name: 'string' },
    },
    displayToggle: { control: 'boolean', description: 'Whether to show the display mode toggle button.', type: { name: 'boolean' }, defaultValue: true },
    tableColumns: {
      control: 'object',
      description: 'The columns to show in table view. Should be an array of strings with the available properties: \'avatar\', \'name\', \'azureId\', \'type\', \'email\', \'mobilePhone\', \'jobTitle\', \'department\', \'manager\', \'remove\'.',
    },
    onPersonAdded: { description: 'Event fired when a person is added to the selection. The event detail will contain the added person of type PersonInfo.', table: { category: 'events' } },
    onPersonRemoved: { description: 'Event fired when a person is removed from the selection. The event detail will contain the removed person of type PersonInfo.', table: { category: 'events' } },
    onSelectionChanged: { description: 'Event fired when the selection changes. The event detail will contain an array of the currently selected people of type PersonInfo[]', table: { category: 'events' } }
  },
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

export const fixedTableView: Story = {
  ...basic,
  args: {
    display: 'table',
    displayToggle: false,
    resolveIds: generateIds(1, 10),
  }
};

export const resolveIds: Story = {
  ...basic,
  args: {
    resolveIds: generateIds(1, 10),
  },
  render: (args) => {
    return (
      <>
        <h3>PeopleViewer with resolveIds</h3>
        <p>PeopleViewer with resolveIds prop. The PeopleViewer will resolve the ids to person info and render them.</p>
        <p><strong>Note:</strong> The ids will only get resolved at mount.</p>
        <p>For each resolved person the viewer will dispatch the <code>onPersonAdded</code> event.</p>
        <p>When all persons are resolved, the viewer will dispatch the <code>onSelectionChanged</code> event.</p>
        <PeopleViewer {...args} />
      </>
    );
  },
};

export const people: Story = {
  ...basic,
  loaders: [async () => {
    return {
      people: await Promise.all(generateIds(1, 10).map(async (id) => await generatePerson({ azureId: id }))),
    };
  }],
  render: (args, { loaded: { people } }) => {
    return (
      <>
        <h3>PeopleViewer with people</h3>
        <p>PeopleViewer with people prop. The PeopleViewer will render the provided people.</p>
        <p>If you combine <code>people</code> with <code>resolveIds</code>, be sure to update the selected people state with the <code>onPersonAdded</code> or <code>onSelectionChanged</code> event handler.</p>
        <PeopleViewer people={people} {...args} />
      </>
    );
  },
};

const CombinedWithPeoplePicker = (args: PeopleViewerProps) => {
  const [people, setPeople] = useState<PersonInfo[]>([]);

  const handlePersonAdded = useCallback((e: PersonAddedEvent) => {
    setPeople((prev) => [...prev, e.detail]);
  }, []);

  const handleSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    setPeople(e.detail);
  }, []);
  
  const handlePersonRemoved = useCallback((e: PersonRemovedEvent) => {
    setPeople((prev) => prev.filter((p) => p.azureId !== e.detail.azureId));
  }, []);

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
