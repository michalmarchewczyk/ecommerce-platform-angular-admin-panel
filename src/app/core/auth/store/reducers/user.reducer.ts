import { createReducer, on } from '@ngrx/store';
import { User } from '../../../api';
import { AuthActions } from '../actions';

export const userFeatureKey = 'user';

export interface State {
  user: Pick<User, 'id' | 'email' | 'role'> | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, { user }): State => ({ ...state, user }),
  ),
  on(AuthActions.logout, (): State => initialState),
);

export const getUser = (state: State) => state.user;
