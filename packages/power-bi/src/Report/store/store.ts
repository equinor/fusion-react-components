import { FlowSubject, type ActionPayloadType } from '@equinor/fusion-observable';

import { type Actions, actions } from './actions';
import { makeReducer } from './reducer';
import { flows } from './flows';

import type { State } from './types';
import type { ApiClient } from '../../types';

type CheckAccess = Pick<ActionPayloadType<typeof actions.contextAccess.checkAccess>, 'externalId' | 'type' | 'silent'>;

export class Store extends FlowSubject<State, Actions> {
  set contextAccess(value: boolean) {
    this.next(actions.contextAccess.setAccess(value));
  }

  constructor(id: string, args: { apiClient: ApiClient }) {
    super(
      makeReducer({
        id,
        errors: [],
        status: [],
      }),
    );
    flows(args).map((flow) => this.addFlow(flow));
  }

  requestEmbedInfo(): VoidFunction {
    this.next(actions.embedInfo.fetch(this.value.id));
    return (reason?: string) => this.next(actions.embedInfo.cancel(reason));
  }

  requestAccessToken(silent?: boolean): VoidFunction {
    this.next(actions.accessToken.fetch({ reportId: this.value.id, silent: !!silent }));
    return (reason?: string) => this.next(actions.accessToken.cancel(reason));
  }

  checkContextAccess(args: CheckAccess): VoidFunction {
    this.next(actions.contextAccess.checkAccess({ reportId: this.value.id, ...args }));
    return (reason?: string) => this.next(actions.contextAccess.cancel(reason));
  }
}

export default Store;
