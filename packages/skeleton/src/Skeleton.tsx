import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLSkeletonCustomElement, { tag, SkeletonVariant, SkeletonSize } from '@equinor/fusion-wc-skeleton';

export { HTMLSkeletonCustomElement, SkeletonVariant, SkeletonSize };

export const Skeleton = createComponent(ReactModule, tag, HTMLSkeletonCustomElement);
export type SkeletonProps = React.ComponentProps<typeof Skeleton>;

export default Skeleton;
