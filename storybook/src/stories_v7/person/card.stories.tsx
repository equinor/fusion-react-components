import { Meta, StoryObj } from '@storybook/react';

import { PersonCard, type PersonCardProps } from '@equinor/fusion-react-person/src/PersonCard';
import { type PersonItemSize } from '@equinor/fusion-react-person/src/index';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';

import { resolver } from './person-provider';

const meta: Meta<PersonCardProps> = {
  title: 'person/Card',
  component: PersonCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

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
    azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
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
    dataSource: resolver.getDetails({ azureId: '94d83327-93fd-4340-9120-3f1fa90d41fe' }),
  },
};
