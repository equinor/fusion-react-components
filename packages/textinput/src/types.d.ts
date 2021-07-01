export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  autoValidate?: boolean;
  charCounter?: boolean;
  checkValidity?(): boolean;
  disabled?: boolean;
  helper?: string;
  helperPersistent?: boolean;
  icon?: string;
  iconTrailing?: string;
  label?: string;
  layout?(): Promise<void>;
  max?: number | string;
  maxLength?: number;
  min?: number | string;
  name?: string;
  outlined?: boolean;
  pattern?: string;
  placeholder?: string;
  prefix?: string;
  reportValidity?(): boolean;
  required?: boolean;
  setCustomValidity?(message: string): void;
  size?: number | null;
  step?: number | null;
  suffix?: string;
  type: TextInputype;
  validateOnInitialRender?: boolean;
  validationMessage?: string;
  readonly validity?: ValidityState;
  validityTransform?(value: string, nativeValidity: ValidityState): Partial<ValidityState>;
  value: string;
  readonly willValidate?: boolean;
}

export type TextInputype =
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
