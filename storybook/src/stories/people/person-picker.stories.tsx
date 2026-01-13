import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider } from '@equinor/fusion-react-person';
import { resolver, generateIds, generatePerson } from '../person/person-resolver';

import { PersonPicker } from '@equinor/fusion-react-people';
import { Theme } from '../../components/Theme';

import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PersonPicker> = {
  title: 'people/PersonPicker',
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
