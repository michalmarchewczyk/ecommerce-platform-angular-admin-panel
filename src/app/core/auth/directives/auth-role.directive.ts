import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../api';
import RoleEnum = User.RoleEnum;
import { selectUserRole } from '../store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAuthRole]',
})
export class AuthRoleDirective implements OnInit, OnDestroy {
  @Input() appAuthRole: RoleEnum[] = [];
  userRoles$ = this.store.select(selectUserRole);
  subscription!: Subscription;

  constructor(private store: Store, private el: ElementRef) {}

  ngOnInit() {
    this.subscription = this.userRoles$.subscribe((userRoles) => {
      const hasRole =
        userRoles && this.appAuthRole.some((role) => userRoles.includes(role));
      if (!hasRole) {
        this.el.nativeElement.style.display = 'none';
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
