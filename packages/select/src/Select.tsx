/* eslint-disable react/no-multi-comp */
import { tag, SelectElement } from '@equinor/fusion-wc-select';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ElementAttributes = Partial<
  Pick<
    SelectElement,
    | 'value'
    | 'name'
    | 'label'
    | 'icon'
    | 'disabled'
    | 'outlined'
    | 'required'
  >
>;

type ElementProps = ElementAttributes;

export const Select = createComponent<SelectElement, ElementProps>(SelectElement, tag, {
  events: { onSelected: 'selected' },
});

export type SelectProps = ComponentProps<SelectElement, ElementProps>;

export default Select;
