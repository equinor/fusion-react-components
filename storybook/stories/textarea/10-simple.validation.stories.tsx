import { useCallback, useState, useEffect } from 'react';
import { Meta } from '@storybook/react';

import TextArea, { TextAreaChangeEvent } from '@equinor/fusion-react-textarea';

export type StoryProps = { expected: string };

export const ValidationSimple = ({ expected }: StoryProps): React.ReactElement => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange = useCallback(
    (e: TextAreaChangeEvent) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  useEffect(() => {
    setMessage(expected !== value ? `expected "${expected}", no good 🥺` : '');
  }, [setMessage, expected, value]);

  return <TextArea value={value} onChange={onChange} validationMessage={message} autoValidate />;
};

export default {
  title: 'Input/TextArea/Examples/Validation Simple',
  args: { expected: 'foobar' },
  component: ValidationSimple,
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open',
      },
    },
  },
} as Meta;
