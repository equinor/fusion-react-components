import { FilterOptionSelector } from '../../../options/types';

import { CheckboxFilterProvider } from './CheckboxFilterProvider';
import CheckboxFilterOptions from './CheckboxFilterOptions';
import CheckboxFilterOptionAll from './CheckboxFilterOptionAll';

import { FilterOptionHeader } from '../FilterOptionHeader';

import useStyles from './CheckboxFilter.style';
import { FilterComponent } from '../types';

export type CheckboxFilterProps<TData extends Record<string, any> = Record<string, any>> = FilterComponent & {
  /** either name of property of data type or a function that selects value */
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  /** show option for selecting all */
  enableAll?: boolean;
  /** initial selection */
  initial?: Set<string>;
};

/**
 * Component for displaying multi-select filter with checkboxes
 */
export const CheckboxFilter = (props: CheckboxFilterProps): JSX.Element => {
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
