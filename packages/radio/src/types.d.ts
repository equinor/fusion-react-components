export interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  global?: boolean;
  reducedTouchTarget?: boolean;
}
