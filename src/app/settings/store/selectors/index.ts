import { settingsFeatureKey, SettingsState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

export const selectSettingsState =
  createFeatureSelector<SettingsState>(settingsFeatureKey);
