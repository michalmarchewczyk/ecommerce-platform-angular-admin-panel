import * as fromSettings from './settings.reducer';
import * as fromStatus from './status.reducer';
import { reducers } from './index';

describe('Settings Feature Reducer', () => {
  it('should combine reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      settings: fromSettings.initialState,
      status: fromStatus.initialState,
    });
  });
});
