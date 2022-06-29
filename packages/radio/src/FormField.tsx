import { FormfieldElement, tag } from '@equinor/fusion-wc-formfield';
import { createComponent, ComponentProps } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

export type FormFieldElementProps = Partial<Pick<FormfieldElement, 'label' | 'alignEnd' | 'spaceBetween' | 'nowrap'>>;

export const FormField = createComponent<FormfieldElement, React.PropsWithChildren<FormFieldElementProps>>(
  FormfieldElement,
  tag
);

export type FormFieldProps = ComponentProps<FormfieldElement, FormFieldElementProps>;

export default FormField;
