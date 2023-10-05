import React, { useCallback } from 'react';

import { CheckboxBase as Checkbox, HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox';

import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './CheckboxFilterOption.style';
import type { CheckboxOption } from './types';

export type CheckboxFilterOptionProps = JSX.IntrinsicElements['div'] &
  Omit<CheckboxOption, 'totalCount'> & {
    readonly name: string;
    readonly checked?: boolean;
    readonly indeterminate?: boolean;
    readonly count: string | number;
    readonly onOptionChange: (item: { name: string; selected?: boolean }) => void;
  };

export const CheckboxFilterOption = (props: CheckboxFilterOptionProps): JSX.Element => {
  const { name, label, count, checked, indeterminate, inactive, hide, onOptionChange, className, ...args } = props;
  const onCheckboxClick = useCallback((e: React.MouseEvent<HTMLCheckboxCustomElement>) => e.stopPropagation(), []);
  const onCheckboxInput = useCallback(
    ({ currentTarget: { name, checked } }: React.FormEvent<HTMLCheckboxCustomElement>) => {
      return onOptionChange({ name, selected: !checked });
    },
    [onOptionChange],
  );
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget.firstChild as HTMLCheckboxCustomElement).click();
  }, []);
  const styles = useStyles();
  return (
    // TODO
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
