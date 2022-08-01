import { Component, OnDestroy } from '@angular/core';
import * as LoginActions from '../../store/actions/login.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { selectLoginError } from '../../store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  error$: Observable<string | null> = this.store.select(selectLoginError);
  errorSubscription: Subscription;

  constructor(private store: Store) {
    this.errorSubscription = this.error$.subscribe(() => {
      this.loginForm.controls.password.setErrors({ incorrect: true });
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  async login() {
    this.store.dispatch(
      LoginActions.login({
        data: this.loginForm.getRawValue(),
      }),
    );
  }
}
