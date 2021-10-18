import { FilterOptionSelector } from '../../../options/types';

import { CheckboxFilterProvider } from './CheckboxFilterProvider';
import CheckboxFilterOptions from './CheckboxFilterOptions';
import CheckboxFilterOptionAll from './CheckboxFilterOptionAll';

import { FilterOptionHeader } from './FilterOptionHeader';

import useStyles from './CheckboxFilter.style';

export type CheckboxFilterProps<TData extends Record<string, any>> = {
  filterKey: string;
  selector?: Extract<keyof TData, string> | string | FilterOptionSelector<TData>;
  title: string;
};

export const CheckboxFilter = <TData extends Record<string, any>>(props: CheckboxFilterProps<TData>): JSX.Element => {
  const { title, ...args } = props;
  const styles = useStyles({ layout: 'column' });
  return (
    <CheckboxFilterProvider {...args}>
      <div className={styles.root}>
        <FilterOptionHeader title={title} />
        <div className={styles.items}>
          <CheckboxFilterOptionAll />
          <CheckboxFilterOptions />
        </div>
      </div>
    </CheckboxFilterProvider>
  );
};

export default CheckboxFilter;
