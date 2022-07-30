import { createReducer, on } from '@ngrx/store';
import { AuthActions, LoginActions } from '../actions';

export const loginFeatureKey = 'login';

export interface State {
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(
    LoginActions.login,
    (state): State => ({ ...state, loading: true, error: null }),
  ),
  on(
    AuthActions.loginSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): State => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
