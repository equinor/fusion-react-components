import { FusionDatePicker, FusionDatePickerProps } from '@equinor/fusion-react-datepicker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

export default {
  title: 'DatePicker/Stories',
  component: FusionDatePicker,
} as Meta;

const Template: Story<FusionDatePickerProps> = (args) => {
  const [date, setDate] = useState<Date | null | undefined>();

  return <FusionDatePicker {...args} onChange={setDate} date={date} />;
};

export const Year = Template.bind({});
Year.args = {
  placeholder: 'Select year',
  type: 'year',
};

export const Month = Template.bind({});
Month.args = {
  placeholder: 'Select month',
  type: 'month',
};

export const Date = Template.bind({});
Date.args = { placeholder: 'Select date', type: 'date' };

export const DateAndTime = Template.bind({});
DateAndTime.args = {
  placeholder: 'Select date and time',
  type: 'datetime',
};

export const Time = Template.bind({});
Time.args = {
  placeholder: 'Select time',
  type: 'time',
};
