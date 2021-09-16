import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
} from 'react';

import { TextInputElement, TextInputElementProps } from '@equinor/fusion-wc-textinput';

import { elementAttributes } from '@equinor/fusion-react-utils';

TextInputElement;

export type TextInputChangeHandler = ChangeEventHandler<TextInputElement>;
export type TextInputChangeEvent = ChangeEvent<TextInputElement>;

export type TextInputProps = TextInputElementProps &
  HTMLAttributes<TextInputElement> & {
    onChange?: TextInputChangeHandler;
  };

export const TextInput = forwardRef(
  ({ children, onChange, ...props }: PropsWithChildren<TextInputProps>, ref: ForwardedRef<TextInputElement>) => {
    const attr = elementAttributes(props as TextInputElementProps);
    const onInput = useCallback(
      (e: FormEvent<TextInputElement>) => {
        onChange && onChange({ ...e, target: e.currentTarget });
      },
      [onChange]
    );
    return (
      <fwc-textinput ref={ref} {...attr} onInput={onInput}>
        {children}
      </fwc-textinput>
    );
  }
);

TextInput.displayName = '@equinor/fusion-react-text-input';

export default TextInput;
