import { createComponent } from '@equinor/fusion-react-utils';
import HTMLSkeletonWrapperCustomElement, {
  tag,
  SkeletonSpacing,
  SkeletonDirection,
  // TODO - do not import from `lib` - fix export in custom element
} from '@equinor/fusion-wc-skeleton/lib/skeleton-wrapper';

export { HTMLSkeletonWrapperCustomElement, SkeletonSpacing, SkeletonDirection };

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLSkeletonWrapperCustomElement, 'spacing' | 'direction'>>>;

export const SkeletonWrapper = createComponent<HTMLSkeletonWrapperCustomElement, ElementProps>(
  HTMLSkeletonWrapperCustomElement,
  tag
);

export type SkeletonWrapperProps = React.ComponentProps<typeof SkeletonWrapper>;

export default SkeletonWrapper;
