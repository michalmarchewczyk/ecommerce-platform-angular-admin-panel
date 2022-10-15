import { SettingsState } from '../reducers';
import { selectSettingsState } from './index';

describe('Settings Feature Selectors', () => {
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = {
      settings: {
        list: [],
      },
      status: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectSettingsState', () => {
    it('should return the settings state', () => {
      const result = selectSettingsState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });
});
