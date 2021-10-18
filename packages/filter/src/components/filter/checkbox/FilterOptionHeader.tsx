import { useObservableState } from '@equinor/fusion-react-observable';
import { Icon } from '@equinor/fusion-react-icon';
import { HTMLTextInputCustomElement, TextInput } from '@equinor/fusion-react-textinput';
import { useFilterOptionContext, useFilterOptionSearch } from '../../../options';

type FilterHeaderProps = {
  title: string;
};

import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import React, { useLayoutEffect, useRef, useState } from 'react';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      header: {
        ...theme.typography.table.cell_header.style,
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
      },
      searchField: {
        marginTop: '4px',
        '&:not($showSearch)': {
          width: 0,
          overflow: 'hidden',
        },
      },
    }),
  { name: 'fusion-filter-header' }
);

export const FilterOptionHeader = (props: FilterHeaderProps): JSX.Element => {
  const { title } = props;
  const [showSearch, setShowSearch] = useState(false);
  const { setQuery, query$ } = useFilterOptionSearch();
  const searchRef = useRef<HTMLTextInputCustomElement>(null);
  const { options$, selection$ } = useFilterOptionContext();
  const optionCount = Object.keys(useObservableState(options$) || {}).length;
  const selectedCount = Object.keys(useObservableState(selection$) || {}).length;
  const styles = useStyles();
  const onIconClick = () => {
    if (showSearch) {
      setQuery('');
      searchRef.current?.click();
    }
    setShowSearch(!showSearch);
  };
  useLayoutEffect(() => {
    const subscription = query$.subscribe((x) => searchRef.current && (searchRef.current.value = x));
    return () => subscription.unsubscribe();
  }, [searchRef, query$]);

  return (
    <div className={styles.root}>
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
      <TextInput
        ref={searchRef}
        className={clsx(styles.searchField, showSearch && styles.showSearch)}
        icon="search"
        variant="outlined"
        type="search"
        label={title}
        onInput={(e) => setQuery(e.currentTarget.value)}
        dense
      />
      <Icon className={styles.iconBtn} icon={showSearch ? 'close' : 'search'} onClick={onIconClick} />
    </div>
  );
};

export default FilterOptionHeader;
