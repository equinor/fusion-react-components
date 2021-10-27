import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLSkeletonWrapperCustomElement, {
  tag,
  SkeletonSpacing,
  SkeletonDirection,
} from '@equinor/fusion-wc-skeleton/lib/skeleton-wrapper';

export { HTMLSkeletonWrapperCustomElement, SkeletonSpacing, SkeletonDirection };

export const SkeletonWrapper = createComponent(ReactModule, tag, HTMLSkeletonWrapperCustomElement);
export type SkeletonWrapperProps = React.ComponentProps<typeof SkeletonWrapper>;

export default SkeletonWrapper;
