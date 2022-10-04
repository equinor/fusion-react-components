/* eslint-disable react/no-multi-comp */
import { tag, SelectElement as HTMLSelectCustomElement } from '@equinor/fusion-wc-select';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ElementAttributes = React.PropsWithChildren<
  Partial<Pick<HTMLSelectCustomElement, 'value' | 'name' | 'label' | 'icon' | 'disabled' | 'outlined' | 'required'>>
>;

type ElementProps = ElementAttributes;

export const Select = createComponent<HTMLSelectCustomElement, ElementProps>(HTMLSelectCustomElement, tag, {
  events: { onSelected: 'selected' },
});

export type SelectProps = ComponentProps<HTMLSelectCustomElement, ElementProps>;

export { HTMLSelectCustomElement };

export default Select;
