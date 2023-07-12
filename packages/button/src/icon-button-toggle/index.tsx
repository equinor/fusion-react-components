import { PropsWithChildren } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { iconNames } from '@equinor/fusion-wc-icon';
import {
  IconButtonToggleElement as HTMLIconButtonToggleCustomElement,
  iconButtonToggleTag,
} from '@equinor/fusion-wc-button';

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
  iconButtonToggleTag
);

export type IconButtonToggleProps = ComponentProps<HTMLIconButtonToggleCustomElement, ElementProps>;

export { HTMLIconButtonToggleCustomElement, iconNames };

export default IconButtonToggle;
