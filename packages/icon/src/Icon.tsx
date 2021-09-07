import { HTMLAttributes } from 'react';

import { elementAttributes } from '@equinor/fusion-react-utils';

import { IconElement, IconElementProps } from '@equinor/fusion-wc-icon';

IconElement;

export type IconProps = IconElementProps & HTMLAttributes<IconElementProps>;

export const Icon = (props: IconProps): JSX.Element => <fwc-icon {...elementAttributes(props as IconProps)} />;

export default Icon;
