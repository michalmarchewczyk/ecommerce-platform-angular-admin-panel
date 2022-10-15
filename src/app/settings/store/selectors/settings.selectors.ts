import * as fromSettings from '../reducers/settings.reducer';
import { createSelector } from '@ngrx/store';
import { selectSettingsState } from './index';

export const selectSettingsListState = createSelector(
  selectSettingsState,
  (state) => state[fromSettings.settingsFeatureKey],
);

export const selectSettingsList = createSelector(
  selectSettingsListState,
  (state) => state.list,
);
