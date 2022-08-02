import { UsersState } from '../reducers';
import { selectAccountsState, selectUsersList } from './accounts.selectors';

describe('Accounts Selectors', () => {
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

  describe('selectAccountsState', () => {
    it('should select the accounts state', () => {
      const result = selectAccountsState.projector(initialState);
      expect(result).toEqual(initialState.accounts);
    });
  });

  describe('selectUsersList', () => {
    it('should select the users list', () => {
      const result = selectUsersList.projector(initialState.accounts);
      expect(result).toEqual(initialState.accounts.list);
    });
  });
});
