import type { PropsWithChildren } from 'react';
import { createComponent, type ComponentProps } from '@equinor/fusion-react-utils';
import {
  DateRangeElement as HTMLDateRangeCustomElement,
  dateRangeTag,
} from '@equinor/fusion-wc-date';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLDateRangeCustomElement,
      | 'from'
      | 'to'
      | 'format'
      | 'suffix'
      | 'variant'
      | 'locale'
      | 'seconds'
      | 'weekstart'
      | 'capitalize'
    >
  >
>;

export const DateRange = createComponent<HTMLDateRangeCustomElement, ElementProps>(
  HTMLDateRangeCustomElement,
  dateRangeTag,
);

export type DateRangeProps = ComponentProps<HTMLDateRangeCustomElement, ElementProps>;

export { HTMLDateRangeCustomElement };

export default DateRange;
