import { createAction, props } from '@ngrx/store';
import { RegisterDto, User, UserUpdateDto } from '../../../core/api';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>(),
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>(),
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ data: RegisterDto }>(),
);

export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>(),
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string }>(),
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ id: number; data: UserUpdateDto }>(),
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ id: number; user: User }>(),
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>(),
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>(),
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: number }>(),
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>(),
);
