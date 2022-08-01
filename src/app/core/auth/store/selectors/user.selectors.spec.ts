import { AuthState } from '../reducers';
import {
  selectAuthUserState,
  selectLoggedIn,
  selectUser,
  selectUserEmail,
  selectUserRole,
} from './user.selectors';

describe('User Selectors', () => {
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

  describe('selectUserEmail', () => {
    it('should select the user email', () => {
      const result = selectUserEmail.projector(initialState.user.user);

      expect(result).toEqual('test@test.local');
    });

    it('should select empty string if user is null', () => {
      const result = selectUserEmail.projector(null);

      expect(result).toEqual('');
    });
  });
});
