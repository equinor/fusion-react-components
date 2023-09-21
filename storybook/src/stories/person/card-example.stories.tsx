import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAccountType,
  PersonCard,
  PersonCardProps,
  CardData,
  PersonDetails,
} from '@equinor/fusion-react-person/src';
import { createResolve } from './resolve-mock/PersonResolve';

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
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'PersonItemSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    maxWidth: {
      description: 'Maximum width of the component (px)',
      type: { name: 'number' },
      defaultValue: 300,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300px' },
      },
    },
    contentHeight: {
      description: 'Height of content (px)',
      type: { name: 'number' },
      defaultValue: 150,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '150px' },
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
  accountType: PersonAccountType;
};

export const Component: Story<CardProps> = ({ accountType, ...props }: CardProps) => (
  <PersonProvider personResolver={createResolve}>
    <PersonCard {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
  size: 'medium',
  accountType: PersonAccountType.Employee,
};

export const Size: Story<{ sizes: Array<CardProps['size']> }> = (props: { sizes: Array<CardProps['size']> }) => (
  <PersonProvider personResolver={createResolve}>
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 30 }}>
      {props.sizes.map((size) => (
        <div key={size}>
          <PersonCard size={size} azureId="1234" />
        </div>
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: ['small', 'medium', 'large'] };

export const DataSource: Story<CardProps> = (props: CardProps) => (
  <PersonProvider personResolver={createResolve}>
    <PersonCard {...props} azureId='9876-5432-1098' dataSource={{
      azureId: '9876-5432-1098',
      name: 'Rick Sanchez (C-137)',
      accountType: PersonAccountType.ExternalHire,
      jobTitle: 'Scientist',
      mail: 'rick.sanchez@email.com',
      mobilePhone: '+47 123456789',
      managerAzureUniqueId: '222-333-444',
      manager: {
        azureUniqueId: '222-333-444',
        name: 'Justin Roiland',
        department: 'Adult Swim',
        pictureSrc:
          'https://i.imgur.com/2TO7k63.jpeg',
        accountType: PersonAccountType.Employee,
      },
      positions: [
        {
          id: '123-123',
          name: 'Wubba Lubba Dub Dub',
          project: {
            id: '1234-1234',
            name: 'The Citadel',
          },
        },
      ],
    }} />
  </PersonProvider>
);
DataSource.args = {
  size: 'medium',
};
