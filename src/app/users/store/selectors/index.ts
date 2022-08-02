import { createFeatureSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState } from '../reducers';

export const selectUsersState =
  createFeatureSelector<UsersState>(usersFeatureKey);
