import { createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';
import { selectAuthState } from './index';

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

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email ?? '',
);
