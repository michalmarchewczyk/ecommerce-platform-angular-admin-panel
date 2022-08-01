import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of, skipWhile, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../api';
import RoleEnum = User.RoleEnum;
import { selectAuthUserState } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roles: RoleEnum[] = route.data['roles'];
    return this.store.select(selectAuthUserState).pipe(
      skipWhile((state) => !state.checked),
      switchMap((state): Observable<boolean> => {
        if (roles.length === 0) {
          return of(true);
        } else if (!state.user?.role) {
          return of(false);
        } else if (roles.includes(state.user.role)) {
          return of(true);
        } else {
          return of(false);
        }
      }),
    );
  }
}
