import type { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import {
  CircularProgressElement as HTMLCircularIndicatorCustomElement,
  tagCircular,
} from '@equinor/fusion-wc-progress-indicator';

type ElementAttributes = Partial<Pick<HTMLCircularIndicatorCustomElement, 'size' | 'color'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const CircularProgress = createComponent<HTMLCircularIndicatorCustomElement, ElementProps>(
  HTMLCircularIndicatorCustomElement,
  tagCircular,
);

export type CircularProgressProps = ComponentProps<HTMLCircularIndicatorCustomElement, ElementProps>;

export { HTMLCircularIndicatorCustomElement };

export default CircularProgress;
