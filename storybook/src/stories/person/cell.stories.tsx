/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonCell, PersonCellData } from '@equinor/fusion-react-person/src/PersonCell';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';
import { resolver } from './person-provider';

import { faker } from '@faker-js/faker';
import { PersonItemSize } from '@equinor/fusion-react-person';
faker.seed(123);

const meta: Meta<typeof PersonCell> = {
  title: 'person/Cell',
  component: PersonCell,
};

export default meta;

type Story = StoryObj<typeof PersonCell>;

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
    return <PersonCell {...props} size="medium" />;
  },
};

export const showAvatar: Story = {
  ...basic,
  args: {
    ...basic.args,
    showAvatar: true,
  },
  render: (props) => <PersonCell {...props} subHeading={(person: PersonCellData) => person.mail} showAvatar />,
};

export const customHeading: Story = {
  ...basic,
  args: {
    ...showAvatar.args,
    heading: (person: PersonCellData) => `<b>${person.jobTitle}</b>`,
    subHeading: (person: PersonCellData) => `<a href=mailto:${person.mail}>${person.mail}</a>`,
  },
  render: (props) => <PersonCell {...props} showAvatar />,
};

export const sizes: Story = {
  ...basic,
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
      {(['small', 'medium', 'large'] as PersonItemSize[]).map((size) => (
        <PersonCell
          key={size}
          {...props}
          size={size}
          subHeading={(person: PersonCellData) => person.jobTitle}
          showAvatar
        />
      ))}
    </div>
  ),
};
