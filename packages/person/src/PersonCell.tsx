import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCellCustomElement, {
  tag,
  TableCellData as PersonCellData,
} from '@equinor/fusion-wc-person/table-cell';
import extractProps from './extract-props';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonCellCustomElement,
      'azureId' | 'upn' | 'dataSource' | 'size' | 'heading' | 'subHeading' | 'showAvatar'
    >
  >
>;

export type PersonCellProps = ComponentProps<HTMLPersonCellCustomElement, ElementProps>;
export const PersonCellComponent = createComponent<HTMLPersonCellCustomElement, ElementProps>(
  HTMLPersonCellCustomElement,
  tag,
);

export const PersonCell = ({ children, ...props }: PropsWithChildren<PersonCellProps>): JSX.Element => {
  const avatarRef = useRef<HTMLPersonCellCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (avatarRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatarRef.current[name] = value;
      }
    }
  }, [props]);

  return <PersonCellComponent ref={avatarRef}>{children}</PersonCellComponent>;
};

export { type PersonCellData };
export default PersonCell;
