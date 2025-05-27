import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { DateTimeElement as HTMLDateTimeCustomElement, dateTimeTag } from '@equinor/fusion-wc-date';

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLDateTimeCustomElement, 'date' | 'format' | 'locale'>>>;

export const DateTime = createComponent<HTMLDateTimeCustomElement, ElementProps>(
  HTMLDateTimeCustomElement,
  dateTimeTag,
);

export type DateTimeProps = ComponentProps<HTMLDateTimeCustomElement, ElementProps>;

export { HTMLDateTimeCustomElement };

export default DateTime;
