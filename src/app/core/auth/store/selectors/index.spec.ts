import { AuthState } from '../reducers';
import { selectAuthState } from './index';

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
        checked: true,
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
});
