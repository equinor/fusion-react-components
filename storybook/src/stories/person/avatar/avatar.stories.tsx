/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react';

import { PersonAvatar } from '@equinor/fusion-react-person/src/PersonAvatar';
import { AvatarSize, AvatarData } from '@equinor/fusion-react-person/src/index';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../../components/Theme';

import { resolver } from '../person-provider';

import { faker } from '@faker-js/faker';
import { Story } from '@storybook/blocks';
faker.seed(123);

const meta: Meta<typeof PersonAvatar> = {
  title: 'person/Avatar',
  component: PersonAvatar,
};

export default meta;

type Story = StoryObj<typeof PersonAvatar>;

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
      {Object.values(AvatarSize).map((size) => (
        <PersonAvatar key={size} {...props} size={size} />
      ))}
    </div>
  ),
};

const person: AvatarData = resolver.getInfo
  ? (resolver.getInfo({ azureId: faker.string.uuid() }) as AvatarData)
  : {
      name: faker.person.fullName(),
      accountType: 'Employee',
      accountClassification: 'Internal',
    };

export const withDataSource: Story = {
  ...basic,
  args: {
    dataSource: {
      name: person.name,
      accountType: person.accountType,
      accountClassification: person.accountClassification,
    },
    trigger: 'none',
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
