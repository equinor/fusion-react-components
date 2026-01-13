import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider } from '@equinor/fusion-react-person';
import { resolver, generateIds, generatePerson } from '../person/person-resolver';

import { PeoplePicker } from '@equinor/fusion-react-people';
import { Theme } from '../../components/Theme';


import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PeoplePicker> = {
  title: 'people/PeoplePicker',
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

export const resolveIds: Story = {
  ...basic,
  args: {
    resolveIds: generateIds(1, 10),
  }
};

export const people: Story = {
  decorators: basic.decorators,
  loaders: [async () => {
    return {
      people: await Promise.all(generateIds(1, 10).map(async (azureId) => await generatePerson({ azureId }))),
    };
  }],
  render: (args, { loaded: { people } }) => <PeoplePicker people={people} {...args} />,
};
