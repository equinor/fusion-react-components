import { PropsWithChildren } from 'react';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { iconNames } from '@equinor/fusion-wc-icon';
import { IconButtonElement as HTMLIconButtonCustomElement, iconButtonTag } from '@equinor/fusion-wc-button';
import { IconButtonColor, IconButtonSize } from '@equinor/fusion-wc-button';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<HTMLIconButtonCustomElement, 'icon' | 'color' | 'size' | 'rounded' | 'disabled' | 'ariaLabel' | 'ariaHasPopup'>
  >
>;

export const IconButton = createComponent(HTMLIconButtonCustomElement, iconButtonTag);

export type IconButtonProps = ComponentProps<HTMLIconButtonCustomElement, ElementProps>;

export { HTMLIconButtonCustomElement, iconNames, IconButtonColor, IconButtonSize };

export default IconButton;
