import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonTableCellCustomElement, { tag, TableCellData } from '@equinor/fusion-wc-person/table-cell';
import extractProps from './extract-props';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonTableCellCustomElement,
      'azureId' | 'upn' | 'dataSource' | 'size' | 'heading' | 'subHeading' | 'showAvatar'
    >
  >
>;

export type PersonTableCellProps = ComponentProps<HTMLPersonTableCellCustomElement, ElementProps>;
export const PersonTableCellComponent = createComponent<HTMLPersonTableCellCustomElement, ElementProps>(
  HTMLPersonTableCellCustomElement,
  tag,
);

export const PersonTableCell = ({ children, ...props }: PropsWithChildren<PersonTableCellProps>): JSX.Element => {
  const avatarRef = useRef<HTMLPersonTableCellCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (avatarRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatarRef.current[name] = value;
      }
    }
  }, [props]);

  return <PersonTableCellComponent ref={avatarRef}>{children}</PersonTableCellComponent>;
};

export { type TableCellData };
export default PersonTableCell;
