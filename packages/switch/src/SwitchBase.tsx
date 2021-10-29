import { createComponent } from '@equinor/fusion-react-utils';
import { SwitchElement as HTMLSwitchCustomElement, tag } from '@equinor/fusion-wc-switch';

export { HTMLSwitchCustomElement };

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLSwitchCustomElement, 'selected' | 'name' | 'value'>>>;

export const SwitchBase = createComponent<HTMLSwitchCustomElement, ElementProps>(HTMLSwitchCustomElement, tag);

export type SwitchBaseProps = React.ComponentProps<typeof SwitchBase>;

export default SwitchBase;
