import { reducer, initialState } from './status.reducer';
import { UsersActions } from '../actions';

describe('Users Status Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load users action', () => {
    it('should set the loading to true', () => {
      const action = UsersActions.loadUsers();

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('add user action', () => {
    it('should set the loading to true', () => {
      const action = UsersActions.addUser({ data: {} as any });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('update user action', () => {
    it('should set the loading to true', () => {
      const action = UsersActions.updateUser({ id: 1, data: {} as any });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('delete user action', () => {
    it('should set the loading to true', () => {
      const action = UsersActions.deleteUser({ id: 1 });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('load users success action', () => {
    it('should set loading to false', () => {
      const action = UsersActions.loadUsersSuccess({ users: [] });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('add user success action', () => {
    it('should set loading to false', () => {
      const action = UsersActions.addUserSuccess({ user: {} as any });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('update user success action', () => {
    it('should set loading to false', () => {
      const action = UsersActions.updateUserSuccess({ id: 1, user: {} as any });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('delete user success action', () => {
    it('should set loading to false', () => {
      const action = UsersActions.deleteUserSuccess({ id: 1 });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('load users failure action', () => {
    it('should set error', () => {
      const action = UsersActions.loadUsersFailure({ error: 'error' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });

  describe('add user failure action', () => {
    it('should set error', () => {
      const action = UsersActions.addUserFailure({ error: 'error' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });

  describe('update user failure action', () => {
    it('should set error', () => {
      const action = UsersActions.updateUserFailure({ error: 'error' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });

  describe('delete user failure action', () => {
    it('should set error', () => {
      const action = UsersActions.deleteUserFailure({ error: 'error' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });
});
