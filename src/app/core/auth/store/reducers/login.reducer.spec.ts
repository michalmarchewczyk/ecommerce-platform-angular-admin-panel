import { reducer, initialState } from './login.reducer';
import { AuthActions, LoginActions } from '../actions';

describe('Login Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('login action', () => {
    it('should set loading to true', () => {
      const action = LoginActions.login({ data: { email: '', password: '' } });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('login success action', () => {
    it('should set loading to false', () => {
      const action = AuthActions.loginSuccess({
        user: { email: '', id: 1, role: 'admin' },
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('login failure action', () => {
    it('should set loading to false and error', () => {
      const action = AuthActions.loginFailure({ error: '123' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: '123',
      });
    });
  });
});
