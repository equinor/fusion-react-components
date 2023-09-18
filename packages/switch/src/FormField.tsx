import { FormfieldElement, tag } from '@equinor/fusion-wc-formfield';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

// TODO import from @equinor/fusion-react-form when created

export type ElementProps = Partial<Pick<FormfieldElement, 'label' | 'alignEnd' | 'spaceBetween' | 'nowrap'>>;

export const FormField = createComponent<FormfieldElement, React.PropsWithChildren<ElementProps>>(
  FormfieldElement,
  tag,
);

export type FormFieldProps = ComponentProps<FormfieldElement, ElementProps>;

export default FormField;
