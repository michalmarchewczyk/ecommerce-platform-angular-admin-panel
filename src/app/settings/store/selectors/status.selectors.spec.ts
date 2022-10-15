import { SettingsState } from '../reducers';
import {
  selectSettingsError,
  selectSettingsLoading,
  selectSettingsStatusState,
} from './status.selectors';

describe('Settings Status Selectors', () => {
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = {
      settings: {
        list: [],
      },
      status: {
        loading: false,
        error: 'error',
      },
    };
  });

  describe('selectSettingsStatusState', () => {
    it('should return the settings status state', () => {
      const result = selectSettingsStatusState.projector(initialState);

      expect(result).toEqual(initialState.status);
    });
  });

  describe('selectSettingsError', () => {
    it('should return the settings error', () => {
      const result = selectSettingsError.projector(initialState.status);

      expect(result).toEqual(initialState.status.error);
    });
  });

  describe('selectSettingsLoading', () => {
    it('should return the settings loading', () => {
      const result = selectSettingsLoading.projector(initialState.status);

      expect(result).toEqual(initialState.status.loading);
    });
  });
});
