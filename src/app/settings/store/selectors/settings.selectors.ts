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

export const selectSettingByName = (name: string) =>
  createSelector(selectSettingsList, (settings) => {
    return settings.find((setting) => setting.name === name)?.value ?? '';
  });

export const selectSettingsListTransformed = createSelector(
  selectSettingsList,
  (settings) => {
    return settings
      .map((setting) => ({
        ...setting,
        value: setting.type.endsWith('List')
          ? [...new Set(setting.value.split(','))]
          : setting.value,
      }))
      .sort((a, b) => a.id - b.id);
  },
);
