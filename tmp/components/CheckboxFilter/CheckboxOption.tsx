import { useCallback } from 'react';

import { Checkbox, HTMLCheckboxCustomElement } from '@equinor/fusion-react-checkbox';

import { useStyles } from './CheckboxOption.style';

type CheckboxOptionProps = {
  filterKey: string;
  onChange: (key: string, checked: boolean) => void;
  selected: boolean;
  label: string;
  counter?: string | number;
  indeterminate?: boolean;
  compact?: boolean;
  disabled?: boolean;
};

export const CheckboxOption = ({
  filterKey,
  onChange,
  selected,
  label,
  counter,
  indeterminate,
  disabled,
  compact,
}: CheckboxOptionProps): JSX.Element => {
  const styles = useStyles();

  const onInput = useCallback(
    (e: React.FormEvent<HTMLCheckboxCustomElement>) => {
      const { name, checked } = e.currentTarget;
      onChange(name, !checked);
    },
    [onChange]
  );

  const size = compact ? 14 : undefined;

  return (
    <div className={styles.root}>
      <Checkbox
        className={styles.checkbox}
        checked={selected}
        indeterminate={indeterminate}
        label={label}
        name={filterKey}
        onInput={onInput}
        size={size}
        disabled={disabled}
        nowrap
      />
      <span className={styles.counter}>{counter}</span>
    </div>
  );
};

export default CheckboxOption;
