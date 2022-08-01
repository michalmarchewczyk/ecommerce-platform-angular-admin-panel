import * as fromUser from './user.reducer';
import * as fromLogin from './login.reducer';
import * as fromRoot from '../../../store';

import { Action, combineReducers } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromUser.userFeatureKey]: fromUser.State;
  [fromLogin.loginFeatureKey]: fromLogin.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export const reducers = (state: AuthState | undefined, action: Action) =>
  combineReducers({
    [fromUser.userFeatureKey]: fromUser.reducer,
    [fromLogin.loginFeatureKey]: fromLogin.reducer,
  })(state, action);
