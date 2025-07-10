import type { ActionInstance, Effect } from "@equinor/fusion-observable";

import { updateCurrentUrlParams } from "../utils/update-current-url-params";
import { createTabRouterKey } from "./TabsProvider";
import type { actions } from "./TabsProvider.actions";
import type { FlowOptions } from "./TabsProvider.flows";
import type { TabsRouterState } from "./TabsProvider.state";

export const handleSetActiveTab =
  ({
    location,
  }: FlowOptions): Effect<ActionInstance<typeof actions.setActiveTab>, TabsRouterState> =>
  (action, state) => {
    const routerTabKey = createTabRouterKey(state.id);
    const url = new URL(location.href);
    if (action.payload && url.searchParams.get(routerTabKey) !== action.payload) {
      url.searchParams.set(routerTabKey, action.payload);
      history.replaceState(null, "", url);
    }
  };
export const handleSetActiveTabByIndex =
  ({
    location,
  }: FlowOptions): Effect<ActionInstance<typeof actions.setActiveTabIndex>, TabsRouterState> =>
  (action, state) => {
    const routerTabKey = createTabRouterKey(state.id);

    const url = new URL(location.href);
    const parm = url.searchParams.get(routerTabKey);

    const stateParm = state.tabsIds[action.payload];
    const index = state.tabsIds.findIndex((tab) => tab === parm);

    if (index !== action.payload) {
      const newUrl = updateCurrentUrlParams({ [routerTabKey]: stateParm });
      history.replaceState(null, "", newUrl);
    }
  };
