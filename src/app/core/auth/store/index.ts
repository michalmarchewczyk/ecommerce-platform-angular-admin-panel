import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/user.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');

export const selectUser = createSelector(selectAuthState, fromAuth.getUser);
