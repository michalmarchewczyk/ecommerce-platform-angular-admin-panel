import { createReducer, on } from '@ngrx/store';
import { Setting } from '../../../core/api';
import { SettingsActions } from '../actions';

export const settingsFeatureKey = 'settings';

export interface State {
  list: Setting[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    SettingsActions.loadSettingsSuccess,
    (state, { settings }): State => ({
      ...state,
      list: settings,
    }),
  ),
  on(
    SettingsActions.createSettingSuccess,
    (state, { setting }): State => ({
      ...state,
      list: [...state.list, setting],
    }),
  ),
  on(
    SettingsActions.updateSettingSuccess,
    (state, { setting }): State => ({
      ...state,
      list: state.list.map((s) => (s.id === setting.id ? setting : s)),
    }),
  ),
  on(
    SettingsActions.deleteSettingSuccess,
    (state, { settingId }): State => ({
      ...state,
      list: state.list.filter((s) => s.id !== settingId),
    }),
  ),
);
