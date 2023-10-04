import { FormfieldElement as HTMLFormFieldCustomElement, tag } from '@equinor/fusion-wc-formfield';
import { ComponentProps, createComponent, WebComponent } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

export type FormFieldElementProps = Partial<
  Pick<HTMLFormFieldCustomElement, 'label' | 'alignEnd' | 'spaceBetween' | 'nowrap'>
>;

export const FormField: WebComponent<HTMLFormFieldCustomElement, React.PropsWithChildren<FormFieldElementProps>> = createComponent<HTMLFormFieldCustomElement, React.PropsWithChildren<FormFieldElementProps>>(
  HTMLFormFieldCustomElement,
  tag,
);

export type FormFieldProps = ComponentProps<HTMLFormFieldCustomElement, FormFieldElementProps>;

export { HTMLFormFieldCustomElement };

export default FormField;
