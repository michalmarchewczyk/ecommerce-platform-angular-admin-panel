import { createReducer, on } from '@ngrx/store';
import { UsersActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    UsersActions.loadUsers,
    UsersActions.addUser,
    UsersActions.updateUser,
    UsersActions.deleteUser,
    (state): State => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    UsersActions.loadUsersSuccess,
    UsersActions.addUserSuccess,
    UsersActions.updateUserSuccess,
    UsersActions.deleteUserSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    UsersActions.loadUsersFailure,
    UsersActions.addUserFailure,
    UsersActions.updateUserFailure,
    UsersActions.deleteUserFailure,
    (state, { error }): State => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
