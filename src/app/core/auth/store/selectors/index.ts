import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
