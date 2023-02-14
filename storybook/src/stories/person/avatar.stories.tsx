import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvatar,
  AvatarSize,
  PersonAvailability,
  PersonAccountType,
} from '@equinor/fusion-react-person/src';
import type { PersonAvatarProps } from '@equinor/fusion-react-person/src';

export default {
  title: 'Examples/Person/Person Avatar',
  component: PersonAvatar,
  argTypes: {
    azureId: {
      description: 'Unique person Azure ID',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      description: 'Size of avatar',
      control: 'radio',
      options: AvatarSize,
      table: {
        type: { summary: 'AvatarSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    clickable: {
      description: 'Is avatar clickable?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Is avatar disabled?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    availability: {
      description: 'Availability of the person',
      control: 'select',
      options: PersonAvailability,
      table: {
        type: { summary: 'PersonAvailability' },
      },
    },
    accountType: {
      description: 'Employment type of the person',
      control: 'select',
      options: PersonAccountType,
      table: {
        type: { summary: 'PersonAccountType' },
      },
    },
  },
} as Meta;

export type AvatarProps = PersonAvatarProps & {
  availability?: PersonAvailability;
  accountType: PersonAccountType;
};

const createResolve = (accountType: PersonAccountType, availability?: PersonAvailability) => ({
  getPresence: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      azureId,
      availability: availability ?? PersonAvailability.Offline,
    };
  },
  getDetails: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      azureId,
      accountType,
      pictureSrc: 'https://prod-images.tcm.com/Master-Profile-Images/BurtReynolds.jpg',
    };
  },
});

export const Component: Story<AvatarProps> = ({ accountType, availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(accountType, availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  size: AvatarSize.Medium,
  clickable: false,
  disabled: false,
  availability: PersonAvailability.Available,
  accountType: PersonAccountType.Employee,
};

export const Size: Story<{ sizes: Array<AvatarProps['size']> }> = (props: { sizes: Array<AvatarProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee, PersonAvailability.DoNotDisturb)}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      {props.sizes.map((size) => (
        <PersonAvatar key={size} size={size} azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: [AvatarSize.Large, AvatarSize.Medium, AvatarSize.Small, AvatarSize.XSmall] };

export const Clickable: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee, availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Clickable.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  clickable: true,
  availability: PersonAvailability.Away,
};

export const Disabled: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.XExternal, availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Disabled.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  disabled: true,
  availability: PersonAvailability.DoNotDisturb,
};
