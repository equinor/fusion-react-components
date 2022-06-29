import { FormfieldElement as HTMLFormFieldCustomElement, tag } from '@equinor/fusion-wc-formfield';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

export type FormFieldElementProps = Partial<
  Pick<HTMLFormFieldCustomElement, 'label' | 'alignEnd' | 'spaceBetween' | 'nowrap'>
>;

export const FormField = createComponent<HTMLFormFieldCustomElement, React.PropsWithChildren<FormFieldElementProps>>(
  HTMLFormFieldCustomElement,
  tag
);

export type FormFieldProps = ComponentProps<HTMLFormFieldCustomElement, FormFieldElementProps>;

export { HTMLFormFieldCustomElement };

export default FormField;
