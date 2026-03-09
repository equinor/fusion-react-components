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
  argTypes: {
    resolveId: { control: 'text', description: 'The id used to resolve the person, e.g. azureId or upn', type: { name: 'string' } },
    dataSource: { control: 'object', description: 'The person data to use for the avatar. If provided with valid avatarUrl, the avatar will not resolve the person.', type: { name: 'symbol' } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the avatar. "small" is 31x31px, "medium" is 56x56px, "large" is 80x80px.',
      type: { name: 'string' },
      defaultValue: 'medium',
    },
    disabled: { control: 'boolean', description: 'Whether the avatar is disabled. A disabled avatar will not trigger a person card and have a disabled style.', type: { name: 'boolean' }, defaultValue: false },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'none'],
      description: 'The trigger action when clicking the avatar. "hover" will show a person card on hover, "click" will show a person card on click, "none" will do nothing.',
      defaultValue: 'hover',
    },
    azureId: { control: 'text', description: '@deprecated: Use resolveId instead. The azureId of the person to resolve', type: { name: 'string' } },
    upn: { control: 'text', description: '@deprecated: Use resolveId instead. The UPN of the person to resolve', type: { name: 'string' } },
    pictureSrc: { control: 'text', description: '@deprecated: Not in use', type: { name: 'string' } },
    showLetter: { control: 'boolean', description: '@deprecated: Not in use', type: { name: 'boolean' } },
    clickable: { control: 'boolean', description: '@deprecated: Not in use.', type: { name: 'boolean' } },
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

export const TriggerClick: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    trigger: 'click',
  },
};

export const TriggerNone: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    trigger: 'none',
  },
};

export const Disabled: AvatarStory = {
  ...basic,
  args: {
    ...basic.args,
    disabled: true,
  },
  render: (args) => (
    <>
      <h3>Disabled Avatar</h3>
      <p>A disabled avatar will not trigger a person card and have a disabled style.</p>
      <PersonAvatar {...args} />
    </>
  ),
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
