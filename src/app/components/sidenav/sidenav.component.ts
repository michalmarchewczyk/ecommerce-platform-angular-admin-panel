import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  matchesMedium: Observable<boolean>;
  matchesSmall: Observable<boolean>;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(breakpointObserver: BreakpointObserver, public router: Router) {
    this.matchesMedium = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((v) => v.matches));
    this.matchesSmall = breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map((v) => v.matches));
  }

  async toggle() {
    this.sidenav.toggle();
  }
}
