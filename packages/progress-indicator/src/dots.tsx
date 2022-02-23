import type { PropsWithChildren, ComponentProps } from 'react';
import { createComponent } from '@equinor/fusion-react-utils';

import { tagDots, DotsProgressElement, DotsProgressElementProps } from '@equinor/fusion-wc-progress-indicator';

export { DotsProgressElement as HTMLDotsIndicatorCustomElement, DotsProgressElement, DotsProgressElementProps };

type ElementAttributes = Partial<Pick<DotsProgressElement, 'size' | 'color'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const DotsProgress = createComponent<DotsProgressElement, ElementProps>(DotsProgressElement, tagDots);

export type DotsProgressProps = ComponentProps<typeof DotsProgress>;

export default DotsProgress;
