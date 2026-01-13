import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonCard, PersonProvider } from '@equinor/fusion-react-person';
import type { PersonDetails, PersonItemSize } from '@equinor/fusion-react-person';
import { Theme } from '../../components/Theme';

import { resolver } from './person-resolver';

import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PersonCard> = {
  title: 'person/Card',
  component: PersonCard,
};

export default meta;

type Story = StoryObj<typeof PersonCard>;

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
    azureId: faker.string.uuid(),
  },
};

export const sizes: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 30 }}>
      {(['small', 'medium', 'large'] as PersonItemSize[]).map((size) => (
        <PersonCard key={size} {...props} size={size} />
      ))}
    </div>
  ),
};

export const withDataSource: Story = {
  ...basic,
  args: {
    dataSource: resolver.getDetails
      ? (resolver.getDetails({ azureId: faker.string.uuid() }) as PersonDetails)
      : undefined,
  },
};
