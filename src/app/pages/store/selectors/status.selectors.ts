import { createSelector } from '@ngrx/store';
import { selectPagesState } from './index';
import * as fromStatus from '../reducers/status.reducer';

export const selectPagesStatusState = createSelector(
  selectPagesState,
  (state) => state[fromStatus.statusFeatureKey],
);

export const selectPagesError = createSelector(
  selectPagesStatusState,
  (state) => state.error,
);

export const selectPagesLoading = createSelector(
  selectPagesStatusState,
  (state) => state.loading,
);
