/* eslint-disable react/no-multi-comp */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Meta, Story } from '@storybook/react';

import {
  TextInput,
  TextInputProps,
  HTMLTextInputCustomElement,
  TextInputInvalidEvent,
} from '@equinor/fusion-react-textinput';

export type StoryProps = { expected?: string };

export const Preferred: Story = ({ expected }: StoryProps) => {
  const ref = useRef<HTMLTextInputCustomElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const renderRef = useRef(0);

  renderRef.current++;

  const onInvalid = useCallback(
    (e: TextInputInvalidEvent) => {
      const el = e.target;
      const validity = el.validity;
      switch (true) {
        case validity.valueMissing:
          el.validationMessage = 'missing value';
          break;
        case validity.tooShort:
          el.validationMessage = 'value is too short';
          break;
        case validity.customError:
          el.validationMessage = `expected "${expected}" got "${el.value}"`;
          break;
        default:
          el.validationMessage = 'failed to validate';
          break;
      }
    },
    [expected]
  );

  const validityTransform = useCallback(
    (value: string, validity: ValidityState): ValidityState => ({
      ...validity,
      valid: value === expected,
      customError: value !== expected,
    }),
    [expected]
  );

  const onInput = useCallback(
    (e: React.FormEvent<HTMLTextInputCustomElement>) => {
      if (valueRef.current) {
        valueRef.current.innerText = e.currentTarget.value;
      }
      if (ref.current?.checkValidity()) {
        ref.current.helper = 'good job 👍🏻';
      }
    },
    [ref, valueRef]
  );

  return (
    <div style={{ display: 'flex', flexFlow: 'column', gap: 10 }}>
      <TextInput
        label={`please input "${expected}"`}
        ref={ref}
        onInvalid={onInvalid}
        onInput={onInput}
        validityTransform={validityTransform}
        autoValidate
      />
      <span>renders: {renderRef.current}</span>
      <span>
        value: <span ref={valueRef}>initial</span>
      </span>
    </div>
  );
};
Preferred.args = { expected: 'foo' };

export const Static: Story = (props: Pick<TextInputProps, 'errorMessage'>) => (
  <TextInput errorMessage={props.errorMessage} />
);
Static.args = {
  errorMessage: 'static error message',
};

export const Simple: Story = ({ expected }: StoryProps) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onInput = useCallback((e) => setValue((e.target as HTMLTextInputCustomElement).value), [setValue]);

  useEffect(() => {
    setMessage(expected !== value ? `expected "${expected}", no good 🥺` : '');
  }, [setMessage, expected, value]);

  return <TextInput value={value} onInput={onInput} errorMessage={message} autoValidate />;
};
Simple.args = {
  expected: 'foobar',
};

export default {
  title: 'Examples/TextInput/Validation',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;
