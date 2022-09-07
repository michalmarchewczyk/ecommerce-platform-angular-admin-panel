import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  OrdersActions,
  selectDeliveriesList,
  selectNewOrderId,
  selectPaymentsList,
} from '../../store';
import { ProductsActions, selectProductsList } from '../../../catalog/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderItemDto } from '../../../core/api';
import { Router } from '@angular/router';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
})
export class CreateOrderFormComponent implements OnInit {
  createForm = new FormGroup({
    contactEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    contactPhone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl(''),
    deliveryMethodId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryAddress: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryCity: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryCountry: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryPostalCode: new FormControl<string | null>(null),
    paymentMethodId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  items: OrderItemDto[] = [];

  deliveryMethods$ = this.store.select(selectDeliveriesList);
  paymentMethods$ = this.store.select(selectPaymentsList);
  products$ = this.store.select(selectProductsList);

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  async save() {
    this.store.dispatch(
      OrdersActions.createOrder({
        data: {
          contactEmail: this.createForm.controls.contactEmail.value,
          contactPhone: this.createForm.controls.contactPhone.value,
          fullName: this.createForm.controls.fullName.value,
          message: this.createForm.controls.message.value ?? undefined,
          delivery: {
            methodId: this.createForm.controls.deliveryMethodId.value,
            address: this.createForm.controls.deliveryAddress.value,
            city: this.createForm.controls.deliveryCity.value,
            country: this.createForm.controls.deliveryCountry.value,
            postalCode:
              this.createForm.controls.deliveryPostalCode.value ?? undefined,
          },
          payment: {
            methodId: this.createForm.controls.paymentMethodId.value,
          },
          items: this.items,
        },
      }),
    );
    this.store
      .select(selectNewOrderId)
      .pipe(
        first((v) => v !== null),
        take(1),
      )
      .subscribe((id) => {
        this.router.navigate(['sales/orders', id]);
      });
  }
}
