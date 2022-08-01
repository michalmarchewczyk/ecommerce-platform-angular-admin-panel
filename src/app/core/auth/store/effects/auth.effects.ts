import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import * as LoginActions from '../actions/login.actions';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthApiService, UsersApiService } from '../../../api';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApi: AuthApiService,
    private usersApi: UsersApiService,
    private router: Router,
  ) {}

  loginCheck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginCheck),
      exhaustMap(() =>
        this.usersApi.getCurrentUser().pipe(
          map((user) => AuthActions.loginCheckSuccess({ user })),
          catchError(() => of(AuthActions.logout())),
        ),
      ),
    );
  });

  loginCheckSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginCheckSuccess),
        tap(() => {
          if (this.router.url === '/login') {
            this.router.navigate(['/']);
          }
        }),
      );
    },
    { dispatch: false },
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      map((action) => action.data),
      exhaustMap((data) =>
        this.authApi.login(data).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError(({ error }) =>
            of(AuthActions.loginFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/'])),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['/login'])),
        exhaustMap(() =>
          this.authApi.logout().pipe(catchError(() => of(null))),
        ),
      );
    },
    { dispatch: false },
  );
}
