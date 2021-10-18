import { useCallback, useRef } from 'react';

import { useObservableState } from '@equinor/fusion-react-observable';

import { useCheckboxFilterOptionContext } from './context';
import CheckboxFilterOption from './CheckboxFilterOption';

export const CheckboxFilterOptionAll = (): JSX.Element => {
  const { options$, selection$, setSelection } = useCheckboxFilterOptionContext();
  const options = useObservableState(options$) || {};

  const optionKeysRef = useRef<string[]>([]);
  optionKeysRef.current = Object.keys(options);

  const selectedKeys = Object.keys(useObservableState(selection$) || {});

  const { totalCount } = Object.values(options || {}).reduce(
    (acc, value) => {
      acc.count += value.count;
      acc.totalCount += value.totalCount;
      return acc;
    },
    { count: 0, totalCount: 0 }
  );

  const checked = selectedKeys.length === optionKeysRef.current.length;
  const indeterminate = Boolean(selectedKeys.length && !checked);
  const onOptionChange = useCallback(
    ({ selected }: { name: string; selected?: boolean }) => {
      setSelection(selected ? optionKeysRef.current.reduce((acc, key) => Object.assign(acc, { [key]: {} }), {}) : {});
    },
    [setSelection, optionKeysRef]
  );

  return (
    <CheckboxFilterOption
      name="all"
      label="all"
      indeterminate={indeterminate}
      checked={checked}
      count={totalCount}
      onOptionChange={onOptionChange}
    />
  );
};

export default CheckboxFilterOptionAll;
