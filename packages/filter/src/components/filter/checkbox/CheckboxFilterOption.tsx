import { useCallback, type ReactElement, type HTMLAttributes, type FormEvent } from 'react';

import { Checkbox } from '@equinor/eds-core-react';

import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './CheckboxFilterOption.style';
import type { CheckboxOption } from './types';

export type CheckboxFilterOptionProps = Partial<HTMLAttributes<HTMLDivElement>> &
  Omit<CheckboxOption, 'totalCount'> & {
    readonly name: string;
    readonly checked?: boolean;
    readonly indeterminate?: boolean;
    readonly count: string | number;
    readonly onOptionChange: (item: { name: string; selected?: boolean }) => void;
  };

export const CheckboxFilterOption = (props: CheckboxFilterOptionProps): ReactElement => {
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
    ({ currentTarget: { name, checked } }: FormEvent<HTMLInputElement>) => {
      return onOptionChange({ name, selected: checked });
    },
    [onOptionChange],
  );
  const styles = useStyles();
  return (
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
