import { tag, CheckboxElement as HTMLCheckboxCustomElement } from '@equinor/fusion-wc-checkbox';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

export type CheckboxBaseElementProps = Partial<
  Pick<HTMLCheckboxCustomElement, 'checked' | 'disabled' | 'indeterminate' | 'name' | 'reducedTouchTarget' | 'value'>
>;

export const CheckboxBase = createComponent<HTMLCheckboxCustomElement, CheckboxBaseElementProps>(
  HTMLCheckboxCustomElement,
  tag,
);

export type CheckboxBaseProps = ComponentProps<HTMLCheckboxCustomElement, CheckboxBaseElementProps>;

export { HTMLCheckboxCustomElement };

export default CheckboxBase;
