import { createComponent } from '@equinor/fusion-react-utils';

import HTMLSkeletonCustomElement, { tag, SkeletonVariant, SkeletonSize } from '@equinor/fusion-wc-skeleton';

export { HTMLSkeletonCustomElement, SkeletonVariant, SkeletonSize };

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLSkeletonCustomElement, 'size' | 'variant' | 'inactive' | 'fluid' | 'icon'>>
>;

export const Skeleton = createComponent<HTMLSkeletonCustomElement, ElementProps>(HTMLSkeletonCustomElement, tag);

export type SkeletonProps = React.ComponentProps<typeof Skeleton>;

export default Skeleton;
