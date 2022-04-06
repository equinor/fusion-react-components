import { createComponent } from '@equinor/fusion-react-utils';
import { SelectElement as HTMLSelectCustomElement, tag } from '@equinor/fusion-wc-select';

export { HTMLSelectCustomElement };

type ElementProps = React.PropsWithChildren<Partial<Pick<HTMLSelectCustomElement, 'disabled' | 'outlined' | 'label'>>>;

export const Select = createComponent<HTMLSelectCustomElement, ElementProps>(HTMLSelectCustomElement, tag);

export type SelectProps = React.ComponentProps<typeof Select>;

export default Select;
