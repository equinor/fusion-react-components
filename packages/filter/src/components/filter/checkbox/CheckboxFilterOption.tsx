import React, { useCallback } from 'react';

import { CheckboxBase as Checkbox, HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox';

import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './CheckboxFilterOption.style';
import { CheckboxOption } from './types';

export type CheckboxFilterOptionProps = JSX.IntrinsicElements['div'] &
  Omit<CheckboxOption, 'totalCount'> & {
    name: string;
    checked?: boolean;
    indeterminate?: boolean;
    count: string | number;
    onOptionChange: (item: { name: string; selected?: boolean }) => void;
  };

export const CheckboxFilterOption = (props: CheckboxFilterOptionProps): JSX.Element => {
  const { name, label, count, checked, indeterminate, inactive, hide, onOptionChange, className, ...args } = props;
  const onCheckboxClick = useCallback((e: React.MouseEvent<HTMLCheckboxCustomElement>) => e.stopPropagation(), []);
  const onCheckboxInput = useCallback(
    ({ currentTarget: { name, checked } }: React.FormEvent<HTMLCheckboxCustomElement>) => {
      return onOptionChange({ name, selected: !checked });
    },
    [onOptionChange]
  );
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget.firstChild as HTMLCheckboxCustomElement).click();
  }, []);
  const styles = useStyles();
  return (
    <div
      {...args}
      className={clsx(className, styles.root, inactive && styles.inactive, hide && styles.hide)}
      onClick={onClick}
    >
      <Checkbox
        className={styles.checkbox}
        name={name}
        checked={checked}
        onInput={onCheckboxInput}
        onClick={onCheckboxClick}
        indeterminate={indeterminate}
      />
      <span className={styles.label}>{label}</span>
      <span className={styles.counter}>{count}</span>
    </div>
  );
};

export default CheckboxFilterOption;
