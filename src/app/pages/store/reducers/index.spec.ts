import * as fromPages from './pages.reducer';
import * as fromStatus from './status.reducer';
import { reducers } from './index';

describe('Pages Feature Reducer', () => {
  it('should combine reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      pages: fromPages.initialState,
      status: fromStatus.initialState,
    });
  });
});
