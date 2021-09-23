import { useState, useCallback } from 'react';

import { FusionDatePicker, FusionDatePickerProps } from '@equinor/fusion-react-datepicker';

export const DatePickerTemplate = (props: FusionDatePickerProps): React.ReactElement => {
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
    <FusionDatePicker
      {...props}
      onRangeChange={onRangeChange}
      onChange={setDate}
      date={date}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
};

export default DatePickerTemplate;
