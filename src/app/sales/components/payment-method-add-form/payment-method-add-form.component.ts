import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodsActions } from '../../store';

@Component({
  selector: 'app-payment-method-add-form',
  templateUrl: './payment-method-add-form.component.html',
  styleUrls: ['./payment-method-add-form.component.scss'],
})
export class PaymentMethodAddFormComponent {
  addForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  constructor(private store: Store) {}

  async add() {
    this.store.dispatch(
      PaymentMethodsActions.createPaymentMethod({
        data: this.addForm.getRawValue(),
      }),
    );
  }
}
