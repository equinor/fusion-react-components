import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvailability,
  PersonAccountType,
  PersonListItem,
  PersonListItemProps,
  ListItemData,
} from '@equinor/fusion-react-person/src';
import { IconButton } from '@equinor/fusion-react-button';
import { createResolve } from './PersonResolve';

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

export type ListItemProps = PersonListItemProps & {
  accountType: PersonAccountType;
};

export const Component: Story<ListItemProps> = ({ accountType, ...props }: ListItemProps) => (
  <PersonProvider resolve={createResolve(accountType)}>
    <PersonListItem {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  size: 'medium',
  accountType: PersonAccountType.Employee,
};

export const Clickable: Story<ListItemProps> = () => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem clickable azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
    </div>
  </PersonProvider>
);

export const Toolbar: Story<ListItemProps> = () => (
  <PersonProvider resolve={createResolve(PersonAccountType.External)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc">
        <IconButton color="primary" icon="account_circle" rounded size="small" />
        <IconButton color="secondary" icon="microsoft_outlook" rounded size="small" />
        <IconButton color="success" icon="whats_app" rounded size="small" />
      </PersonListItem>
    </div>
  </PersonProvider>
);

export const Size: Story<{ sizes: Array<ListItemProps['size']> }> = (props: { sizes: Array<ListItemProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.Enterprise)}>
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

export const DataSource: Story<ListItemProps> = () => (
  <PersonProvider resolve={createResolve(PersonAccountType.External)}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem dataSource={{
              name: 'Rick Sanchez (C-132)',
              pictureSrc: 'https://i.imgur.com/17Kw9my.jpg',
              accountType: PersonAccountType.ExternalHire,
              jobTitle: 'Scientist',
              mail: 'rick.sanchez@email.com',
              mobilePhone: '+47 123456789',
          } as ListItemData}>
        <IconButton color="primary" icon="account_circle" rounded size="small" />
      </PersonListItem>
    </div>
  </PersonProvider>
);
