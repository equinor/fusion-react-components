import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { iconNames } from '@equinor/fusion-wc-icon';
import HTMLIconButtonToggleCustomElement, { tag } from '@equinor/fusion-wc-icon-button-toggle';
import { IconButtonToggleColor, IconButtonToggleSize } from '@equinor/fusion-wc-icon-button-toggle/lib/types';

type ElementProps = PropsWithChildren<
  Partial<
    Pick<
      HTMLIconButtonToggleCustomElement,
      | 'on'
      | 'onIcon'
      | 'offIcon'
      | 'ariaLabel'
      | 'ariaLabelOn'
      | 'ariaLabelOff'
      | 'onColor'
      | 'offColor'
      | 'size'
      | 'rounded'
      | 'disabled'
    >
  >
>;

export const IconButtonToggle = createComponent<HTMLIconButtonToggleCustomElement, ElementProps>(
  HTMLIconButtonToggleCustomElement,
  tag
);

export type IconButtonToggleProps = ComponentProps<HTMLIconButtonToggleCustomElement, ElementProps>;

export { HTMLIconButtonToggleCustomElement, iconNames, IconButtonToggleColor, IconButtonToggleSize };

export default IconButtonToggle;
