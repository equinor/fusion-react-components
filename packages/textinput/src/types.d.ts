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
  validateOnInitialRender?: boolean;
  validityTransform?(value: string, nativeValidity: ValidityState): Partial<ValidityState>;
}
