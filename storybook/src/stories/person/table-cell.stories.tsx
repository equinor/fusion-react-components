/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react';

import { PersonTableCell, TableCellData } from '@equinor/fusion-react-person/src/PersonTableCell';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';
import { resolver } from './person-provider';

import { faker } from '@faker-js/faker';
import { PersonItemSize } from '@equinor/fusion-react-person';
faker.seed(123);

const meta: Meta<typeof PersonTableCell> = {
  title: 'person/Table Cell',
  component: PersonTableCell,
};

export default meta;

type Story = StoryObj<typeof PersonTableCell>;

export const basic: Story = {
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
    azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
  },
  render: (props) => {
    return <PersonTableCell {...props} size="medium" />;
  },
};

export const showAvatar: Story = {
  ...basic,
  args: {
    ...basic.args,
    showAvatar: true,
  },
  render: (props) => <PersonTableCell {...props} subHeading={(person: TableCellData) => person.mail} showAvatar />,
};

export const customHeading: Story = {
  ...basic,
  args: {
    ...showAvatar.args,
    heading: (person: TableCellData) => `<b>${person.jobTitle}</b>`,
    subHeading: (person: TableCellData) => `<a href=mailto:${person.mail}>${person.mail}</a>`,
  },
  render: (props) => <PersonTableCell {...props} showAvatar />,
};

export const sizes: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
      {(['small', 'medium', 'large'] as PersonItemSize[]).map((size) => (
        <PersonTableCell
          key={size}
          {...props}
          size={size}
          subHeading={(person: TableCellData) => person.jobTitle}
          showAvatar
        />
      ))}
    </div>
  ),
};
