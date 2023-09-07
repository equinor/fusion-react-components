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
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
    },
    upn: {
      description: 'Unique person email address',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
    },
    dataSource: {
      description: 'Custom data for avatar',
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
    showFloatingOn: {
      description: 'Employment type of the person',
      control: 'radio',
      options: ["click", "hover"],
      table: {
        type: { summary: '"click","hover"' },
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
  getImageByAzureId: async (azureId: string) => {
    await new Promise((resovle) => setTimeout(resovle, 3000));
    return await Promise.resolve({
      azureId: azureId,
      name: 'Albert Einstein',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType: PersonAccountType.Employee,
    });
  },
  getImageByUpn: async (_upn: string) => {
    await new Promise((resovle) => setTimeout(resovle, 3000));
    return await Promise.resolve({
      name: 'Albert Einstein',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType,
    });
  },
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
  azureId: '1234',
  size: AvatarSize.Medium,
  clickable: false,
  disabled: false,
  availability: PersonAvailability.Available,
  accountType: PersonAccountType.Employee,
};

export const DataSource: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.External, availability)}>
    <PersonAvatar
      {...props}
      dataSource={{
        pictureSrc: 'https://prod-images.tcm.com/Master-Profile-Images/BurtReynolds.jpg',
        name: 'Tux Penguin',
      }}
    />
  </PersonProvider>
);

export const Size: Story<{ sizes: Array<AvatarProps['size']> }> = (props: { sizes: Array<AvatarProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee, PersonAvailability.DoNotDisturb)}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      {props.sizes.map((size) => (
        <PersonAvatar key={size} size={size} upn="mail@mail.com" />
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
  azureId: '1234',
  clickable: true,
  availability: PersonAvailability.Away,
};

export const CardOnHover: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.External, availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
CardOnHover.args = {
  azureId: '1234',
  clickable: true,
  showFloatingOn: "hover"
};

export const CardOnClick: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.External, availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
CardOnClick.args = {
  azureId: '1234',
  clickable: true,
  showFloatingOn: "click"
};

export const Disabled: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(PersonAccountType.External, availability)}>
    <div>
      <PersonAvatar {...props} />
    </div>
  </PersonProvider>
);
Disabled.args = {
  azureId: '1234',
  disabled: true,
  availability: PersonAvailability.DoNotDisturb,
};
