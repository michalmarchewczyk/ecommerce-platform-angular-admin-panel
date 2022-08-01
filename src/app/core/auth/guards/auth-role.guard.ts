import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, skipWhile, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserState } from '../store';
import { User } from '../../api';
import RoleEnum = User.RoleEnum;

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
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
