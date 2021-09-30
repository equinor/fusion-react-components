/* eslint-disable react/no-multi-comp */
import { useCallback } from 'react';
import { Meta } from '@storybook/react';

import TextInput, { TextInputElement, TextInputValidity } from '@equinor/fusion-react-textinput';

export type StoryProps = { expected: string };

export const ValidationStandard = (props: StoryProps): React.ReactElement => {
  const { expected } = props;
  const validationMessage = useCallback(
    (validity: TextInputValidity, el: TextInputElement) => {
      switch (true) {
        case validity.valueMissing:
          return 'missing value';
        case validity.tooShort:
          return 'value is too short';
        case validity.customError:
          return `expected "${expected}" got "${el.value}"`;
        default:
          return 'failed to validate';
      }
    },
    [expected]
  );

  const validityTransform = useCallback(
    (value: string, validity: TextInputValidity): TextInputValidity => ({
      ...validity,
      valid: value === expected,
      customError: value !== expected,
    }),
    [expected]
  );

  return (
    <TextInput
      autoValidate
      required
      minlength="3"
      validityTransform={validityTransform}
      validationMessage={validationMessage}
    />
  );
};

export default {
  title: 'Input/TextInput/Examples/Validation Standard',
  args: { expected: 'foobar' },
  component: ValidationStandard,
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open',
      },
    },
  },
} as Meta;
