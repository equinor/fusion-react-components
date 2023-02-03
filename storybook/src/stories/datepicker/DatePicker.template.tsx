import { useState, useCallback } from 'react';

import { FusionDatePicker, FusionDatePickerProps } from '@equinor/fusion-react-datepicker';

type DatePickerTemplateProps = { divHeight: number } & FusionDatePickerProps;

export const DatePickerTemplate = (props: DatePickerTemplateProps): React.ReactElement => {
  const [date, setDate] = useState<Date | null>();
  const [dateTo, setDateTo] = useState<Date | null>();
  const [dateFrom, setDateFrom] = useState<Date | null>();

  const onRangeChange = useCallback(
    (range: [Date | null, Date | null]) => {
      const [from, to] = range;
      setDateFrom(from);
      setDateTo(to);
    },
    [setDateFrom, setDateTo]
  );

  return (
    <div style={{ height: props.divHeight }}>
      <FusionDatePicker
        {...props}
        onRangeChange={onRangeChange}
        onChange={setDate}
        date={date || props.date}
        dateFrom={dateFrom || props.dateFrom}
        dateTo={dateTo || props.dateTo}
      />
    </div>
  );
};

export default DatePickerTemplate;
