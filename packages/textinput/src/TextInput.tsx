import { ChangeEvent, ChangeEventHandler, HTMLAttributes, PropsWithChildren, SyntheticEvent, useCallback } from 'react';
import { TextInputElement, TextInputElementProps } from '@equinor/fusion-wc-textinput';

import { elementAttributes } from '@equinor/fusion-react-utils';

export type TextInputChangeHandler = ChangeEventHandler<TextInputElement>;
export type TextInputChangeEvent = ChangeEvent<TextInputElement>;

export type TextInputProps = TextInputElementProps &
  HTMLAttributes<TextInputElement> & {
    onChange?: TextInputChangeHandler;
  };

export const TextInput = ({ children, onChange, ...props }: PropsWithChildren<TextInputProps>): JSX.Element => {
  const attr = elementAttributes(props as TextInputElementProps);
  const onInput = useCallback(
    ({ nativeEvent, currentTarget: target }: SyntheticEvent) => {
      // @ts-ignore
      onChange && onChange({ nativeEvent, target });
    },
    [onChange]
  );
  return (
    <fwc-textinput {...attr} onInput={onInput}>
      {children}
    </fwc-textinput>
  );
};

export default TextInput;
