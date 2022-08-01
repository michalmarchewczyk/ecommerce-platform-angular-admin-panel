import { TestBed } from '@angular/core/testing';
import { AuthRoleGuard } from './auth-role.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from '../../api';
import RoleEnum = User.RoleEnum;
import { selectAuthUserState } from '../store';

describe('AuthRoleGuard', () => {
  let guard: AuthRoleGuard;
  let router: Router;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthRoleGuard,
        provideMockStore({
          selectors: [
            {
              selector: selectAuthUserState,
              value: {
                checked: true,
                user: {
                  role: RoleEnum.Admin,
                },
              },
            },
          ],
        }),
      ],
    });
    guard = TestBed.inject(AuthRoleGuard);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if route has no roles', (done) => {
    router.navigate(['/']);
    const routerState = router.routerState.snapshot;
    const route = routerState.root;
    route.data['roles'] = [];
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should return false if user is null', (done) => {
    store.overrideSelector(selectAuthUserState, {
      checked: true,
      user: null,
    });
    router.navigate(['/']);
    const routerState = router.routerState.snapshot;
    const route = routerState.root;
    route.data['roles'] = [RoleEnum.Manager];
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('should return true if user role matches', (done) => {
    router.navigate(['/']);
    const routerState = router.routerState.snapshot;
    const route = routerState.root;
    route.data['roles'] = [RoleEnum.Admin];
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should return true if user does not match', (done) => {
    router.navigate(['/']);
    const routerState = router.routerState.snapshot;
    const route = routerState.root;
    route.data['roles'] = [RoleEnum.Manager];
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });
});
