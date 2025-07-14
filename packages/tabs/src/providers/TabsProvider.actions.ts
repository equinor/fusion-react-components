import { type ActionInstanceMap, type ActionTypes, createAction } from '@equinor/fusion-observable';

const createActions = () => ({
  initialize: createAction('initialize', (args: { id: string; initialTab: string | null }) => ({
    payload: args,
  })),
  clear: createAction('clear', (id: string) => ({
    payload: { id },
  })),
  setActiveTab: createAction('set-active-tab', (tabId?: string) => ({
    payload: tabId?.replace(/\s+/g, '-').toLowerCase(),
  })),
  setActiveTabIndex: createAction('set-active-tab-index', (tabIndex: number) => ({
    payload: tabIndex,
  })),
  setTabs: createAction('set-tabs', (tabs: string[]) => ({ payload: tabs })),
  registerTabs: createAction(
    'register-tabs',
    (args: { id: string; activeTab?: string; tabs: string[] }) => ({
      payload: args,
    }),
  ),
});

export const actions = createActions();

export type ActionBuilder = ReturnType<typeof createActions>;

export type ActionMap = ActionInstanceMap<ActionBuilder>;

export type Actions = ActionTypes<typeof actions>;
