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
import { createResolve } from './resolve-mock/PersonResolve';

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
  <PersonProvider personResolver={createResolve}>
    <PersonListItem {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '1234',
  size: 'medium',
  accountType: PersonAccountType.Employee,
};

export const Clickable: Story<ListItemProps> = () => (
  <PersonProvider personResolver={createResolve}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem clickable azureId="1234" />
    </div>
  </PersonProvider>
);

export const Toolbar: Story<ListItemProps> = () => (
  <PersonProvider personResolver={createResolve}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem azureId="1234">
        <IconButton color="primary" icon="account_circle" rounded size="small" />
        <IconButton color="secondary" icon="microsoft_outlook" rounded size="small" />
        <IconButton color="success" icon="whats_app" rounded size="small" />
      </PersonListItem>
    </div>
  </PersonProvider>
);

export const Size: Story<{ sizes: Array<ListItemProps['size']> }> = (props: { sizes: Array<ListItemProps['size']> }) => (
  <PersonProvider personResolver={createResolve}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      {props.sizes.map((size) => (
        <div key={size}>
          <PersonListItem size={size} azureId="49132c24-6ea4-41fe-8221-112f314573f0" />
        </div>
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: ['small', 'medium', 'large'] };

export const DataSource: Story<ListItemProps> = () => (
  <PersonProvider personResolver={createResolve}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 30 }}>
      <PersonListItem azureId='9876-5432-1098' dataSource={{
        azureId: '9876-5432-1098',
        name: 'Rick Sanchez (C-132)',
        accountType: PersonAccountType.ExternalHire,
        jobTitle: 'Scientist',
        mail: 'rick.sanchez@email.com',
        mobilePhone: '+47 123456789',
      }}>
        <IconButton color="primary" icon="account_circle" rounded size="small" />
      </PersonListItem>
    </div>
  </PersonProvider>
);
