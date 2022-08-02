import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store';
import { RegisterDto } from '../../../core/api';
import { selectUsersError } from '../../store/selectors/status.selectors';
@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.scss'],
})
export class UserAddFormComponent {
  addForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    firstName: new FormControl('', {
      nonNullable: false,
      validators: [],
    }),
    lastName: new FormControl('', {
      nonNullable: false,
      validators: [],
    }),
  });
  error$ = this.store.select(selectUsersError);
  errorSubscription = this.error$.subscribe((error) => {
    if (!error) return;
    this.addForm.controls.email.setErrors({ conflict: true });
  });

  constructor(private store: Store) {}

  async add() {
    this.store.dispatch(
      UsersActions.addUser({
        data: this.addForm.getRawValue() as RegisterDto,
      }),
    );
  }
}
