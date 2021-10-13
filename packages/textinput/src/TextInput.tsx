/* eslint-disable react/no-multi-comp */
import { tag, TextInputElement } from '@equinor/fusion-wc-textinput';
import { TextInputInvalidHandler } from './types';

import { createComponent } from '@equinor/fusion-react-utils';

export type ElementFunctions = Partial<Pick<TextInputElement, 'validityTransform'>>;

export type ElementAttributes = Partial<
  Pick<
    TextInputElement,
    | 'autoValidate'
    | 'charCounter'
    | 'disabled'
    | 'dense'
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
    | 'type'
    | 'value'
    | 'variant'
    | 'validationMessage'
  >
>;

export type ElementEvents = {
  onInvalid?: TextInputInvalidHandler;
};

export type TextInputProps = ElementAttributes & ElementFunctions & ElementEvents;

export const TextInput = createComponent<TextInputElement, TextInputProps>(TextInputElement, tag, {
  events: { onInvalid: 'invalid' },
  functions: new Set(['validityTransform']),
});

export default TextInput;
