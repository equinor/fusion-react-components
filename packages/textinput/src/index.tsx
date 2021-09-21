import { createRef, forwardRef, useCallback, useEffect, useLayoutEffect } from 'react';

import { TextInputElement, TextInputElementProps } from '@equinor/fusion-wc-textinput';

import { elementAttributes } from '@equinor/fusion-react-utils';

export { TextInputElement };

export type TextInputChangeHandler = React.ChangeEventHandler<TextInputElement>;
export type TextInputChangeEvent = React.ChangeEvent<TextInputElement>;

export type TextInputValidity = TextInputElement['validity'];
export type TextInputValidityFn = (validity: TextInputValidity, el: TextInputElement) => string | null;

export type TextInputProps = Partial<Omit<TextInputElementProps, 'onChange' | 'validationMessage'>> &
  React.HTMLAttributes<TextInputElement> & {
    /**
     * Since most react developers hooks on to this, this proxy the onInput event
     */
    onChange?: TextInputChangeHandler;
    /**
     * When `string` is provided this will set a validation message and mark the element as invalid.
     *
     * When `TextAreaValidityFn` provided a callback will occur every time the `invalid` event is dispatch from `fwc-textarea`.
     */
    validationMessage?: string | TextInputValidityFn;
  };

export const TextInput = forwardRef(
  (
    { children, onChange, validationMessage, validityTransform, ...props }: React.PropsWithChildren<TextInputProps>,
    ref: React.ForwardedRef<TextInputElement>
  ) => {
    const attr = elementAttributes(props as TextInputElementProps);

    const elRef = (ref || createRef()) as React.RefObject<TextInputElement>;

    const onInput = useCallback(
      (e: React.FormEvent<TextInputElement>) => {
        onChange && onChange({ ...e, target: e.currentTarget });
      },
      [onChange]
    );

    useLayoutEffect(() => {
      const el = elRef && elRef.current;
      if (!el || !validityTransform) return;
      el.validityTransform = validityTransform;
      return () => {
        el.validityTransform = null;
      };
    }, [elRef, validityTransform]);

    useEffect(() => {
      const el = elRef && elRef.current;
      if (!el || !validationMessage) return;
      if (typeof validationMessage === 'string') {
        el.setCustomValidity(validationMessage);
        el.autoValidate && el.reportValidity();
        // remove override
        return () => {
          el.setCustomValidity('');
          el.autoValidate && el.reportValidity();
        };
      } else {
        const onInvalid = ({ currentTarget }: Event) => {
          const { validity } = currentTarget as TextInputElement;
          const msg = (validationMessage as unknown as TextInputValidityFn)(
            validity,
            currentTarget as TextInputElement
          );
          el.validationMessage = String(msg);
        };
        el.addEventListener('invalid', onInvalid);
        return () => el.removeEventListener('invalid', onInvalid);
      }
    }, [elRef, validationMessage]);

    return (
      <fwc-textinput ref={elRef} {...attr} onInput={onInput}>
        {children}
      </fwc-textinput>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
