import { Meta, StoryObj } from '@storybook/react';

import { DateRange, type DateRangeProps } from '@equinor/fusion-react-date/src/DateRange';

const meta: Meta<DateRangeProps> = {
  title: 'data/Date',
  component: DateRange,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const date_range: Story = {
  name: 'DateRange',
  args: {
    from: new Date('2021-09-21T13:18:42.000Z'),
    to: new Date('2022-11-21T13:28:42.000Z'),
  },
  render: (props) => <DateRange {...props} />,
};
