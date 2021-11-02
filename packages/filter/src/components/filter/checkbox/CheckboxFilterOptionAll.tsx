import { useCallback } from 'react';

import { useObservableRef, useObservableState, useSelector } from '@equinor/fusion-react-observable';

import { useCheckboxFilterOptionContext } from './context';
import CheckboxFilterOption from './CheckboxFilterOption';

export const CheckboxFilterOptionAll = (): JSX.Element => {
  const { options$, selection$, setSelection } = useCheckboxFilterOptionContext();
  const options = useObservableState(options$) || {};
  const optionKeysRef = useObservableRef(useSelector(options$, (x) => Object.keys(x)));

  const selectedKeys = useObservableState(selection$) || new Set([]);

  const { totalCount } = Object.values(options || {}).reduce(
    (acc, value) => {
      acc.count += value.count;
      acc.totalCount += value.totalCount;
      return acc;
    },
    { count: 0, totalCount: 0 }
  );

  const checked = selectedKeys.size === optionKeysRef.current?.length;
  const indeterminate = Boolean(selectedKeys.size && !checked);
  const onOptionChange = useCallback(
    ({ selected }: { name: string; selected?: boolean }) => {
      setSelection(selected ? new Set(optionKeysRef.current) : new Set([]));
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
