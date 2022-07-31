import {
  AuthState,
  reducers,
  selectAuthState,
  selectAuthUserState,
  selectLoggedIn,
  selectLoginError,
  selectLoginLoading,
  selectLoginState,
  selectUser,
  selectUserRole,
} from './index';
import * as fromUser from './user.reducer';
import * as fromLogin from './login.reducer';

describe('Auth Reducer', () => {
  it('should combine user and login reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      user: fromUser.initialState,
      login: fromLogin.initialState,
    });
  });
});

describe('Auth Selectors', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      user: {
        user: {
          id: 123,
          email: 'test@test.local',
          role: 'admin',
        },
      },
      login: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectAuthState', () => {
    it('should select the auth state', () => {
      const result = selectAuthState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });

  describe('selectAuthUserState', () => {
    it('should select the user state', () => {
      const result = selectAuthUserState.projector(initialState);

      expect(result).toEqual(initialState.user);
    });
  });

  describe('selectUser', () => {
    it('should select the user', () => {
      const result = selectUser.projector(initialState.user);

      expect(result).toEqual(initialState.user.user);
    });
  });

  describe('selectLoggedIn', () => {
    it('should select the logged in state', () => {
      const result = selectLoggedIn.projector(initialState.user.user);

      expect(result).toEqual(true);
    });
  });

  describe('selectUserRole', () => {
    it('should select the user role', () => {
      const result = selectUserRole.projector(initialState.user.user);

      expect(result).toEqual('admin');
    });

    it('should select null if user is null', () => {
      const result = selectUserRole.projector(null);

      expect(result).toEqual(null);
    });
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
