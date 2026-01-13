/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonAvatar } from '@equinor/fusion-react-person/src/PersonAvatar';
import { AvatarSize, type AvatarData } from '@equinor/fusion-react-person/src/index';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../../components/Theme';

import { resolver } from '../person-resolver';

import { faker } from '@faker-js/faker';
faker.seed(123);

const meta: Meta<typeof PersonAvatar> = {
  title: 'person/Avatar',
  component: PersonAvatar,
};

export default meta;

type AvatarStory = StoryObj<typeof PersonAvatar>;

export const basic: AvatarStory = {
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

export const sizes: AvatarStory = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 30 }}>
      {Object.values(AvatarSize).map((size) => (
        <PersonAvatar key={size} {...props} size={size} />
      ))}
    </div>
  ),
};

export const letter: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    showLetter: true,
  },
};

const person: AvatarData = resolver.getInfo
  ? (resolver.getInfo({ azureId: faker.string.uuid() }) as AvatarData)
  : {
      name: faker.person.fullName(),
      accountType: 'Employee',
      accountClassification: 'Internal',
    };

export const withDataSource: AvatarStory = {
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

export const clickable: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    clickable: true,
  },
};

export const disableCard: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    trigger: 'none',
  },
};

export const disabled: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    disabled: true,
  },
};
