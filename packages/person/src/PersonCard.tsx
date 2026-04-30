import type { PropsWithChildren } from 'react';
import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonCardCustomElement, { tag, type CardData } from '@equinor/fusion-wc-person/card';
import type { PersonItemSize } from '@equinor/fusion-wc-person';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonCardCustomElement,
      'azureId' | 'upn' | 'dataSource' | 'resolveId' | 'size' | 'maxWidth' | 'contentHeight'
    >
  >
>;

export type PersonCardProps = ComponentProps<HTMLPersonCardCustomElement, ElementProps>;
export const PersonCard = createComponent<HTMLPersonCardCustomElement, ElementProps>(
  HTMLPersonCardCustomElement,
  tag,
);

PersonCard.displayName = 'PersonCard';

export type { HTMLPersonCardCustomElement, PersonItemSize, CardData };
export default PersonCard;
