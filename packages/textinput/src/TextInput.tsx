import { tag, TextInputElement } from '@equinor/fusion-wc-textinput';
import { TextInputInvalidHandler } from './types';

import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';

type ElementFunctions = Partial<Pick<TextInputElement, 'validityTransform'>>;

type ElementAttributes = Partial<
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

type ElementEvents = {
  onInvalid?: TextInputInvalidHandler;
};

type ElementProps = ElementAttributes & ElementFunctions & ElementEvents;

export const TextInput = createComponent<TextInputElement, ElementProps>(TextInputElement, tag, {
  events: { onInvalid: 'invalid' },
  functions: new Set(['validityTransform']),
});

export type TextInputProps = ComponentProps<TextInputElement, ElementProps>;

export default TextInput;
