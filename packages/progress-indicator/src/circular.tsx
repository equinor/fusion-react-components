import type { PropsWithChildren, ComponentProps } from 'react';
import { createComponent } from '@equinor/fusion-react-utils';

import {
  tagCircular,
  CircularProgressElement,
  CircularProgressElementProps,
} from '@equinor/fusion-wc-progress-indicator';

export {
  CircularProgressElement as HTMLCircularIndicatorCustomElement,
  CircularProgressElement,
  CircularProgressElementProps,
};

type ElementAttributes = Partial<Pick<CircularProgressElement, 'size' | 'color'>>;

type ElementProps = PropsWithChildren<ElementAttributes>;

export const CircularProgress = createComponent<CircularProgressElement, ElementProps>(
  CircularProgressElement,
  tagCircular
);

export type CircularProgressProps = ComponentProps<typeof CircularProgress>;

export default CircularProgress;
