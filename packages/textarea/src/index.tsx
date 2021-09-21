import {
  ChangeEvent,
  ChangeEventHandler,
  createRef,
  FormEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';

import { TextAreaElement, TextAreaElementProps } from '@equinor/fusion-wc-textarea';

import { elementAttributes } from '@equinor/fusion-react-utils';

export { TextAreaElement };
export type TextAreaChangeHandler = ChangeEventHandler<TextAreaElement>;
export type TextAreaChangeEvent = ChangeEvent<TextAreaElement>;
export type TextAreaValidity = TextAreaElement['validity'];
export type TextAreaValidityFn = (validity: TextAreaValidity, el: TextAreaElement) => string | null;

export type TextAreaProps = Partial<Omit<TextAreaElementProps, 'validationMessage'>> &
  HTMLAttributes<TextAreaElement> & {
    onChange?: TextAreaChangeHandler;
    /**
     * When `string` is provided this will set a validation message and mark the element as invalid.
     *
     * When `TextAreaValidityFn` provided a callback will occur every time the `invalid` event is dispatch from `fwc-textarea`.
     */
    validationMessage?: string | TextAreaValidityFn;
  };

export const TextArea = forwardRef(
  (
    { children, onChange, validationMessage, validityTransform, ...props }: PropsWithChildren<TextAreaProps>,
    ref: ForwardedRef<TextAreaElement>
  ): ReactElement => {
    const attr = elementAttributes(props as TextAreaElementProps);

    const elRef = (ref || createRef()) as RefObject<TextAreaElement>;
    // useRef<TextAreaElement | ForwardedRef<TextAreaElement>>(_ref);

    const onInput = useCallback(
      (e: FormEvent<TextAreaElement>) => {
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
          const { validity } = currentTarget as TextAreaElement;
          const msg = (validationMessage as unknown as TextAreaValidityFn)(validity, currentTarget as TextAreaElement);
          el.validationMessage = String(msg);
        };
        el.addEventListener('invalid', onInvalid);
        return () => el.removeEventListener('invalid', onInvalid);
      }
    }, [elRef, validationMessage]);

    return (
      <fwc-textarea ref={elRef} {...attr} onInput={onInput}>
        {children}
      </fwc-textarea>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
