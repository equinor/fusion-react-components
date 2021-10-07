import { ReactNode } from 'react';
import CheckBox from '@equinor/fusion-react-checkbox';

import { useStyles } from './CheckBoxOption.style';

type CheckboxOptionProps = {
  filterKey: string;
  onSelectionChange: (key: string, selected: boolean, singleSelect?: boolean) => void;
  selected: boolean;
  label: ReactNode;
  counter?: string | number;
  indeterminate?: boolean;
  compact?: boolean;
  singleSelect?: boolean;
};

export const CheckboxOption = ({
  filterKey,
  onSelectionChange,
  selected,
  label,
  counter,
  indeterminate,
  compact,
  singleSelect,
}: CheckboxOptionProps): JSX.Element => {
  const styles = useStyles();

  // TODO: @olerichard - when fusion-react-components support attribute filter, remove undefined from props
  return (
    <li className={styles.FilterOption} key={filterKey}>
      <CheckBox
        onInput={() => onSelectionChange(filterKey, selected)}
        checked={selected || undefined}
        reducedTouchTarget={compact}
        indeterminate={indeterminate || undefined}
      />
      <label onClick={() => onSelectionChange(filterKey, selected, singleSelect)} className={styles.FilterOptionLabel}>
        {label}
      </label>
      {counter && <label className={styles.FilterOptionCount}>{counter}</label>}
    </li>
  );
};

export default CheckboxOption;
