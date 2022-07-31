import { reducer, initialState } from './user.reducer';
import { AuthActions } from '../actions';
import { User } from '../../../api';
import RoleEnum = User.RoleEnum;

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('login success action', () => {
    it('should set loading to true', () => {
      const testUser = {
        email: 'test@test.local',
        id: 123,
        role: RoleEnum.Admin,
      };
      const action = AuthActions.loginSuccess({
        user: testUser,
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: testUser,
      });
    });
  });

  describe('logout action', () => {
    it('should set user to null', () => {
      const action = AuthActions.logout();

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: null,
      });
    });
  });
});
