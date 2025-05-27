import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { DateRangeElement as HTMLDateRangeCustomElement, dateRangeTag } from '@equinor/fusion-wc-date';

type ElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLDateRangeCustomElement,
      'from' | 'to' | 'format' | 'suffix' | 'variant' | 'locale' | 'seconds' | 'weekstart' | 'capitalize'
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
