import { TextInputProps } from '@equinor/fusion-react-textinput';

export interface TextAreaProps extends Omit<TextInputProps, 'icon' | 'iconTrailing' | 'pattern'> {
  charCounter?: boolean | TextAreaCharCounter;
  cols?: number;
  rows?: number;
}

export type TextAreaCharCounter = 'external' | 'internal';
