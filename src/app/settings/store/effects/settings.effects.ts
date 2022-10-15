import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsApiService } from '../../../core/api';
import { SettingsActions } from '../actions';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthActions } from '../../../core/auth/store';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsApi: SettingsApiService,
  ) {}

  loadSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        SettingsActions.loadSettings,
        AuthActions.loginCheckSuccess,
        AuthActions.loginSuccess,
      ),
      switchMap(() =>
        this.settingsApi.getSettings().pipe(
          map((settings) => SettingsActions.loadSettingsSuccess({ settings })),
          catchError(({ error }) =>
            of(SettingsActions.loadSettingsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  createSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.createSetting),
      switchMap(({ data }) =>
        this.settingsApi.createSetting(data).pipe(
          map((setting) => SettingsActions.createSettingSuccess({ setting })),
          catchError(({ error }) =>
            of(SettingsActions.createSettingFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.updateSetting),
      switchMap(({ settingId, data }) =>
        this.settingsApi.updateSetting(settingId, data).pipe(
          map((setting) =>
            SettingsActions.updateSettingSuccess({ settingId, setting }),
          ),
          catchError(({ error }) =>
            of(SettingsActions.updateSettingFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  deleteSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.deleteSetting),
      switchMap(({ settingId }) =>
        this.settingsApi.deleteSetting(settingId).pipe(
          map(() => SettingsActions.deleteSettingSuccess({ settingId })),
          catchError(({ error }) =>
            of(SettingsActions.deleteSettingFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });
}
