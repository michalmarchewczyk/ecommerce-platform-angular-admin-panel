import { reducer, initialState } from './settings.reducer';
import { SettingsActions } from '../actions';
import { Setting } from '../../../core/api';

describe('Settings Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load settings success action', () => {
    it('should set the list of settings', () => {
      const settings: Setting[] = [];
      const action = SettingsActions.loadSettingsSuccess({ settings });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(settings);
    });
  });

  describe('create setting success action', () => {
    it('should add the setting to the list', () => {
      const setting: Setting = {
        id: 1,
        name: 'test',
        type: 'string',
        value: 'value',
      } as Setting;
      const action = SettingsActions.createSettingSuccess({ setting });

      const result = reducer(
        { ...initialState, list: [{ id: 2, name: 'test 2' } as Setting] },
        action,
      );

      expect(result.list).toEqual([
        { id: 2, name: 'test 2' } as Setting,
        setting,
      ]);
    });
  });

  describe('update setting success action', () => {
    it('should update the setting in the list', () => {
      const setting: Setting = {
        id: 1,
        name: 'test',
        type: 'string',
        value: 'value',
      } as Setting;
      const action = SettingsActions.updateSettingSuccess({
        settingId: 1,
        setting: { ...setting, value: 'value updated' },
      });

      const result = reducer(
        {
          ...initialState,
          list: [setting, { id: 2, name: 'test 2' }] as Setting[],
        },
        action,
      );

      expect(result.list).toEqual([
        { ...setting, value: 'value updated' },
        { id: 2, name: 'test 2' },
      ] as Setting[]);
    });
  });

  describe('delete setting success action', () => {
    it('should remove the setting from the list', () => {
      const setting: Setting = {
        id: 1,
        name: 'test',
        type: 'string',
        value: 'value',
      } as Setting;
      const action = SettingsActions.deleteSettingSuccess({ settingId: 1 });

      const result = reducer(
        {
          ...initialState,
          list: [setting, { id: 2, name: 'test 2' }] as Setting[],
        },
        action,
      );

      expect(result.list).toEqual([{ id: 2, name: 'test 2' }] as Setting[]);
    });
  });
});
