import { ReactNode } from 'react';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import CheckBox from '@equinor/fusion-react-checkbox';

const useStyles = makeStyles(() =>
  createStyles({
    FilterOption: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    FilterOptionLabel: {
      flex: 1,
      overflow: 'hidden',
      height: '100%',
      cursor: 'pointer',
      alignItems: 'center',
      textOverflow: 'ellipsis',
    },
    FilterOptionCount: {
      wordBreak: 'keep-all',
      display: 'flex',
      padding: '8px',
      justifyContent: 'flex-end',
    },
  })
);

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

const CheckboxOption = ({
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

  return (
    <li className={styles.FilterOption} key={filterKey}>
      <span onClick={() => onSelectionChange(filterKey, selected)}>
        <CheckBox
          checked={selected || undefined}
          reducedTouchTarget={compact}
          indeterminate={indeterminate || undefined}
        />
      </span>
      <label onClick={() => onSelectionChange(filterKey, selected, singleSelect)} className={styles.FilterOptionLabel}>
        {label}
      </label>
      {counter && <label className={styles.FilterOptionCount}>{counter}</label>}
    </li>
  );
};

export default CheckboxOption;
