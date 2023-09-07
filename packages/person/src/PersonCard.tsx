import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCardCustomElement, { tag, CardData } from '@equinor/fusion-wc-person/card';
import { PersonItemSize } from '@equinor/fusion-wc-person';
import extractProps from './extract-props';

type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonCardCustomElement, 'azureId' | 'upn' | 'dataSource' | 'size' | 'maxWidth' | 'contentHeight'>>
>;

export type PersonCardProps = ComponentProps<HTMLPersonCardCustomElement, ElementProps>;
export const PersonCardComponent = createComponent<HTMLPersonCardCustomElement, ElementProps>(HTMLPersonCardCustomElement, tag);

export const PersonCard = ({ children, ...props }: PropsWithChildren<PersonCardProps>): JSX.Element => {
  const cardRef = useRef<HTMLPersonCardCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (cardRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cardRef.current[name] = value;
      }
    }
  }, []);

  return <PersonCardComponent ref={cardRef}>{children}</PersonCardComponent>;
};

export { HTMLPersonCardCustomElement, PersonItemSize, CardData };
export default PersonCard;
