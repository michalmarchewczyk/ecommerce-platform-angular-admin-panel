import { AuthState } from '../reducers';
import {
  selectLoginError,
  selectLoginLoading,
  selectLoginState,
} from './login.selectors';

describe('Login Selectors', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      user: {
        user: {
          id: 123,
          email: 'test@test.local',
          role: 'admin',
        },
        checked: true,
      },
      login: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectLoginState', () => {
    it('should select the login state', () => {
      const result = selectLoginState.projector(initialState);

      expect(result).toEqual(initialState.login);
    });
  });

  describe('selectLoginLoading', () => {
    it('should select the login loading state', () => {
      const result = selectLoginLoading.projector(initialState.login);

      expect(result).toEqual(false);
    });
  });

  describe('selectLoginError', () => {
    it('should select the login error state', () => {
      const result = selectLoginError.projector(initialState.login);

      expect(result).toEqual(null);
    });
  });
});
