import { Meta, StoryObj } from '@storybook/react-vite';

import { DateTime } from '@equinor/fusion-react-date/src/DateTime';

const meta: Meta<typeof DateTime> = {
  title: 'data/Date',
  component: DateTime,
};

export default meta;

type Story = StoryObj<typeof DateTime>;

export const date_time: Story = {
  name: 'DateTime',
  args: {
    date: new Date('2021-09-21T13:18:42.000Z'),
  },
  render: (args) => <DateTime {...args} />,
} satisfies Story;
