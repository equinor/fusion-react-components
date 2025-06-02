import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCellCustomElement, {
  tag,
  type TableCellData as PersonCellData,
} from '@equinor/fusion-wc-person/table-cell';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonCellCustomElement,
      'azureId' | 'upn' | 'dataSource' | 'size' | 'heading' | 'subHeading' | 'showAvatar'
    >
  >
>;

export type PersonCellProps = ComponentProps<HTMLPersonCellCustomElement, ElementProps>;
export const PersonCell = createComponent<HTMLPersonCellCustomElement, ElementProps>(
  HTMLPersonCellCustomElement,
  tag,
);

export type { PersonCellData, HTMLPersonCellCustomElement };
export default PersonCell;
