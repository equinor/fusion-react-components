import { FC, HTMLAttributes } from 'react';
import { DateRangeElement, DateRangeElementProps } from '@equinor/fusion-wc-date';
import { elementAttributes } from '@equinor/fusion-react-utils';
export { DateTimeFormat } from '@equinor/fusion-wc-date';

export type DateRangeProps = DateRangeElementProps &
  HTMLAttributes<DateRangeElement> & {
    date: Date | string;
  };

export const DateRange: FC<DateRangeProps> = (props) => {
  const attributes = elementAttributes<DateRangeProps>(props);

  console.log(attributes);

  return <fwc-daterange {...attributes}></fwc-daterange>;
};

export default DateRange;
