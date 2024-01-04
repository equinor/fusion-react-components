import { FlowSubject } from '@equinor/fusion-observable';

import { makeReducer } from './reducer';
import { type Actions, actions } from './actions';
import { createFlows } from './flows';

import type { ApiClient } from '../../types';
import type { State } from './types';

export class Store extends FlowSubject<State, Actions> {
  constructor(args: { id: string; apiClient: ApiClient }) {
    super(makeReducer(args.id));
    this.addFlow(createFlows(args.apiClient));
  }
  initialize() {
    [
      actions.report.fetch,
      actions.description.fetch,
      actions.accessDescription.fetch,
      actions.requirements.fetch,
    ].forEach((action) => this.next(action()));
    return () =>
      [
        actions.report.cancel,
        actions.description.cancel,
        actions.accessDescription.cancel,
        actions.requirements.cancel,
      ].forEach((action) => this.next(action('initialize aborted!')));
  }
}

export default Store;
