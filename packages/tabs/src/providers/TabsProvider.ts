import type { FlowSubject, Observable } from '@equinor/fusion-observable';
import { type Actions, actions } from './TabsProvider.actions';
import { type TabsRouterState, createState } from './TabsProvider.state';

/**
 * Interface representing a Tabs Provider.
 * The `TabsProvider` is a class that manages the state and behavior of a tabbed interface.
 * It provides methods to set the active tab, set the active tab index, set the list of tabs,
 * clear the state, and initialize the provider.
 *
 * It uses a state management system (`FlowSubject`) to handle state changes and actions.
 *
 * @interface ITabsProvider
 */
export interface ITabsProvider {
  /**
   * Sets the active tab by its ID.
   * @param tabId - The ID of the tab to set as active.
   */
  setActiveTab(tabId?: string): void;

  /**
   * Sets the active tab index.
   * @param index - The index of the tab to set as active.
   */
  setActiveTabIndex(index: number): void;

  /**
   * Sets the list of tabs.
   * @param tabs - An array of tab IDs.
   */
  setTabs(tabs: string[]): void;

  /**
   * An observable of the active tab index.
   */
  readonly activeTabIndex$: Observable<number>;

  /**
   * Clears the state of the tabs.
   */
  clear(): void;

  /**
   * Initializes the provider with the initial tab from the URL.
   */
  initialize(href: string): void;
}

export const ROUTER_TAB_KEY = 'tab';

export const createTabRouterKey = (id: string) => `${ROUTER_TAB_KEY}[${id}]`;

export class TabsProvider implements ITabsProvider {
  #state: FlowSubject<TabsRouterState, Actions>;

  constructor(init: Omit<TabsRouterState, 'activeTabIndex' | 'tabsIds'>, location: Location) {
    this.#state = createState({ ...init, activeTabIndex: 0, tabsIds: [] }, { location });
  }

  get activeTabIndex$() {
    return this.#state.select((state) => state.activeTabIndex);
  }

  initialize = (href: string) => {
    const url = new URL(href);
    this.#state.next(
      actions.initialize({
        id: this.#state.value.id,
        initialTab: url.searchParams.get(createTabRouterKey(this.#state.value.id)),
      }),
    );
  };

  registerTabs = (id: string, tabs: string[], activeTab?: string) => {
    this.#state.next(actions.registerTabs({ id, tabs, activeTab }));
  };

  setActiveTab = (tabId?: string) => {
    this.#state.next(actions.setActiveTab(tabId));
  };

  setActiveTabIndex = (index: number) => {
    this.#state.next(actions.setActiveTabIndex(index));
  };

  setTabs = (tabs: string[]) => {
    this.#state.next(actions.setTabs(tabs));
  };

  clear = () => {
    this.#state.next(actions.clear(this.#state.value.id));
  };
}
