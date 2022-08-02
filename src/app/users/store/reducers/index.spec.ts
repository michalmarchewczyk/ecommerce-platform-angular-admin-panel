import { reducers } from './index';
import * as fromAccounts from './accounts.reducer';
import * as fromStatus from './status.reducer';

describe('Users Reducer', () => {
  it('should combine accounts and status reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      accounts: fromAccounts.initialState,
      status: fromStatus.initialState,
    });
  });
});
