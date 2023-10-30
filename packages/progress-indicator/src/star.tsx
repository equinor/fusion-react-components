import type { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import { StarProgressElement as HTMLStarIndicatorCustomElement, tag } from '@equinor/fusion-wc-progress-indicator';

type ElementAttributes = Partial<Pick<HTMLStarIndicatorCustomElement, 'text' | 'size'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const StarProgress = createComponent<HTMLStarIndicatorCustomElement, ElementProps>(
  HTMLStarIndicatorCustomElement,
  tag,
);

export type StarProgressProps = ComponentProps<HTMLStarIndicatorCustomElement, ElementProps>;

export default StarProgress;
