import { createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers/login.reducer';
import { selectAuthState } from './index';

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
