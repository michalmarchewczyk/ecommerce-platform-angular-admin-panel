import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  OrdersActions,
  selectDeliveryMethodsList,
  selectNewOrderId,
  selectPaymentMethodsList,
  selectSalesLoading,
} from '../../store';
import { ProductsActions, selectProductsList } from '../../../catalog/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, firstValueFrom, take } from 'rxjs';
import { OrderItemsInputComponent } from '../../components/order-items-input/order-items-input.component';
import { countries } from 'countries-list';

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
    message: new FormControl<string | null>(null),
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
    deliveryCountry: new FormControl<keyof typeof countries | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryPostalCode: new FormControl<string | null>(null),
    paymentMethodId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  @ViewChild(OrderItemsInputComponent) itemsInput!: OrderItemsInputComponent;

  deliveryMethods$ = this.store.select(selectDeliveryMethodsList);
  paymentMethods$ = this.store.select(selectPaymentMethodsList);
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
              this.createForm.controls.deliveryPostalCode.value || undefined,
          },
          payment: {
            methodId: this.createForm.controls.paymentMethodId.value,
          },
          items: this.itemsInput.items,
        },
      }),
    );
    this.store
      .select(selectSalesLoading)
      .pipe(
        first((v) => !v),
        take(1),
      )
      .subscribe(async () => {
        await this.router.navigate([
          'sales/orders',
          await firstValueFrom(this.store.select(selectNewOrderId)),
        ]);
      });
  }
}
