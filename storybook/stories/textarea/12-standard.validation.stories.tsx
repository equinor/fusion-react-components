/* eslint-disable react/no-multi-comp */
import { useCallback, useRef, useState, useEffect } from 'react';

import { Meta } from '@storybook/react';
import { Button } from '@storybook/components';

import TextArea, { TextAreaChangeEvent, TextAreaElement, TextAreaValidity } from '@equinor/fusion-react-textarea';

export type StoryProps = { expected: string };

export const ValidationCustom = (props: StoryProps): React.ReactElement => {
  const { expected } = props;

  const ref = useRef<TextAreaElement>(null);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const validationMessage = useCallback(
    (validity: TextAreaValidity, el: TextAreaElement) => {
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
    (value: string, validity: TextAreaValidity): TextAreaValidity => ({
      ...validity,
      valid: value === expected,
      customError: value !== expected,
    }),
    [expected]
  );

  const onChange = useCallback((e: TextAreaChangeEvent) => setValue(e.currentTarget.value), [setValue]);

  // reset error message when value changes
  useEffect(() => {
    setMessage('');
  }, [setMessage, value]);

  const onSubmit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const valid = el.reportValidity();
    setMessage(valid ? '' : validationMessage(el.validity, el));
  }, [ref, validationMessage]);

  return (
    <div>
      <TextArea
        ref={ref}
        required
        minlength="3"
        value={value}
        onChange={onChange}
        validationMessage={message}
        validityTransform={validityTransform}
      />
      <Button variant="secondary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default {
  title: 'Input/TextArea/Examples/Validation Custom',
  args: { expected: 'foobar' },
  component: ValidationCustom,
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open',
      },
    },
  },
} as Meta;
