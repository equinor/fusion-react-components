import React, { useState, useCallback, useRef, ReactElement } from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@storybook/components';
import { Checkbox, CheckboxProps, CheckboxBase, HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox/src';

export default {
  title: 'Examples/Checkbox',
  component: Checkbox,
} as Meta;

export const Component: Story = (props: Omit<CheckboxProps, 'ref'>): ReactElement => <Checkbox {...props} />;

export const Basic: Story = () => {
  const [checked, setChecked] = useState<boolean | undefined>(undefined);
  const onInput = useCallback(
    (e: React.SyntheticEvent<HTMLCheckboxCustomElement>) => setChecked(!e.currentTarget.checked),
    [setChecked]
  );
  const indeterminate = checked === undefined;
  const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';
  const label = `Checbox state is ${state}`;
  return <Checkbox label={label} checked={checked} indeterminate={indeterminate} onInput={onInput} />;
};

export const CustomLabel = (): React.ReactElement => {
  const ref = useRef<HTMLCheckboxCustomElement>(null);
  const onClick = useCallback(() => ref.current?.click(), [ref]);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <CheckboxBase ref={ref} />
      <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={onClick}>
        My custom label
      </span>
    </div>
  );
};

export const CustomControl = (): React.ReactElement => {
  const ref = useRef<HTMLCheckboxCustomElement>(null);
  const onClick = useCallback(() => {
    if (!ref.current) return;
    ref.current.checked = !ref.current.checked;
  }, [ref]);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Checkbox ref={ref} label="Controlled by button" disabled />
      <Button onClick={onClick} primary>
        Toggle checkbox
      </Button>
    </div>
  );
};
