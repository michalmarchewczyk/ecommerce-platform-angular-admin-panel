import { SettingsState } from '../reducers';
import { Setting } from '../../../core/api';
import {
  selectSettingsList,
  selectSettingsListState,
} from './settings.selectors';

describe('Settings Selectors', () => {
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = {
      settings: {
        list: [
          {
            id: 1,
            name: 'Test',
            type: 'string',
            value: 'Test',
          } as Setting,
        ],
      },
      status: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectSettingsListState', () => {
    it('should select the setting state', () => {
      const result = selectSettingsListState.projector(initialState);
      expect(result).toEqual(initialState.settings);
    });
  });

  describe('selectSettingsList', () => {
    it('should select the setting list', () => {
      const result = selectSettingsList.projector(initialState.settings);
      expect(result).toEqual(initialState.settings.list);
    });
  });
});
