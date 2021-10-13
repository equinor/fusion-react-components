import { FormfieldElement, tag } from '@equinor/fusion-wc-formfield';
import { createComponent } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

export type FormFieldProps = Partial<Pick<FormfieldElement, 'label' | 'alignEnd' | 'spaceBetween' | 'nowrap'>>;

export const FormField = createComponent<FormfieldElement, React.PropsWithChildren<FormFieldProps>>(
  FormfieldElement,
  tag
);

export default FormField;
