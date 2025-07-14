import { createReducer } from '@equinor/fusion-observable';

import { actions } from './TabsProvider.actions';
import type { TabsRouterState } from './TabsProvider.state';

/**
 * Retrieves the index of the active tab based on the provided tab ID.
 *
 * @param state - The current state of the tabs router.
 * @param tabId - The ID of the tab to find the index for.
 * @returns The index of the active tab, or -1 if the tab is not found.
 */
function getActiveTabIndex(state: TabsRouterState, tabId?: string): number {
  return state.tabsIds.findIndex((tab) => tab.replace(/\s+/g, '-').toLowerCase() === tabId);
}

export const makeReducer = (value: TabsRouterState) =>
  createReducer(value, (builder) => {
    builder
      .addCase(actions.initialize, (state, action) => {
        const { id, initialTab } = action.payload;

        state.id = id;
        if (initialTab) state.activeTab = initialTab;
      })
      .addCase(actions.setActiveTab, (state, action) => {
        if (!action.payload) return;
        state.activeTab = action.payload;
        state.activeTabIndex = getActiveTabIndex(state, action.payload);
      })
      .addCase(actions.setActiveTabIndex, (state, action) => {
        if (action.payload === undefined) return;
        state.activeTabIndex = action.payload;
        state.activeTab = state.tabsIds[action.payload];
      })
      .addCase(actions.setTabs, (state, action) => {
        state.tabsIds = action.payload.map((tab) => tab.replace(/\s+/g, '-').toLowerCase());
      });
  });

export default createReducer;
