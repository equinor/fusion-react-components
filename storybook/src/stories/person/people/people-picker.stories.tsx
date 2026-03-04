import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider, PeoplePicker } from '@equinor/fusion-react-person';
import { resolver, generateIds, generatePerson } from '../person-resolver';

import { Theme } from '../../../components/Theme';


import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PeoplePicker> = {
  title: 'person/people/PeoplePicker',
  component: PeoplePicker,
};

export default meta;

type Story = StoryObj<typeof PeoplePicker>;

export const basic: Story = {
  argTypes: {
    people: { control: 'object', description: 'The people to display in the picker. Should be of type PersonInfo', type: { name: 'symbol' } },
    resolveIds: { control: 'object', description: 'An array of ids to resolve and display in the picker as selected people. The ids can be azureId or upn.', type: { name: 'symbol' } },
    placeholder: { control: 'text', description: 'The placeholder text to display in the input.', type: { name: 'string' } },
    subtitle: { control: 'text', description: 'The property of PersonInfo to display as subtitle in the pills and list of search results.', type: { name: 'string' } },
    secondarySubtitle: { control: 'text', description: 'The property of PersonInfo to display as secondary subtitle in the list of search results.', type: { name: 'string' } },
    noResultTitle: { control: 'text', description: 'The title to display when there are no search results.', type: { name: 'string' } },
    noResultSubtitle: { control: 'text', description: 'The subtitle to display when there are no search results.', type: { name: 'string' } },
    multiple: { control: 'boolean', description: 'Whether to allow multiple people to be selected.', type: { name: 'boolean' } },
    showSelectedPeople: { control: 'boolean', description: 'Whether to show the selected people in the search results.', type: { name: 'boolean' } },
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
    )
  ]
};

export const singleSelection: Story = {
  ...basic,
  args: {
    multiple: false,
  }
};

export const singleSelectionNoPill: Story = {
  ...basic,
  args: {
    multiple: false,
    showSelectedPeople: false,
  }
};

export const CustomNoResultTitle: Story = {
  ...basic,
  args: {
    noResultTitle: '*swishes hand*',
    noResultSubtitle: 'These are not the people you are looking for...',
  },
  render: (args) => {
    return (
      <>
        <h3>Custom no result title and subtitle</h3>
        <p>The resolver will return with empty results 10% of the time, so keep searching to see the effect.</p>
        <PeoplePicker {...args} />
      </>
    );
  },
};

export const resolveIds: Story = {
  ...basic,
  args: {
    resolveIds: generateIds(1, 10),
  },
  render: (args) => {
      return (
        <>
          <h3>PeoplePicker with resolveIds</h3>
          <p>PeoplePicker with resolveIds prop. The PeoplePicker will resolve the ids to person info and render them.</p>
          <p><strong>Note:</strong> The ids will only get resolved at mount.</p>
          <p>For each resolved person the picker will dispatch the <code>onPersonAdded</code> event.</p>
          <p>When all persons are resolved, the picker will dispatch the <code>onSelectionChanged</code> event.</p>
          <PeoplePicker {...args} />
        </>
      );
    },
};

export const people: Story = {
  decorators: basic.decorators,
  loaders: [async () => {
    return {
      people: await Promise.all(generateIds(1, 10).map(async (azureId) => await generatePerson({ azureId }))),
    };
  }],
  render: (args, { loaded: { people } }) => {
    return (
      <>
        <h3>PeoplePicker with people</h3>
        <p>PeoplePicker with people prop. The PeoplePicker will render the provided people.</p>
        <p>The people prop will be the source of truth, so be sure to update the selected people state with the <code>onPersonAdded</code>, <code>onPersonRemoved</code> or <code>onSelectionChanged</code> event handler.</p>
        <PeoplePicker people={people} {...args} />
      </>
    );
  },
};
