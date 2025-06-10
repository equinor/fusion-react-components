import { Meta, StoryObj } from '@storybook/react-vite';

import { DateRange } from '@equinor/fusion-react-date/src/DateRange';

const meta: Meta<typeof DateRange> = {
  title: 'data/Date',
  component: DateRange,
};

export default meta;

type Story = StoryObj<typeof DateRange>;

export const date_range: Story = {
  name: 'DateRange',
  args: {
    from: new Date('2021-09-21T13:18:42.000Z'),
    to: new Date('2022-11-21T13:28:42.000Z'),
  },
  render: (props) => <DateRange {...props} />,
};
