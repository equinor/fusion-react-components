import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';

import HTMLSkeletonCustomElement, {
  tag,
  SkeletonVariant,
  SkeletonSize,
} from '@equinor/fusion-wc-skeleton';

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLSkeletonCustomElement, 'size' | 'variant' | 'inactive' | 'fluid'>>
>;

export const Skeleton = createComponent<HTMLSkeletonCustomElement, ElementProps>(
  HTMLSkeletonCustomElement,
  tag,
);

export type SkeletonProps = ComponentProps<HTMLSkeletonCustomElement>;

export { HTMLSkeletonCustomElement, SkeletonVariant, SkeletonSize };

export default Skeleton;
