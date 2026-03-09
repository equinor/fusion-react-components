/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonCell, type PersonCellData, PersonProvider } from '@equinor/fusion-react-person';
import { Theme } from '../../components/Theme';
import { resolver } from './person-resolver';

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
  argTypes: {
    resolveId: { control: 'text', description: 'The id used to resolve the person, e.g. azureId or upn', type: { name: 'string' } },
    dataSource: { control: 'object', description: 'The person data to use for the cell. If provided with valid avatarUrl, the cell will not resolve the person.', type: { name: 'symbol' } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the cell. small, medium or large.',
      type: { name: 'string' },
      defaultValue: 'medium',
    },
    heading: { description: 'A function that takes the resolved person data and returns a string or HTML to display as the heading of the cell.', type: { name: 'function' } },
    subHeading: { description: 'A function that takes the resolved person data and returns a string or HTML to display as the subheading of the cell.', type: { name: 'function' } },
    showAvatar: { control: 'boolean', description: 'Whether to show the avatar in the cell. The avatar will be shown if showAvatar is true and the resolved person data has a valid avatarUrl.', type: { name: 'boolean' }, defaultValue: false },
    azureId: { control: 'text', description: '@deprecated: Use resolveId instead. The azureId of the person to resolve', type: { name: 'string' } },
    upn: { control: 'text', description: '@deprecated: Use resolveId instead. The UPN of the person to resolve', type: { name: 'string' } },
  },
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
    resolveId: faker.string.uuid(),
    heading: (person: PersonCellData) => person.name ?? person.applicationName ?? person.azureId,
    subHeading: (person: PersonCellData) => person.jobTitle ?? person.department ?? person.servicePrincipalType ?? person.azureId,
  },
  render: (props) => {
    return <PersonCell {...props} />;
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
    heading: (person: PersonCellData) => {
      if (person.applicationId) {
        return `<b>${person.applicationName}</b> (App)`;
      }
      return `<b>${person.jobTitle}</b>`;
    },
    subHeading: (person: PersonCellData) => {
      if (person.applicationId) {
        return `<b>${person.applicationId}</b> (App)`;
      }
      if (!person.mail) {
        return person.azureId;
      }
      return `<a href=mailto:${person.mail}>${person.mail}</a>`;
    },
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
          subHeading={(person: PersonCellData) => person.jobTitle ?? person.azureId}
          showAvatar
        />
      ))}
    </div>
  ),
};
