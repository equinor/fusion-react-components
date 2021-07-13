export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  autoValidate?: boolean;
  charCounter?: boolean;
  helper?: string;
  helperPersistent?: boolean;
  icon?: string;
  iconTrailing?: string;
  label?: string;
  layout?(): Promise<void>;
  outlined?: boolean;
  prefix?: string;
  suffix?: string;
  type?: TextFieldType;
  readonly validity?: ValidityState;
  validateOnInitialRender?: boolean;
  validityTransform?: ValidityTransform;
}

export type TextFieldType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number'
  | 'color';

export type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>;
