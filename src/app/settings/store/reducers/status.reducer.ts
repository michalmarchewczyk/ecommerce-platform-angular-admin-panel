import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    SettingsActions.loadSettings,
    SettingsActions.createSetting,
    SettingsActions.updateSetting,
    SettingsActions.deleteSetting,
    (state): State => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    SettingsActions.loadSettingsSuccess,
    SettingsActions.createSettingSuccess,
    SettingsActions.updateSettingSuccess,
    SettingsActions.deleteSettingSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    SettingsActions.loadSettingsFailure,
    SettingsActions.createSettingFailure,
    SettingsActions.updateSettingFailure,
    SettingsActions.deleteSettingFailure,
    (state, { error }): State => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
