import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthActions, LoginActions } from '../actions';
import { User } from '../../../api';
import RoleEnum = User.RoleEnum;
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        RouterTestingModule,
      ],
    });

    effects = TestBed.inject(AuthEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loginCheck$', () => {
    it('should return login success action with user', (done) => {
      const testUser = {
        id: 1,
        email: 'test@test.local',
        role: RoleEnum.Admin,
      };
      actions$ = of(AuthActions.loginCheck());

      effects.loginCheck$.subscribe((result) => {
        expect(result).toEqual(
          AuthActions.loginCheckSuccess({ user: testUser }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush(testUser);
    });

    it('should return logout action', (done) => {
      actions$ = of(AuthActions.loginCheck());

      effects.loginCheck$.subscribe((result) => {
        expect(result).toEqual(AuthActions.logout());
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush(null, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('login$', () => {
    it('should return login success action with user', (done) => {
      const testUser = {
        id: 1,
        email: 'test@test.local',
        role: RoleEnum.Admin,
      };
      actions$ = of(
        LoginActions.login({
          data: { email: 'test@test.local', password: 'test1234' },
        }),
      );

      effects.login$.subscribe((result) => {
        expect(result).toEqual(AuthActions.loginSuccess({ user: testUser }));
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(testUser);
    });

    it('should return login failure action', (done) => {
      actions$ = of(
        LoginActions.login({
          data: { email: 'test@test.local', password: 'test1234' },
        }),
      );

      effects.login$.subscribe((result) => {
        expect(result).toEqual(
          AuthActions.loginFailure({ error: 'wrong email or password' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush(
          { message: 'wrong email or password' },
          { status: 401, statusText: 'Unauthorized' },
        );
    });
  });

  describe('loginSuccess$', () => {
    it('should navigate to /', (done) => {
      const testUser = {
        id: 1,
        email: 'test@test.local',
        role: RoleEnum.Admin,
      };
      actions$ = of(AuthActions.loginSuccess({ user: testUser }));

      spyOn(router, 'navigate');

      effects.loginSuccess$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/']);

      done();
    });
  });

  describe('loginCheckSuccess$', () => {
    it('should navigate to /', (done) => {
      const testUser = {
        id: 1,
        email: 'test@test.local',
        role: RoleEnum.Admin,
      };
      actions$ = of(AuthActions.loginCheckSuccess({ user: testUser }));

      spyOnProperty(router, 'url').and.returnValue('/login');
      spyOn(router, 'navigate');

      effects.loginCheckSuccess$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/']);

      done();
    });
  });

  describe('logout$', () => {
    it('should navigate to /login', (done) => {
      actions$ = of(AuthActions.logout());

      spyOn(router, 'navigate');

      effects.logout$.subscribe();

      httpTestingController.expectOne({ method: 'POST' }).flush(null);

      expect(router.navigate).toHaveBeenCalledWith(['/login']);

      done();
    });

    it('should catch error if user is not logged in', (done) => {
      actions$ = of(AuthActions.logout());

      spyOn(router, 'navigate');

      effects.logout$.subscribe();

      httpTestingController.expectOne({ method: 'POST' }).flush(null, {
        status: 401,
        statusText: 'Unauthorized',
      });

      expect(router.navigate).toHaveBeenCalledWith(['/login']);

      done();
    });
  });
});
