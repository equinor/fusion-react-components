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
  argTypes: {
    resolveId: {
      control: 'text',
      description: 'The id used to resolve the person, e.g. azureId or upn', 
      type: { name: 'string' }
    },
    dataSource: {
      control: 'object',
      description: 'The person data to use for the card. If provided with valid avatarUrl, the avatar will not resolve the person.',
      type: { name: 'symbol' }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the card. small, medium or large.',
      type: { name: 'string' },
      defaultValue: 'medium',
    },
    azureId: { control: 'text', description: '@deprecated: Use resolveId instead. The azureId of the person to resolve', type: { name: 'string' } },
    upn: { control: 'text', description: '@deprecated: Use resolveId instead. The UPN of the person to resolve', type: { name: 'string' } },
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
  args: {
    resolveId: faker.string.uuid(),
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
