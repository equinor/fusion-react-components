import { useCallback } from 'react';

import { useObservableRef, useObservableState } from '@equinor/fusion-observable/react';

import { useCheckboxFilterOptionContext } from './context';

import { CheckboxFilterOption, type CheckboxFilterOptionProps } from './CheckboxFilterOption';

const defaultSortFn = <T extends { label: string }>(a: T, b: T) => a.label.localeCompare(b.label);

type CheckboxFilterOptionsProps = {
  readonly sortFn?: <T extends { label: string }>(a: T, b: T) => number;
};

export const CheckboxFilterOptions = ({ sortFn }: CheckboxFilterOptionsProps): JSX.Element => {
  const context = useCheckboxFilterOptionContext();
  const { value: data } = useObservableState(context.options$);
  const selectionRef = useObservableRef(context.selection$);

  const onOptionChange = useCallback(
    (item: { name: string; selected?: boolean }) => {
      const selection = new Set(selectionRef.current || []);
      const { name, selected } = item;
      if (selected) {
        selection.add(name);
      } else {
        selection.delete(name);
      }
      context.setSelection(selection.size ? selection : undefined);
    },
    [context, selectionRef],
  );

  const itemProps = Object.entries(data || {})
    .map(
      ([key, value]) =>
        ({
          onOptionChange,
          name: key,
          label: value.label,
          checked: !!value.selected,
          count:
            value.count === value.totalCount ? value.count : `${value.count} / ${value.totalCount}`,
          inactive: !value.count,
          hide: value.hide,
        }) as CheckboxFilterOptionProps,
    )
    .sort(sortFn ?? defaultSortFn);
  return (
    <>
      {itemProps.map((props) => (
        <CheckboxFilterOption key={props.name} {...props} />
      ))}
    </>
  );
};

export default CheckboxFilterOptions;
