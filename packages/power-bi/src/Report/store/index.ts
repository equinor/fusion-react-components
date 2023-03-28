import { ApiClient } from '../../types';

import { Store } from './store';
import { reducer } from './reducers';
import { epic } from './epics';
import { State } from './state';

export const createStore = (id: string, clients: ApiClient): Store => {
  const initial: State = { id, errors: [], status: [] };
  return new Store(reducer, epic, initial, { clients });
};

export { Store, State };
export { Actions, actions } from './actions';

export default createStore;
