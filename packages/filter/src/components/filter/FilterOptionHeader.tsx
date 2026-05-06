import { type FormEvent, type ReactElement, useLayoutEffect, useRef, useState } from 'react';

import { useObservableState, useObservableSelector } from '@equinor/fusion-observable/react';
import { TextField, Icon } from '@equinor/eds-core-react';
import { useFilterOptionContext, useFilterOptionSearch } from '../../options';

import { search, chevron_right } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

Icon.add({ search, chevron_right });

type FilterHeaderProps = {
  readonly title: string;
};

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
  `,
  Header: styled.header<{ $showSearch?: boolean }>`
    color: ${tokens.typography.table.cell_header.color};
    font-family: ${tokens.typography.table.cell_header.fontFamily};
    font-size: ${tokens.typography.table.cell_header.fontSize};
    font-weight: ${tokens.typography.table.cell_header.fontWeight};
    line-height: ${tokens.typography.table.cell_header.lineHeight};
    overflow: hidden;
    ${({ $showSearch }) => $showSearch && 'display: none;'}
  `,
  Counter: styled.span<{ $noCount?: boolean }>`
    display: ${({ $noCount }) => ($noCount ? 'none' : 'inline-flex')};
    gap: 1px;
    color: ${tokens.typography.input.helper.color};
    font-family: ${tokens.typography.input.helper.fontFamily};
    font-size: ${tokens.typography.input.helper.fontSize};
    font-weight: ${tokens.typography.input.helper.fontWeight};
    letter-spacing: ${tokens.typography.input.helper.letterSpacing};
    line-height: ${tokens.typography.input.helper.lineHeight};
    margin-left: ${tokens.spacings.comfortable.small};
  `,
  IconBtn: styled(Icon)`
    cursor: pointer;
    margin-left: auto;
  `,
  SearchField: styled(TextField)<{ $showSearch?: boolean }>`
    margin-top: 4px;
    flex: ${({ $showSearch }) => ($showSearch ? '1 1 auto' : 'none')};
    ${({ $showSearch }) =>
      !$showSearch &&
      `
      max-width: 0;
      overflow: hidden;
    `}
  `,
};

export const FilterOptionHeader = (props: FilterHeaderProps): ReactElement => {
  const { title } = props;
  const [showSearch, setShowSearch] = useState(false);
  const { setQuery, query$ } = useFilterOptionSearch();
  const searchRef = useRef<HTMLInputElement>(null);
  const { options$, selection$ } = useFilterOptionContext();
  const optionCount = Object.keys(useObservableState(options$).value || {}).length;
  const { value: selectedCount } = useObservableState(
    useObservableSelector(selection$, (x) => (x ?? new Set()).size),
    { initial: 0 },
  );

  const onIconClick = () => {
    if (showSearch) {
      setQuery('');
    } else {
      searchRef.current?.focus();
    }
    setShowSearch(!showSearch);
  };
  useLayoutEffect(() => {
    const subscription = query$.subscribe((x) => {
      if (searchRef.current) {
        searchRef.current.value = x;
      }
    });
    return () => subscription.unsubscribe();
  }, [query$]);

  return (
    <Styled.Root>
      <Styled.SearchField
        id={title}
        ref={searchRef}
        $showSearch={showSearch}
        type="search"
        placeholder={title}
        onInput={(e: FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
        inputIcon={<Icon name="search" key="thumbs" size={16} />}
      />
      <Styled.Header $showSearch={showSearch}>
        <span>{title}</span>
        <Styled.Counter $noCount={selectedCount === 0}>
          <span>(</span>
          <span>{selectedCount}</span>
          <span>/</span>
          <span>{optionCount}</span>
          <span>)</span>
        </Styled.Counter>
      </Styled.Header>
      <Styled.IconBtn
        name={showSearch ? 'chevron_right' : 'search'}
        size={16}
        onClick={onIconClick}
      />
    </Styled.Root>
  );
};

FilterOptionHeader.displayName = 'FilterOptionHeader';

export default FilterOptionHeader;
