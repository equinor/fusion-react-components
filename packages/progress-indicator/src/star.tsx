import type { PropsWithChildren, ComponentProps } from 'react';
import { createComponent } from '@equinor/fusion-react-utils';

import { tag, StarProgressElement, StarProgressElementProps } from '@equinor/fusion-wc-progress-indicator';

export { StarProgressElement as HTMLStarIndicatorCustomElement, StarProgressElement, StarProgressElementProps };

type ElementAttributes = Partial<Pick<StarProgressElement, 'text' | 'size'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const StarProgress = createComponent<StarProgressElement, ElementProps>(StarProgressElement, tag);

export type StarProgressProps = ComponentProps<typeof StarProgress>;

export default StarProgress;
