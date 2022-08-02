import { UsersState } from '../reducers';
import { selectUsersState } from './index';

describe('Users Selectors', () => {
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

  describe('selectUsersState', () => {
    it('should select the users state', () => {
      const result = selectUsersState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });
});
