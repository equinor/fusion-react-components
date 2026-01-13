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
