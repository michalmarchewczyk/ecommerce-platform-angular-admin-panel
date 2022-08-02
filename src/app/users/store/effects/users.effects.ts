import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService, UsersApiService } from '../../../core/api';
import { UsersActions } from '../actions';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersApi: UsersApiService,
    private authApi: AuthApiService,
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.usersApi.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError(({ error }) =>
            of(UsersActions.loadUsersFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      concatMap(({ data }) =>
        this.authApi.register(data).pipe(
          map((user) => UsersActions.addUserSuccess({ user })),
          catchError(({ error }) =>
            of(UsersActions.addUserFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      concatMap(({ id, data }) =>
        this.usersApi.updateUser(id, data).pipe(
          map((user) => UsersActions.updateUserSuccess({ id, user })),
          catchError(({ error }) =>
            of(UsersActions.updateUserFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ id }) =>
        this.usersApi.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError(({ error }) =>
            of(UsersActions.deleteUserFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });
}
