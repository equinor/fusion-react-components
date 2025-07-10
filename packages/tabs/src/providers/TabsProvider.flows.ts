import type { Flow } from "@equinor/fusion-observable";
import { filter, of, switchMap } from "rxjs";
import { createTabRouterKey } from "./TabsProvider";
import { type Actions, actions } from "./TabsProvider.actions";
import type { TabsRouterState } from "./TabsProvider.state";

export const ROUTER_KEY_TAB = "extension-tab";
export const ROUTER_KEY_PAGE = "extension-page";

export type FlowOptions = {
  location: Location;
};

export const handleInitial =
  ({ location }: FlowOptions): Flow<Actions, TabsRouterState> =>
  (action$) =>
    action$.pipe(
      filter(actions.initialize.match),
      switchMap((action) => {
        const url = new URL(location.href);

        const routerTabKey = createTabRouterKey(action.payload.id);
        const initialTab = url.searchParams.get(routerTabKey);

        return of(actions.setActiveTab(initialTab || undefined));
      }),
    );

export const handleClear =
  ({ location }: FlowOptions): Flow<Actions, TabsRouterState> =>
  (action$) =>
    action$.pipe(
      filter(actions.clear.match),
      switchMap((action) => {
        const url = new URL(location.href);
        const routerTabKey = createTabRouterKey(action.payload.id);
        url.searchParams.delete(routerTabKey);
        history.replaceState(null, "", url);
        return of(actions.setActiveTab(undefined));
      }),
    );
