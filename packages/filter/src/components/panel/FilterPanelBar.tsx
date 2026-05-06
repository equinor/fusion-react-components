import type { HTMLAttributes, ReactElement } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { chevron_up, chevron_down, refresh } from '@equinor/eds-icons';

import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import type { FilterFn } from '../../types';
import { SearchFilter } from '../filter';
import { ClearFilterButton } from '../misc';
import { useFilterPanelContext } from './FilterPanelProvider';

Icon.add({ chevron_down, chevron_up, refresh });

const Styled = {
  Root: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${tokens.spacings.comfortable.medium};
  `,
  Actions: styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: ${tokens.spacings.comfortable.medium};
  `,
  ResetBtn: styled(ClearFilterButton)`
    &[disabled] {
      display: none;
    }
  `,
  SearchWrapper: styled.div`
    --textinput-dense-size: 36px;
  `,
};

type FilterPanelBarProps<TData> = HTMLAttributes<HTMLDivElement> & {
  readonly searchFn?: FilterFn<TData, string>;
};

export const FilterPanelBar = <TData,>(props: FilterPanelBarProps<TData>): ReactElement => {
  const { className, searchFn, ...args } = props;
  const { showFilters, setShowFilters } = useFilterPanelContext();

  return (
    <Styled.Root {...args} className={className}>
      <Styled.SearchWrapper>
        <SearchFilter filterKey="global" label="Search all" filterFn={searchFn} />
      </Styled.SearchWrapper>
      <Styled.Actions>
        <Styled.ResetBtn variant="ghost">
          Reset Filters
          <Icon name="refresh" />
        </Styled.ResetBtn>
        <Button
          icon={showFilters ? 'chevron_up' : 'chevron_down'}
          onClick={() => setShowFilters(!showFilters)}
          variant="outlined"
          trailingIcon
        >
          {showFilters ? 'Hide filters' : 'Show filters'}
          <Icon name={showFilters ? 'chevron_up' : 'chevron_down'} />
        </Button>
      </Styled.Actions>
    </Styled.Root>
  );
};

FilterPanelBar.displayName = 'FilterPanelBar';

export default FilterPanelBar;
