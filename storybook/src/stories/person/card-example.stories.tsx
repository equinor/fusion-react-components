import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAccountType,
  PersonCard,
  PersonCardProps,
  CardData,
} from '@equinor/fusion-react-person/src';
import { createResolve } from './PersonResolve';

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
  <PersonProvider resolve={createResolve(accountType)}>
    <PersonCard {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '1234-5678',
  size: 'medium',
  accountType: PersonAccountType.Employee,
};

export const Size: Story<{ sizes: Array<CardProps['size']> }> = (props: { sizes: Array<CardProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAccountType.Employee)}>
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: 30 }}>
      {props.sizes.map((size) => (
        <div key={size}>
          <PersonCard size={size} azureId="1234-5678" />
        </div>
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: ['small', 'medium', 'large'] };

export const DataSource: Story<CardProps> = (props: CardProps) => (
  <PersonProvider resolve={createResolve()}>
    <PersonCard {...props} dataSource={{
              name: 'Rick Sanchez (C-137)',
              pictureSrc: 'https://i.imgur.com/17Kw9my.jpg',
              accountType: PersonAccountType.Enterprise,
              jobTitle: 'Scientist',
              mail: 'rick.sanchez@email.com',
              mobilePhone: '+47 123456789',
              manager: {
                  azureUniqueId: '1234-1324-1235',
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
