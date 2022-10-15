import * as fromSettings from './settings.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { combineReducers } from '@ngrx/store';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  [fromSettings.settingsFeatureKey]: fromSettings.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [settingsFeatureKey]: SettingsState;
}

export const reducers = (state: SettingsState | undefined, action: any) =>
  combineReducers({
    [fromSettings.settingsFeatureKey]: fromSettings.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
