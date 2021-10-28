import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLSkeletonCustomElement, {
  tag,
  DividerColor,
  DividerSpacing,
  DividerVariant,
  DividerOrientation,
} from '@equinor/fusion-wc-divider';

export { HTMLSkeletonCustomElement, DividerColor, DividerSpacing, DividerVariant, DividerOrientation };

export const Skeleton = createComponent(ReactModule, tag, HTMLSkeletonCustomElement);
export type SkeletonProps = React.ComponentProps<typeof Skeleton>;

export default Skeleton;
