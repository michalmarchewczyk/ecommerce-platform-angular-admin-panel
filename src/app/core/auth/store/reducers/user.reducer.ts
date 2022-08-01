import { createReducer, on } from '@ngrx/store';
import { User } from '../../../api';
import { AuthActions } from '../actions';

export const userFeatureKey = 'user';

export interface State {
  checked: boolean;
  user: Pick<User, 'id' | 'email' | 'role'> | null;
}

export const initialState: State = {
  checked: false,
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, { user }): State => ({ ...state, user }),
  ),
  on(
    AuthActions.loginCheckSuccess,
    (state, { user }): State => ({ ...state, user, checked: true }),
  ),
  on(
    AuthActions.logout,
    (): State => ({
      ...initialState,
      checked: true,
    }),
  ),
);

export const getUser = (state: State) => state.user;
