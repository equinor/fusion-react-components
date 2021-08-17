/* eslint-disable react/no-multi-comp */
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

const PopperTemplate: Story<FusionDatePickerProps & { offsetX: number; offsetY: number }> = (args) => {
  const { offsetX, offsetY, ...props } = args;
  const [date, setDate] = useState<Date | null | any>(null);
  props.popperModifiers = [
    {
      name: 'offset',
      options: { offset: [offsetX, offsetY] },
    },
  ];
  return <FusionDatePicker {...props} onChange={setDate} date={date} startOpen />;
};

export const Dates = Template.bind({});
Dates.args = {
  label: 'Date',
  placeholder: 'Select date',
  type: 'date',
};

export const DateRange = RangeTemplate.bind({});
DateRange.args = {
  label: 'Date range',
  placeholder: 'Select date range (from-to)',
  type: 'date-range',
};

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

export const Popper = PopperTemplate.bind({});
Popper.args = {
  popperPlacement: 'top-end',
  offsetX: 10,
  offsetY: 10,
};
