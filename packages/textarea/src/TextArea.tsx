import { tag, TextAreaElement } from '@equinor/fusion-wc-textarea';
import type { TextAreaInvalidHandler } from './types';

import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ElementFunctions = Partial<Pick<TextAreaElement, 'validityTransform'>>;

type ElementAttributes = Partial<
  Pick<
    TextAreaElement,
    | 'cols'
    | 'rows'
    //
    | 'autoValidate'
    | 'disabled'
    | 'errorMessage'
    | 'helper'
    | 'helperPersistent'
    | 'icon'
    | 'iconTrailing'
    | 'label'
    | 'max'
    | 'maxLength'
    | 'minLength'
    | 'name'
    | 'pattern'
    | 'placeholder'
    | 'prefix'
    | 'required'
    | 'size'
    | 'step'
    | 'suffix'
    | 'value'
    | 'validationMessage'
    | 'charCounter'
  >
>;

type ElementEvents = {
  onInvalid?: TextAreaInvalidHandler;
};

type ElementProps = ElementAttributes & ElementFunctions & ElementEvents;

export const TextInput = createComponent<TextAreaElement, ElementProps>(TextAreaElement, tag, {
  events: { onInvalid: 'invalid' },
  functions: new Set(['validityTransform']),
});

export type TextInputProps = ComponentProps<TextAreaElement, ElementProps>;

export default TextInput;
