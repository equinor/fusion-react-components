import { FilterOptionSelector } from '../../../options/types';

import { CheckboxFilterProvider } from './CheckboxFilterProvider';
import CheckboxFilterOptions from './CheckboxFilterOptions';

import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import CheckboxFilterOptionAll from './CheckboxFilterOptionAll';

import { FilterOptionHeader } from './FilterOptionHeader';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexFlow: 'column',
        // TODO - remove
        minWidth: 250,
      },
      items: (props: { layout: 'column' | 'row' }) => ({
        display: 'flex',
        flexFlow: props.layout,
        overflowY: 'scroll',
      }),

      title: {
        ...theme.typography.heading.h3.style,
      },
    }),
  { name: 'fusion-filter-checkbox-option' }
);

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
