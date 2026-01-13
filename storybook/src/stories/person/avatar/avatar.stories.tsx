/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PersonAvatar, PersonProvider } from '@equinor/fusion-react-person';
import { type AvatarSize } from '@equinor/fusion-react-person';
import { Theme } from '../../../components/Theme';

import { generatePerson, resolver } from '../person-resolver';

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
      {(['small', 'medium', 'large'] as AvatarSize[]).map((size) => (
        <PersonAvatar key={size} {...props} size={size} />
      ))}
    </div>
  ),
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

export const withDataSource: AvatarStory = {
  decorators: basic.decorators,
  loaders: [async () => {
    return {
      dataSource: await generatePerson({ azureId: faker.string.uuid() }),
    };
  }],
  render: (args, { loaded: { dataSource } }) => <PersonAvatar {...args} dataSource={dataSource} />,
};
