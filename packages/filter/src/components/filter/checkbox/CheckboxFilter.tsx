import type { ReactElement } from 'react';
import type { FilterOptionBuilder, FilterOptionSelector } from '../../../options';

import type { FilterComponent } from '../types';
import { FilterOptionHeader } from '../FilterOptionHeader';

import { CheckboxFilterProvider } from './CheckboxFilterProvider';
import CheckboxFilterOptions from './CheckboxFilterOptions';
import CheckboxFilterOptionAll from './CheckboxFilterOptionAll';

import useStyles from './CheckboxFilter.style';
import type { CheckboxOption } from './types';
import type { FilterFn } from '../../../types';

// biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
export type CheckboxFilterProps<TData extends Record<string, any> = Record<string, any>> =
  FilterComponent & {
    /** either name of property of data type or a function that selects value */
    readonly selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
    /** show option for selecting all */
    readonly enableAll?: boolean;
    /** initial selection */
    readonly initial?: Set<string>;
    // TODO: FIX - Both a filterFn and an optionFn may be provided instead of a selector
    // the optionFn will build the filter options based on the input data, where the filterFn
    // will apply the options respective filters on selection.
    readonly filter?: {
      filterFn: FilterFn<TData, Set<string>>;
      optionFn: FilterOptionBuilder<TData, CheckboxOption, string>;
    };
    readonly sortFn?: <T extends { label: string }>(a: T, b: T) => number;
  };

/**
 * Component for displaying multi-select filter with checkboxes
 */
// biome-ignore lint/suspicious/noExplicitAny: we need any here to avoid type errors
export const CheckboxFilter = <TData extends Record<string, any> = Record<string, any>>(
  props: CheckboxFilterProps<TData>,
): ReactElement => {
  const { enableAll, sortFn, ...args } = props;
  const styles = useStyles({ layout: 'column' });
  return (
    <CheckboxFilterProvider {...args}>
      <div className={styles.root}>
        <FilterOptionHeader title={args.title} />
        <div className={styles.items}>
          {enableAll && <CheckboxFilterOptionAll />}
          <CheckboxFilterOptions sortFn={sortFn} />
        </div>
      </div>
    </CheckboxFilterProvider>
  );
};

export default CheckboxFilter;
