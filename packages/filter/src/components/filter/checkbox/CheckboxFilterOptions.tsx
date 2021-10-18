import { useCallback } from 'react';

import { useObservableRef, useObservableState } from '@equinor/fusion-react-observable';

import { useCheckboxFilterOptionContext } from './context';

import { CheckboxFilterOption, CheckboxFilterOptionProps } from './CheckboxFilterOption';

// TODO - make arg!
const sortFn = <T extends { label: string }>(a: T, b: T) => a.label.localeCompare(b.label);

export const CheckboxFilterOptions = (): JSX.Element => {
  const context = useCheckboxFilterOptionContext();
  const data = useObservableState(context.options$);
  const selectionRef = useObservableRef(context.selection$);

  const onOptionChange = useCallback(
    (item: { name: string; selected?: boolean }) => {
      const { name, selected } = item;
      const selection = { ...(selectionRef.current || {}) };
      if (selected) {
        selection[name] = {};
      } else {
        delete selection[name];
      }
      context.setSelection(selection);
    },
    [context, selectionRef]
  );

  const itemProps = Object.entries(data || {})
    .map(
      ([key, value]) =>
        ({
          onOptionChange,
          name: key,
          label: value.label,
          checked: !!value.selected,
          count: value.count === value.totalCount ? value.count : `${value.count} / ${value.totalCount}`,
          inactive: !value.count,
          hide: value.hide,
        } as CheckboxFilterOptionProps)
    )
    .sort(sortFn);
  return (
    <>
      {itemProps.map((props) => (
        <CheckboxFilterOption key={props.name} {...props} />
      ))}
    </>
  );
};

export default CheckboxFilterOptions;
