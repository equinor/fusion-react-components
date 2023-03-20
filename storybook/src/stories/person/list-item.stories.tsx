import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvailability,
  PersonAccountType,
  PersonListItem,
  PersonListItemProps,
} from '@equinor/fusion-react-person/src';
import { IconButton, IconButtonColor } from '@equinor/fusion-react-button';
import { IconButtonSize } from '@equinor/fusion-wc-button';

export default {
  title: 'Examples/Person/Person List Item',
  component: PersonListItem,
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
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'PersonItemSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    clickable: {
      description: 'Make item clickable',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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

export type CardProps = PersonListItemProps & {
  availability?: PersonAvailability;
  accountType: PersonAccountType;
};

const createResolve = (accountType: PersonAccountType, availability?: PersonAvailability) => ({
  getPresence: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return {
      azureId,
      availability: availability ?? PersonAvailability.Offline,
    };
  },
  getDetails: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return {
      azureId: azureId,
      name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType,
      jobTitle: 'X-Bouvet ASA (PX)',
      department: 'FOIT CON PDP',
      mail: 'example@email.com',
      officeLocation: 'Stavanger',
      mobilePhone: '+47 999999999',
      manager: {
        azureId: '1234-1324-1235',
        name: 'Lagertha Kristensen',
        department: 'Leader Techn Mgmt',
        pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
        accountType: PersonAccountType.Employee,
      },
      positions: [
        {
          id: '123-123',
          name: 'Developer Frontend',
          project: {
            id: '1234-1234',
            name: 'Fusion',
          },
        },
        {
          id: '234-234',
          name: 'Developer Frontend',
          project: {
            id: '2345-2345',
            name: 'Fusion org v2',
          },
        },
      ],
    };
  },
});

export const Component: Story<CardProps> = ({ accountType, availability, ...props }: CardProps) => (
  <PersonProvider resolve={createResolve(accountType, availability)}>
    <PersonListItem {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  size: 'medium',
  availability: PersonAvailability.Available,
  accountType: PersonAccountType.Employee,
};

export const Clickable: Story<CardProps> = () => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee, PersonAvailability.Available)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem clickable azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
    </div>
  </PersonProvider>
);

export const Toolbar: Story<CardProps> = () => (
  <PersonProvider resolve={createResolve(PersonAccountType.XExternal, PersonAvailability.Available)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc">
        <IconButton color={IconButtonColor.Primary} icon="account_circle" rounded size={IconButtonSize.Small} />
        <IconButton color={IconButtonColor.Secondary} icon="microsoft_outlook" rounded size={IconButtonSize.Small} />
        <IconButton color={IconButtonColor.Success} icon="whats_app" rounded size={IconButtonSize.Small} />
      </PersonListItem>
    </div>
  </PersonProvider>
);

export const Size: Story<{ sizes: Array<CardProps['size']> }> = (props: { sizes: Array<CardProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.JointVentureAffiliate, PersonAvailability.Away)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      {props.sizes.map((size) => (
        <div key={size}>
          <PersonListItem size={size} azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
        </div>
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: ['small', 'medium', 'large'] };
