import { FilterOptionBuilder, FilterOptionSelector } from '../../../options';

import type { FilterComponent } from '../types';
import { FilterOptionHeader } from '../FilterOptionHeader';

import { CheckboxFilterProvider } from './CheckboxFilterProvider';
import CheckboxFilterOptions from './CheckboxFilterOptions';
import CheckboxFilterOptionAll from './CheckboxFilterOptionAll';

import useStyles from './CheckboxFilter.style';
import { CheckboxOption } from './types';
import type { FilterFn } from '../../../types';

export type CheckboxFilterProps<TData extends Record<string, any> = Record<string, any>> = FilterComponent & {
  /** either name of property of data type or a function that selects value */
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  /** show option for selecting all */
  enableAll?: boolean;
  /** initial selection */
  initial?: Set<string>;
  // TODO: FIX - Both a filterFn and an optionFn may be provided instead of a selector
  // the optionFn will build the filter options based on the input data, where the filterFn
  // will apply the options respective filters on selection.
  filter?: {
    filterFn: FilterFn<TData, Set<string>>;
    optionFn: FilterOptionBuilder<TData, CheckboxOption, string>;
  };
};

/**
 * Component for displaying multi-select filter with checkboxes
 */
export const CheckboxFilter = <TData extends Record<string, any> = Record<string, any>>(
  props: CheckboxFilterProps<TData>
): JSX.Element => {
  const { enableAll, ...args } = props;
  const styles = useStyles({ layout: 'column' });
  return (
    <CheckboxFilterProvider {...args}>
      <div className={styles.root}>
        <FilterOptionHeader title={args.title} />
        <div className={styles.items}>
          {enableAll && <CheckboxFilterOptionAll />}
          <CheckboxFilterOptions />
        </div>
      </div>
    </CheckboxFilterProvider>
  );
};

export default CheckboxFilter;
