import { createComponent } from '@equinor/fusion-react-utils';
import { DateTimeElement as HTMLDateTimeCustomElement, dateTimeTag } from '@equinor/fusion-wc-date';

export { HTMLDateTimeCustomElement };

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLDateTimeCustomElement, 'date' | 'format' | 'locale'>>>;

export const DateTime = createComponent<HTMLDateTimeCustomElement, ElementProps>(
  HTMLDateTimeCustomElement,
  dateTimeTag
);

export type DateTimeProps = React.ComponentProps<typeof DateTime>;

export default DateTime;
