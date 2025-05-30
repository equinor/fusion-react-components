import type React from 'react';
import { useCallback } from 'react';

import { Checkbox } from '@equinor/eds-core-react';

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
  const {
    name,
    label,
    count,
    checked,
    indeterminate,
    inactive,
    hide,
    onOptionChange,
    className,
    ...args
  } = props;
  const onCheckboxInput = useCallback(
    ({ currentTarget: { name, checked } }: React.FormEvent<HTMLInputElement>) => {
      return onOptionChange({ name, selected: checked });
    },
    [onOptionChange],
  );
  const styles = useStyles();
  return (
    // TODO
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...args}
      className={clsx(className, styles.root, inactive && styles.inactive, hide && styles.hide)}
    >
      <Checkbox
        name={name}
        checked={checked}
        onChange={onCheckboxInput}
        indeterminate={indeterminate}
        label={label}
      />
      <span className={styles.counter}>{count}</span>
    </div>
  );
};

export default CheckboxFilterOption;
