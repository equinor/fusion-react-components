import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider, PersonPicker } from '@equinor/fusion-react-person';
import { resolver, generateIds, generatePerson } from '../person-resolver';

import { Theme } from '../../../components/Theme';

import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PersonPicker> = {
  title: 'person/people/PersonPicker',
  component: PersonPicker,
};

export default meta;

type Story = StoryObj<typeof PersonPicker>;

export const basic: Story = {
  argTypes: {
    person: { control: 'object', description: 'The person to display in the picker. Should be of type PersonInfo', type: { name: 'symbol' } },
    resolveId: { control: 'text', description: 'The id to resolve and display in the picker as selected person. The id can be azureId or upn.', type: { name: 'string' } },
    showSelectedPeople: { control: 'boolean', description: 'Whether to show the selected people in the search results.', type: { name: 'boolean' } },
    placeholder: { control: 'text', description: 'The placeholder text to display in the input.', type: { name: 'string' } },
    subtitle: { control: 'text', description: 'The property of PersonInfo to display as subtitle in the pills and list of search results.', type: { name: 'string' } },
    secondarySubtitle: { control: 'text', description: 'The property of PersonInfo to display as secondary subtitle in the list of search results.', type: { name: 'string' } },
    noResultTitle: { control: 'text', description: 'The title to display when there are no search results.', type: { name: 'string' } },
    noResultSubtitle: { control: 'text', description: 'The subtitle to display when there are no search results.', type: { name: 'string' } },
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

export const hideSelectedPeople: Story = {
  ...basic,
  args: {
    showSelectedPeople: false,
  },
}

export const CustomNoResultTitle: Story = {
  ...basic,
  args: {
    noResultTitle: '*swishes hand*',
    noResultSubtitle: 'These are not the people you are looking for...',
  },
  render: (args) => {
    return (
      <>
        <h3>Custom No Result Title</h3>
        <p>The resolver will fail 10% of the time, so keep searching to see the effect.</p>
        <PersonPicker {...args} />
      </>
    );
  },
};

export const resolveId: Story = {
  ...basic,
  args: {
    resolveId: generateIds(1, 1)[0],
  }
};

export const person: Story = {
  ...basic,
  loaders: [async () => {
    return {
      person: await generatePerson({ azureId: generateIds(1, 1)[0] }),
    };
  }],
  render: (args, { loaded: { person } }) => <PersonPicker person={person} {...args} />,
};
