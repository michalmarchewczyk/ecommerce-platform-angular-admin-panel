import { UsersState } from '../reducers';
import {
  selectUsersError,
  selectUsersLoading,
  selectUsersStatusState,
} from './status.selectors';

describe('Users Status Selectors', () => {
  let initialState: UsersState;

  beforeEach(() => {
    initialState = {
      accounts: {
        list: [],
      },
      status: {
        error: null,
        loading: false,
      },
    };
  });

  describe('selectUsersStatusState', () => {
    it('should select the status state', () => {
      const result = selectUsersStatusState.projector(initialState);
      expect(result).toEqual(initialState.status);
    });
  });

  describe('selectUsersError', () => {
    it('should select the error', () => {
      const result = selectUsersError.projector(initialState.status);
      expect(result).toEqual(initialState.status.error);
    });
  });

  describe('selectUsersLoading', () => {
    it('should select the loading', () => {
      const result = selectUsersLoading.projector(initialState.status);
      expect(result).toEqual(initialState.status.loading);
    });
  });
});
