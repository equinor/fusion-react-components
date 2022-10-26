import * as faker from 'faker';
import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvailability,
  PersonAccountType,
  PersonCard,
  AvatarSize,
  PersonCardProps,
} from '@equinor/fusion-react-person/src';

export default {
  title: 'Examples/Person/Person Card',
  component: PersonCard,
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

export type CardProps = PersonCardProps & {
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
      pictureSrc: 'https://prod-images.tcm.com/Master-Profile-Images/BurtReynolds.jpg?w=824',
      accountType,
      company: faker.company.companyName(),
      mail: faker.internet.email(),
      department: faker.commerce.department(),
      jobTitle: faker.name.jobTitle(),
      mobilePhone: faker.phone.phoneNumber('+48 ## ## ## ##'),
      name: [faker.name.firstName(), faker.name.middleName(), faker.name.lastName()].join(' '),
      officeLocation: faker.address.cityName(),
    };
  },
});

export const Component: Story<CardProps> = ({ accountType, availability, ...props }: CardProps) => (
  <PersonProvider resolve={createResolve(accountType, availability)}>
    <PersonCard {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  size: AvatarSize.Medium,
  availability: PersonAvailability.Available,
  accountType: PersonAccountType.Employee,
};

export const Size: Story<{ sizes: Array<CardProps['size']> }> = (props: { sizes: Array<CardProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.JointVentureAffiliate, PersonAvailability.Away)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      {props.sizes.map((size) => (
        <div key={size}>
          <PersonCard size={size} azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
        </div>
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: [AvatarSize.Large, AvatarSize.Medium, AvatarSize.Small, AvatarSize.XSmall] };
