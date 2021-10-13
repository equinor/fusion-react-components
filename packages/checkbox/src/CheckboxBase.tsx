import { tag, CheckboxElement as HTMLCheckboxCustomElement } from '@equinor/fusion-wc-checkbox';

import { createComponent } from '@equinor/fusion-react-utils';

export type CheckboxBaseProps = Partial<
  Pick<HTMLCheckboxCustomElement, 'checked' | 'disabled' | 'indeterminate' | 'name' | 'reducedTouchTarget' | 'value'>
>;

export const CheckboxBase = createComponent<HTMLCheckboxCustomElement, CheckboxBaseProps>(
  HTMLCheckboxCustomElement,
  tag
);

export { HTMLCheckboxCustomElement };

export default CheckboxBase;
