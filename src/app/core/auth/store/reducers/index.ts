import * as fromUser from './user.reducer';
import * as fromLogin from './login.reducer';
import * as fromRoot from '../../../store';

import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

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

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUserState = createSelector(
  selectAuthState,
  (state) => state[fromUser.userFeatureKey],
);

export const selectUser = createSelector(selectAuthUserState, fromUser.getUser);

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role ?? null,
);

export const selectLoginState = createSelector(
  selectAuthState,
  (state) => state[fromLogin.loginFeatureKey],
);

export const selectLoginLoading = createSelector(
  selectLoginState,
  fromLogin.getLoading,
);

export const selectLoginError = createSelector(
  selectLoginState,
  fromLogin.getError,
);
