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
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={resolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],
  args: {
    people: [],
    resolveIds: [],
    placeholder: 'Search for people...',
    subtitle: 'department',
    secondarySubtitle: 'jobTitle',
    noResultTitle: 'No people found',
    noResultSubtitle: 'Try adjusting your search criteria.',
    multiple: true,
    showSelectedPeople: true,
    onPersonAdded: (e) => console.log('Person added:', e.detail),
    onPersonRemoved: (e) => console.log('Person removed:', e.detail),
    onSelectionChanged: (e) => console.log('Selection changed:', e.detail),
  },
};

export const singleSelection: Story = {
  ...basic,
  args: {
    multiple: false,
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
