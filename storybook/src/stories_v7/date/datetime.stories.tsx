import { Meta, StoryObj } from '@storybook/react';

import { DateTime, type DateTimeProps } from '@equinor/fusion-react-date/src/DateTime';

const meta: Meta<DateTimeProps> = {
  title: 'data/Date',
  component: DateTime,
};

export default meta;

type Story = StoryObj<DateTimeProps>;

export const date_time: Story = {
  name: 'DateTime',
  args: {
    date: new Date('2021-09-21T13:18:42.000Z'),
  },
  render: (args) => <DateTime {...args} />,
} satisfies Story;
