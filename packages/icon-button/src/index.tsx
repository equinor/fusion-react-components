import { PropsWithChildren } from 'react';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { iconNames } from '@equinor/fusion-wc-icon';
import HTMLIconButtonCustomElement, { tag } from '@equinor/fusion-wc-icon-button';
import { IconButtonColor, IconButtonSize } from '@equinor/fusion-wc-icon-button/lib/types';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<HTMLIconButtonCustomElement, 'icon' | 'color' | 'size' | 'rounded' | 'disabled' | 'ariaLabel' | 'ariaHasPopup'>
  >
>;

export const IconButton = createComponent<HTMLIconButtonCustomElement, ElementProps>(HTMLIconButtonCustomElement, tag);

export type IconButtonProps = ComponentProps<HTMLIconButtonCustomElement, ElementProps>;

export { HTMLIconButtonCustomElement, iconNames, IconButtonColor, IconButtonSize };

export default IconButton;
