import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import { SwitchElement as HTMLSwitchCustomElement, tag } from '@equinor/fusion-wc-switch';

type ElementProps = React.PropsWithChildren<
  Partial<Pick<HTMLSwitchCustomElement, 'selected' | 'name' | 'value' | 'disabled'>>
>;

export const SwitchBase = createComponent<HTMLSwitchCustomElement, ElementProps>(HTMLSwitchCustomElement, tag);

export type SwitchBaseProps = ComponentProps<HTMLSwitchCustomElement, ElementProps>;

export { HTMLSwitchCustomElement };

export default SwitchBase;
