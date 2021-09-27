import * as ReactModule from 'react';
import { createComponent } from '@lit-labs/react';
import { SwitchElement as HTMLSwitchCustomElement, tag } from '@equinor/fusion-wc-switch';

export { HTMLSwitchCustomElement };

export const Switch = createComponent(ReactModule, tag, HTMLSwitchCustomElement);
export type SwitchProps = React.ComponentProps<typeof Switch>;

export default Switch;
