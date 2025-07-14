import { FlowSubject } from '@equinor/fusion-observable';
import { type Actions, actions } from './TabsProvider.actions';
import { handleSetActiveTab, handleSetActiveTabByIndex } from './TabsProvider.effect';
import { type FlowOptions, handleClear, handleInitial } from './TabsProvider.flows';
import { makeReducer } from './TabsProvider.reducer';

export type TabsRouterState = {
  activeTabIndex: number;
  activeTab?: string;
  tabsIds: string[];
  id: string;
};

export const createState = (
  initial: TabsRouterState,
  options: FlowOptions,
): FlowSubject<TabsRouterState, Actions> => {
  const reducer = makeReducer(initial);
  const state = new FlowSubject<TabsRouterState, Actions>(reducer);

  // Flows
  state.addFlow(handleInitial(options));
  state.addFlow(handleClear(options));

  // Effects
  state.addEffect(actions.setActiveTab.type, handleSetActiveTab(options));
  state.addEffect(actions.setActiveTabIndex.type, handleSetActiveTabByIndex(options));

  return state;
};
