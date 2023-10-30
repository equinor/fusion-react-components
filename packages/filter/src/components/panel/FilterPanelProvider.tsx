import { type FlowSubject } from '@equinor/fusion-observable';
import { useObservable } from '@equinor/fusion-observable/react';
import { ReactElement, createContext, useContext, useState } from 'react';

import { FilterComponent } from '../filter';
import FilterPanelSelector from './FilterPanelSelector';

import { createAction, createReducer, ActionType } from 'typesafe-actions';

export type FilterPanelProviderContext = {
  filters$: FlowSubject<State, Actions>;
  showFilters?: boolean;
  setShowFilters: (show: boolean) => void;
};

const context = createContext<FilterPanelProviderContext | null>(null);
const { Provider, Consumer } = context as { Provider: any; Consumer: any };

export { Consumer as FilterPanelConsumer };

export const useFilterPanelContext = (): FilterPanelProviderContext =>
  useContext(context) as FilterPanelProviderContext;

export const actions = {
  add: createAction('@FILTER_PANEL/FILTER_SELECTION_ADD')<string>(),
  remove: createAction('@FILTER_PANEL/FILTER_SELECTION_REMOVE')<string>(),
};

type Actions = ActionType<typeof actions>;
type State = {
  selectedFilters: Set<string>;
  filters: ReactElement<FilterComponent>[];
};

export const initialState: State = {
  selectedFilters: new Set([]),
  filters: [],
};

const reducer = createReducer<State, Actions>(initialState)
  .handleAction(actions.add, (state, { payload }) => {
    state.selectedFilters.add(payload);
    return { ...state, selected: new Set(state.selectedFilters) };
  })
  .handleAction(actions.remove, (state, { payload }) => {
    state.selectedFilters.delete(payload);
    return { ...state, selected: new Set(state.selectedFilters) };
  });

type FilterPanelProviderProps = React.PropsWithChildren<{
  filters: ReactElement<FilterComponent>[];
  FilterSelector?: typeof FilterPanelSelector;
  initialSelectedFilters?: string[];
  showFilters?: boolean;
}>;

export const FilterPanelProvider = (props: FilterPanelProviderProps): JSX.Element => {
  const filters$ = useObservable(reducer, {
    selectedFilters: new Set(props.initialSelectedFilters),
    filters: props.filters,
  });

  const [showFilters, setShowFilters] = useState(props.showFilters);

  return <Provider value={{ filters$, showFilters, setShowFilters }}>{props.children}</Provider>;
};

export default FilterPanelProvider;
