import { createReducer, on } from '@ngrx/store';
import { User } from '../../../core/api';
import { UsersActions } from '../actions';

export const accountsFeatureKey = 'accounts';

export interface State {
  list: User[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    UsersActions.loadUsersSuccess,
    (state, { users }): State => ({
      ...state,
      list: users,
    }),
  ),
  on(
    UsersActions.addUserSuccess,
    (state, { user }): State => ({
      ...state,
      list: [...state.list, user],
    }),
  ),
  on(
    UsersActions.updateUserSuccess,
    (state, { id, user }): State => ({
      ...state,
      list: state.list.map((u) => (u.id === id ? user : u)),
    }),
  ),
  on(
    UsersActions.deleteUserSuccess,
    (state, { id }): State => ({
      ...state,
      list: state.list.filter((u) => u.id !== id),
    }),
  ),
);
