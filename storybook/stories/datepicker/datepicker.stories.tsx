import { FusionDatePicker, FusionDatePickerProps } from '@equinor/fusion-react-datepicker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

export default {
  title: 'DatePicker/Stories',
  component: FusionDatePicker,
} as Meta;

const Template: Story<FusionDatePickerProps> = (args) => {
  const [date, setDate] = useState<Date | null>(null);

  return <FusionDatePicker {...args} onChange={setDate} date={date} />;
};

const RangeTemplate: Story<FusionDatePickerProps> = (args) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const setDateRange = (range: [Date | null, Date | null]) => {
    const [from, to] = range;
    setDateFrom(from);
    setDateTo(to);
  };

  return <FusionDatePicker {...args} onRangeChange={setDateRange} dateFrom={dateFrom} dateTo={dateTo} />;
};

export const Dates = Template.bind({});
Dates.args = {
  label: 'Date',
  placeholder: 'Select date',
  type: 'date',
  maxDate: new Date('2021-03-20T03:24:00'),
};

export const DateRange = RangeTemplate.bind({});
DateRange.args = { label: 'Date range', placeholder: 'Select date range (from-to)', type: 'date-range' };

export const DateAndTime = Template.bind({});
DateAndTime.args = {
  label: 'Date and time',
  placeholder: 'Select date and time',
  type: 'datetime',
};

export const Month = Template.bind({});
Month.args = {
  label: 'Month',
  placeholder: 'Select month',
  type: 'month',
};

export const Time = Template.bind({});
Time.args = {
  label: 'Time',
  placeholder: 'Select time',
  type: 'time',
};

export const Year = Template.bind({});
Year.args = {
  label: 'Year',
  placeholder: 'Select year',
  type: 'year',
};
