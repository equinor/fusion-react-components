import { useObservableState, useObservableSelector } from '@equinor/fusion-observable/react';
import { Icon } from '@equinor/fusion-react-icon';
import { HTMLTextInputCustomElement, TextInput } from '@equinor/fusion-react-textinput';
import { useFilterOptionContext, useFilterOptionSearch } from '../../options';

type FilterHeaderProps = {
  readonly title: string;
};

import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import React, { useLayoutEffect, useRef, useState } from 'react';

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
  const searchRef = useRef<HTMLTextInputCustomElement>(null);
  const { options$, selection$ } = useFilterOptionContext();
  const optionCount = Object.keys(useObservableState(options$) || {}).length;
  const { value: selectedCount } = useObservableState(useObservableSelector(selection$, (x) => x && x.size));
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
    const subscription = query$.subscribe((x) => searchRef.current && (searchRef.current.value = x));
    return () => subscription.unsubscribe();
  }, [searchRef, query$]);

  return (
    <div className={styles.root}>
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
      <Icon className={styles.iconBtn} icon={showSearch ? 'chevron_right' : 'search'} onClick={onIconClick} />
    </div>
  );
};

export default FilterOptionHeader;
