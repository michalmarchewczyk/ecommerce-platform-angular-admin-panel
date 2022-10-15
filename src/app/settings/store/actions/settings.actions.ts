import { createAction, props } from '@ngrx/store';
import { Setting, SettingCreateDto, SettingUpdateDto } from '../../../core/api';

export const loadSettings = createAction('[Settings] Load Settings');

export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success',
  props<{ settings: Setting[] }>(),
);

export const loadSettingsFailure = createAction(
  '[Settings] Load Settings Failure',
  props<{ error: string }>(),
);

export const createSetting = createAction(
  '[Settings] Create Setting',
  props<{ data: SettingCreateDto }>(),
);

export const createSettingSuccess = createAction(
  '[Settings] Create Setting Success',
  props<{ setting: Setting }>(),
);

export const createSettingFailure = createAction(
  '[Settings] Create Setting Failure',
  props<{ error: string }>(),
);

export const updateSetting = createAction(
  '[Settings] Update Setting',
  props<{ settingId: number; data: SettingUpdateDto }>(),
);

export const updateSettingSuccess = createAction(
  '[Settings] Update Setting Success',
  props<{ settingId: number; setting: Setting }>(),
);

export const updateSettingFailure = createAction(
  '[Settings] Update Setting Failure',
  props<{ error: string }>(),
);

export const deleteSetting = createAction(
  '[Settings] Delete Setting',
  props<{ settingId: number }>(),
);

export const deleteSettingSuccess = createAction(
  '[Settings] Delete Setting Success',
  props<{ settingId: number }>(),
);

export const deleteSettingFailure = createAction(
  '[Settings] Delete Setting Failure',
  props<{ error: string }>(),
);
