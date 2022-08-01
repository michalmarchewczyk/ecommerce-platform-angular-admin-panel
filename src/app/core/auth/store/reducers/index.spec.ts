import { reducers } from './index';
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
