import { type FormEvent, useLayoutEffect, useRef, useState } from 'react';

import { useObservableState, useObservableSelector } from '@equinor/fusion-observable/react';
import { TextField, Icon } from '@equinor/eds-core-react';
import { useFilterOptionContext, useFilterOptionSearch } from '../../options';

import { search, chevron_right } from '@equinor/eds-icons';

Icon.add({ search, chevron_right });

type FilterHeaderProps = {
  readonly title: string;
};

import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
      },
      header: {
        ...theme.typography.table.cell_header.style,
        overflow: 'hidden',
        '&$showSearch': {
          display: 'none',
        },
      },
      showSearch: {},
      counter: {
        display: 'inline-flex',
        gap: '1px',
        ...theme.typography.input.helper.style,
        marginLeft: theme.spacing.comfortable.small.getVariable('padding'),
      },
      noCount: {
        display: 'none',
      },
      iconBtn: {
        cursor: 'pointer',
        marginLeft: 'auto',
      },
      searchField: {
        marginTop: '4px',
        flex: '1 1 auto',
        '&:not($showSearch)': {
          maxWidth: 0,
          flex: 'none',
          overflow: 'hidden',
        },
      },
    }),
  { name: 'fusion-filter-header' },
);

export const FilterOptionHeader = (props: FilterHeaderProps): JSX.Element => {
  const { title } = props;
  const [showSearch, setShowSearch] = useState(false);
  const { setQuery, query$ } = useFilterOptionSearch();
  const searchRef = useRef<HTMLInputElement>(null);
  const { options$, selection$ } = useFilterOptionContext();
  const optionCount = Object.keys(useObservableState(options$).value || {}).length;
  const { value: selectedCount } = useObservableState(
    useObservableSelector(selection$, (x) => (x ?? new Set()).size > 0),
  );
  const styles = useStyles();
  const onIconClick = () => {
    if (showSearch) {
      setQuery('');
    } else {
      searchRef.current?.focus();
    }
    setShowSearch(!showSearch);
  };
  useLayoutEffect(() => {
    const subscription = query$.subscribe(
      (x) => searchRef.current && (searchRef.current.value = x),
    );
    return () => subscription.unsubscribe();
  }, [query$]);

  return (
    <div className={styles.root}>
      <TextField
        id={title}
        ref={searchRef}
        className={clsx(styles.searchField, showSearch && styles.showSearch)}
        type="search"
        placeholder={title}
        onInput={(e: FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
        inputIcon={<Icon name="search" key="thumbs" size={16} />}
      />
      <header className={clsx(styles.header, showSearch && styles.showSearch)}>
        <span>{title}</span>
        <span className={clsx(styles.counter, !selectedCount && styles.noCount)}>
          <span>(</span>
          <span>{selectedCount}</span>
          <span>/</span>
          <span>{optionCount}</span>
          <span>)</span>
        </span>
      </header>
      <Icon
        className={styles.iconBtn}
        name={showSearch ? 'chevron_right' : 'search'}
        size={16}
        onClick={onIconClick}
      />
    </div>
  );
};

export default FilterOptionHeader;
