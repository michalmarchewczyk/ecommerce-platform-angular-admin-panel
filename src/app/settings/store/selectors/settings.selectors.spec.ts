import { SettingsState } from '../reducers';
import { Setting } from '../../../core/api';
import {
  selectSettingByName,
  selectSettingsList,
  selectSettingsListState,
  selectSettingsListTransformed,
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
          {
            id: 2,
            name: 'Test 2',
            type: 'countriesList',
            value: 'PL,US',
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

  describe('selectSettingByName', () => {
    it('should select the setting by name', () => {
      const result = selectSettingByName('Test').projector(
        initialState.settings.list,
      );
      expect(result).toEqual(initialState.settings.list[0].value);
    });

    it('should return empty string if setting not found', () => {
      const result = selectSettingByName('Not found').projector(
        initialState.settings.list,
      );
      expect(result).toEqual('');
    });
  });

  describe('selectSettingsListTransformed', () => {
    it('should select the transformed setting list', () => {
      const result = selectSettingsListTransformed.projector(
        initialState.settings.list,
      );
      expect(result).toEqual([
        {
          id: 1,
          name: 'Test',
          type: 'string',
          value: 'Test',
        },
        {
          id: 2,
          name: 'Test 2',
          type: 'countriesList',
          value: ['PL', 'US'],
        },
      ] as any);
    });
  });
});
