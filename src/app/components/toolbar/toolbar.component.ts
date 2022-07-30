import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/auth/store/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  matchesMedium: Observable<boolean>;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(breakpointObserver: BreakpointObserver, private store: Store) {
    this.matchesMedium = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((v) => v.matches));
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
