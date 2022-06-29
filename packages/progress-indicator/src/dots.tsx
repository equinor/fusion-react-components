import type { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import { DotsProgressElement as HTMLDotsIndicatorCustomElement, tagDots } from '@equinor/fusion-wc-progress-indicator';

type ElementAttributes = Partial<Pick<HTMLDotsIndicatorCustomElement, 'size' | 'color'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const DotsProgress = createComponent<HTMLDotsIndicatorCustomElement, ElementProps>(
  HTMLDotsIndicatorCustomElement,
  tagDots
);

export type DotsProgressProps = ComponentProps<HTMLDotsIndicatorCustomElement, ElementProps>;

export { HTMLDotsIndicatorCustomElement };

export default DotsProgress;
