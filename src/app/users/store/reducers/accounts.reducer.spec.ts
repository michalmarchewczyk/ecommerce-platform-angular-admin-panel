import { reducer, initialState } from './accounts.reducer';
import { UsersActions } from '../actions';
import { User } from '../../../core/api';

describe('Accounts Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load users success action', () => {
    it('should set the list of users', () => {
      const users: User[] = [];
      const action = UsersActions.loadUsersSuccess({ users });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: users,
      });
    });
  });

  describe('add user success action', () => {
    it('should add the user to the list', () => {
      const user: User = {
        id: 1,
        email: 'test@test.local',
        registered: '',
        role: 'admin',
      };
      const action = UsersActions.addUserSuccess({ user });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: [user],
      });
    });
  });

  describe('update user success action', () => {
    it('should update the user in the list', () => {
      const user: User = {
        id: 1,
        email: 'test@test.local',
        registered: '',
        role: 'admin',
      };
      const action = UsersActions.updateUserSuccess({
        id: 1,
        user: {
          ...user,
          email: 'test2@test.local',
          role: 'customer',
        },
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            user,
            {
              ...user,
              id: 2,
            },
          ],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          {
            ...user,
            email: 'test2@test.local',
            role: 'customer',
          },
          {
            ...user,
            id: 2,
          },
        ],
      });
    });
  });

  describe('delete user success action', () => {
    it('should delete the user from the list', () => {
      const user: User = {
        id: 1,
        email: 'test@test.local',
        registered: '',
        role: 'admin',
      };
      const action = UsersActions.deleteUserSuccess({ id: 1 });

      const result = reducer(
        {
          ...initialState,
          list: [user],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [],
      });
    });
  });
});
