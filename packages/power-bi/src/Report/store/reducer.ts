import { createReducer } from '@equinor/fusion-observable';

import { actions, type Actions } from './actions';

import { type State, Status } from './types';

const removeError = (state: State, action: Actions) => {
  state.errors = state.errors.filter((x) => x.action.type !== action.type);
};

const removeStatus = (state: State, status: Status) => {
  state.status = state.status.filter((x) => x !== status);
};

export const makeReducer = (initial: State) =>
  createReducer<State, Actions>(initial, (builder) => {
    /** ======= ACCESS TOKEN ========= */
    builder
      .addCase(actions.accessToken.fetch, (state, action) => {
        if (!action.payload.silent) {
          state.status.push(Status.AcquiringAccessToken);
        }
        removeError(state, action);
      })
      .addCase(actions.accessToken.fetch.success, (state, action) => {
        state.token = action.payload;
        removeStatus(state, Status.AcquiringAccessToken);
      })
      .addCase(actions.accessToken.fetch.failure, (state, action) => {
        removeStatus(state, Status.AcquiringAccessToken);
        state.errors.push(action.payload);
      })
      .addCase(actions.accessToken.cancel, (state) => {
        removeStatus(state, Status.AcquiringAccessToken);
      });

    // TODO actions.accessToken.refresh not handled

    /** ======= CONTEXT ACCESS ========= */
    builder
      .addCase(actions.contextAccess.checkAccess, (state, action) => {
        state.hasContextAccess = undefined;
        if (!action.payload.silent) {
          state.status.push(Status.AccessCheck);
        }
        removeError(state, action);
      })
      .addCase(actions.contextAccess.checkAccess.success, (state) => {
        state.hasContextAccess = true;
        removeStatus(state, Status.AccessCheck);
      })
      .addCase(actions.contextAccess.checkAccess.failure, (state, action) => {
        state.hasContextAccess = false;
        removeStatus(state, Status.AccessCheck);
        state.errors.push(action.payload);
      })
      .addCase(actions.contextAccess.cancel, (state) => {
        removeStatus(state, Status.AccessCheck);
      })
      .addCase(actions.contextAccess.setAccess, (state, action) => {
        state.hasContextAccess = action.payload;
      });

    /** ======= EMBED INFO ======== */
    builder
      .addCase(actions.embedInfo.fetch, (_, action) => ({
        id: action.payload,
        status: [Status.LoadingEmbedInfo],
        errors: [],
      }))
      .addCase(actions.embedInfo.fetch.success, (state, action) => {
        state.embedInfo = action.payload.embedConfig;
        removeStatus(state, Status.LoadingEmbedInfo);
        removeError(state, action);
      })
      .addCase(actions.embedInfo.fetch.failure, (state, action) => {
        removeStatus(state, Status.LoadingEmbedInfo);
        state.errors.push(action.payload);
      })
      .addCase(actions.embedInfo.cancel, (state) => {
        removeStatus(state, Status.LoadingEmbedInfo);
      });
  });
