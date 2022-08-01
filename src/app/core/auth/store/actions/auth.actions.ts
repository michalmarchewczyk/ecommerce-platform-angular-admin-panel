import { createAction, props } from '@ngrx/store';
import { User } from '../../../api';

export const loginCheck = createAction('[Auth] Login Check');

export const loginCheckSuccess = createAction(
  '[Auth] Login Check Success',
  props<{ user: Pick<User, 'id' | 'email' | 'role'> }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: Pick<User, 'id' | 'email' | 'role'> }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
