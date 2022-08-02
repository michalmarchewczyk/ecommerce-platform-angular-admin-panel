import { createSelector } from '@ngrx/store';
import * as fromStatus from '../reducers/status.reducer';
import { selectUsersState } from './index';

export const selectUsersStatusState = createSelector(
  selectUsersState,
  (state) => state[fromStatus.statusFeatureKey],
);

export const selectUsersError = createSelector(
  selectUsersStatusState,
  (state) => state.error,
);

export const selectUsersLoading = createSelector(
  selectUsersStatusState,
  (state) => state.loading,
);
