import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import HTMLButtonCustomElement, { tag } from '@equinor/fusion-wc-button';

export { HTMLButtonCustomElement };

export const Button = createComponent(ReactModule, tag, HTMLButtonCustomElement);
export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
