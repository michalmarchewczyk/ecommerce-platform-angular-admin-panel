import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { UsersEffects } from './users.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersActions } from '../actions';
import { User } from '../../../core/api';
import RoleEnum = User.RoleEnum;

describe('UsersEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UsersEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUsers$', () => {
    it('should return a loadUsersSuccess action', (done) => {
      actions$ = of(UsersActions.loadUsers());

      effects.loadUsers$.subscribe((result) => {
        expect(result).toEqual(UsersActions.loadUsersSuccess({ users: [] }));
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadUsersFailure action', (done) => {
      actions$ = of(UsersActions.loadUsers());

      effects.loadUsers$.subscribe((result) => {
        expect(result).toEqual(
          UsersActions.loadUsersFailure({ error: 'internal server error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush(
        {
          message: 'internal server error',
        },
        {
          status: 500,
          statusText: 'Server Error',
        },
      );
    });
  });

  describe('addUser$', () => {
    it('should return a addUserSuccess action', (done) => {
      const testUser = {
        id: 1,
        email: 'test@test.local',
        registered: '',
        role: RoleEnum.Customer,
      };
      actions$ = of(
        UsersActions.addUser({
          data: {
            email: 'test@test.local',
            password: 'test1234',
          },
        }),
      );

      effects.addUser$.subscribe((result) => {
        expect(result).toEqual(UsersActions.addUserSuccess({ user: testUser }));
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(testUser);
    });

    it('should return a addUserFailure action', (done) => {
      actions$ = of(
        UsersActions.addUser({
          data: {
            email: 'test@test.local',
            password: 'test1234',
          },
        }),
      );

      effects.addUser$.subscribe((result) => {
        expect(result).toEqual(
          UsersActions.addUserFailure({ error: 'conflict on email' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(
        {
          message: 'conflict on email',
        },
        {
          status: 409,
          statusText: 'Conflict',
        },
      );
    });
  });

  describe('updateUser$', () => {
    it('should return a updateUserSuccess action', (done) => {
      const testUser = {
        id: 123,
        email: 'test@test.local',
        registered: '',
        role: RoleEnum.Customer,
      };

      actions$ = of(UsersActions.updateUser({ id: 123, data: {} }));

      effects.updateUser$.subscribe((result) => {
        expect(result).toEqual(
          UsersActions.updateUserSuccess({ id: 123, user: testUser }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PATCH' }).flush(testUser);
    });

    it('should return a updateUserFailure action', (done) => {
      actions$ = of(UsersActions.updateUser({ id: 123, data: {} }));

      effects.updateUser$.subscribe((result) => {
        expect(result).toEqual(
          UsersActions.updateUserFailure({ error: 'invalid email' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PATCH' }).flush(
        {
          message: 'invalid email',
        },
        {
          status: 400,
          statusText: 'BadRequest',
        },
      );
    });
  });

  describe('deleteUser$', () => {
    it('should return a deleteUserSuccess action', (done) => {
      actions$ = of(UsersActions.deleteUser({ id: 123 }));

      effects.deleteUser$.subscribe((result) => {
        expect(result).toEqual(UsersActions.deleteUserSuccess({ id: 123 }));
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush([]);
    });

    it('should return a deleteUserFailure action', (done) => {
      actions$ = of(UsersActions.deleteUser({ id: 123 }));

      effects.deleteUser$.subscribe((result) => {
        expect(result).toEqual(
          UsersActions.deleteUserFailure({ error: 'user not found' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(
        {
          message: 'user not found',
        },
        {
          status: 404,
          statusText: 'Not Found',
        },
      );
    });
  });
});
