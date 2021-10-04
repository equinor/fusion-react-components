/* eslint-disable react/no-multi-comp */
import { tag, TextAreaElement } from '@equinor/fusion-wc-textarea';
import { TextAreaInvalidHandler } from './types';

import { createComponent } from '@equinor/fusion-react-utils';

export type ElementFunctions = Partial<Pick<TextAreaElement, 'validityTransform'>>;

export type ElementAttributes = Partial<
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
  >
>;

export type ElementEvents = {
  onInvalid?: TextAreaInvalidHandler;
};

export type TextInputProps = ElementAttributes & ElementFunctions & ElementEvents;

export const TextInput = createComponent<TextAreaElement, TextInputProps>(TextAreaElement, tag, {
  events: { onInvalid: 'invalid' },
  functions: new Set(['validityTransform']),
});

export default TextInput;
