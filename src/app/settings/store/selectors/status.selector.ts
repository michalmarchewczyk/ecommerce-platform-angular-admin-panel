import { createSelector } from '@ngrx/store';
import { selectSettingsState } from './index';
import * as fromStatus from '../reducers/status.reducer';

export const selectSettingsStatusState = createSelector(
  selectSettingsState,
  (state) => state[fromStatus.statusFeatureKey],
);

export const selectSettingsError = createSelector(
  selectSettingsStatusState,
  (state) => state.error,
);

export const selectSettingsLoading = createSelector(
  selectSettingsStatusState,
  (state) => state.loading,
);
