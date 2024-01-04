import { type State, Status } from './types';
import { type Actions, actions } from './actions';
import { createReducer } from '@equinor/fusion-observable';

const removeError = (state: State, action: Actions) => {
  state.errors = state.errors.filter((x) => x.action.type !== action.type);
};

export const makeReducer = (id: string) => {
  const initial: State = { id, errors: [], status: new Set() };
  return createReducer(initial, (builder) => {
    /** ===== report ====== */
    builder
      .addCase(actions.report.fetch, (state, action) => {
        state.status.add(Status.LoadingReport);
        removeError(state, action);
      })
      .addCase(actions.report.fetch.success, (state, action) => {
        state.report = action.payload;
        state.status.delete(Status.LoadingReport);
      })
      .addCase(actions.report.fetch.failure, (state, action) => {
        state.errors.push(action.payload);
        state.status.delete(Status.LoadingReport);
      })
      .addCase(actions.report.cancel, (state) => {
        state.status.delete(Status.LoadingReport);
      });

    /** ===== description ====== */
    builder
      .addCase(actions.description.fetch, (state, action) => {
        state.status.add(Status.LoadingDescription);
        removeError(state, action);
      })
      .addCase(actions.description.fetch.success, (state, action) => {
        state.description = action.payload;
        state.status.delete(Status.LoadingDescription);
      })
      .addCase(actions.description.fetch.failure, (state, action) => {
        state.errors.push(action.payload);
        state.status.delete(Status.LoadingDescription);
      })
      .addCase(actions.description.cancel, (state) => {
        state.status.delete(Status.LoadingDescription);
      });

    /** ===== access description ====== */
    builder
      .addCase(actions.accessDescription.fetch, (state, action) => {
        state.status.add(Status.LoadingAccessDescription);
        removeError(state, action);
      })
      .addCase(actions.accessDescription.fetch.success, (state, action) => {
        state.accessDescription = action.payload;
        state.status.delete(Status.LoadingAccessDescription);
      })
      .addCase(actions.accessDescription.fetch.failure, (state, action) => {
        state.errors.push(action.payload);
        state.status.delete(Status.LoadingAccessDescription);
      })
      .addCase(actions.accessDescription.cancel, (state) => {
        state.status.delete(Status.LoadingAccessDescription);
      });

    /** ===== access requirements ====== */
    builder
      .addCase(actions.requirements.fetch, (state, action) => {
        state.status.add(Status.LoadingRequirements);
        removeError(state, action);
      })
      .addCase(actions.requirements.fetch.success, (state, action) => {
        state.accessDescription = action.payload;
        state.status.delete(Status.LoadingRequirements);
      })
      .addCase(actions.requirements.fetch.failure, (state, action) => {
        state.errors.push(action.payload);
        state.status.delete(Status.LoadingRequirements);
      })
      .addCase(actions.requirements.cancel, (state) => {
        state.status.delete(Status.LoadingRequirements);
      });
  });
};

export default makeReducer;
