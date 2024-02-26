/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react';

import { PersonAvatar, type PersonAvatarProps } from '@equinor/fusion-react-person/src/PersonAvatar';
import { PersonAccountType, AvatarSize } from '@equinor/fusion-react-person/src/index';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';

import { resolver } from './person-provider';

const meta: Meta<PersonAvatarProps> = {
  title: 'person/Avatar',
  component: PersonAvatar,
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
      {Object.values(AvatarSize).map((size) => (
        <PersonAvatar key={size} {...props} size={size} />
      ))}
    </div>
  ),
};

export const withDataSource: Story = {
  ...basic,
  args: {
    // @ts-expect-error
    dataSource: resolver.getInfo({ azureId: basic.args?.azureId }),
  },
};

export const clickable: Story = {
  ...basic,
  args: {
    ...basic.args,
    clickable: true,
  },
};

export const disableCard: Story = {
  ...basic,
  args: {
    ...basic.args,
    trigger: 'none',
  },
};

export const disabled: Story = {
  ...basic,
  args: {
    ...basic.args,
    disabled: true,
  },
};
