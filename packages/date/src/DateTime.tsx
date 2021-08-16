import { FC, HTMLAttributes } from 'react';
import { DateTimeElement, DateTimeElementProps } from '@equinor/fusion-wc-date';
import { elementAttributes } from '@equinor/fusion-react-utils';
export { DateTimeFormat } from '@equinor/fusion-wc-date';
import '@equinor/fusion-wc-date';

export type DateTimeProps = DateTimeElementProps &
  HTMLAttributes<DateTimeElement> & {
    date: Date | string;
  };

export const DateTime: FC<DateTimeProps> = (props) => {
  const attributes = elementAttributes<DateTimeProps>(props);

  console.log(attributes);

  return <fwc-datetime {...attributes}></fwc-datetime>;
};

export default DateTime;
