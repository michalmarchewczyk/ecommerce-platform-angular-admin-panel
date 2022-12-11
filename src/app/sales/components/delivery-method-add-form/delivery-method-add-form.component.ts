import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryMethodsActions } from '../../store';

@Component({
  selector: 'app-delivery-method-add-form',
  templateUrl: './delivery-method-add-form.component.html',
  styleUrls: ['./delivery-method-add-form.component.scss'],
})
export class DeliveryMethodAddFormComponent {
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
      DeliveryMethodsActions.createDeliveryMethod({
        data: this.addForm.getRawValue(),
      }),
    );
  }
}
