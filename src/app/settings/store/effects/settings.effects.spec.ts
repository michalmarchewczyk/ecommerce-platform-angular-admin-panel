import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { SettingsEffects } from './settings.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SettingsActions } from '../actions';

describe('SettingsEffects', () => {
  let actions$: Observable<any>;
  let effects: SettingsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SettingsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadSettings$', () => {
    it('should return a loadSettingsSuccess action', (done) => {
      actions$ = of(SettingsActions.loadSettings());

      effects.loadSettings$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.loadSettingsSuccess({ settings: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadSettingsFailure action', (done) => {
      actions$ = of(SettingsActions.loadSettings());

      effects.loadSettings$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.loadSettingsFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });

  describe('createSetting$', () => {
    it('should return a createSettingSuccess action', (done) => {
      actions$ = of(
        SettingsActions.createSetting({
          data: { name: 'test', type: 'string' } as any,
        }),
      );

      effects.createSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.createSettingSuccess({
            setting: { name: 'test', type: 'string' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ name: 'test', type: 'string' });
    });

    it('should return a createSettingFailure action', (done) => {
      actions$ = of(
        SettingsActions.createSetting({
          data: { name: 'test', type: 'string' } as any,
        }),
      );

      effects.createSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.createSettingFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush(
          { message: 'error' },
          { status: 400, statusText: 'Bad Request' },
        );
    });
  });

  describe('updateSetting$', () => {
    it('should return a updateSettingSuccess action', (done) => {
      actions$ = of(
        SettingsActions.updateSetting({
          settingId: 1,
          data: { value: 'value' } as any,
        }),
      );

      effects.updateSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.updateSettingSuccess({
            settingId: 1,
            setting: { id: 1, name: 'test', value: 'value' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush({ id: 1, name: 'test', value: 'value' });
    });

    it('should return a updateSettingFailure action', (done) => {
      actions$ = of(
        SettingsActions.updateSetting({
          settingId: 1,
          data: { value: 'value' } as any,
        }),
      );

      effects.updateSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.updateSettingFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush(
          { message: 'error' },
          { status: 400, statusText: 'Bad Request' },
        );
    });
  });

  describe('deleteSetting$', () => {
    it('should return a deleteSettingSuccess action', (done) => {
      actions$ = of(SettingsActions.deleteSetting({ settingId: 1 }));

      effects.deleteSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.deleteSettingSuccess({ settingId: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deleteSettingFailure action', (done) => {
      actions$ = of(SettingsActions.deleteSetting({ settingId: 1 }));

      effects.deleteSetting$.subscribe((result) => {
        expect(result).toEqual(
          SettingsActions.deleteSettingFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'DELETE' })
        .flush({ message: 'error' }, { status: 404, statusText: 'Not Found' });
    });
  });
});
