import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import StatusEnum = Order.StatusEnum;
import { Store } from '@ngrx/store';
import {
  OrdersActions,
  selectDeliveryMethodsList,
  selectPaymentMethodsList,
} from '../../store';

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.scss'],
})
export class EditOrderFormComponent implements OnInit {
  @Input() order: Order | null = null;

  editForm = new FormGroup({
    status: new FormControl<StatusEnum>('pending', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deliveryStatus: new FormControl('', {
      nonNullable: true,
    }),
    deliveryMethod: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    paymentStatus: new FormControl('', {
      nonNullable: true,
    }),
    paymentMethod: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  deliveryMethods$ = this.store.select(selectDeliveryMethodsList);
  paymentMethods$ = this.store.select(selectPaymentMethodsList);

  constructor(private store: Store) {}

  resetValues() {
    this.editForm.reset({
      status: this.order?.status,
      deliveryStatus: this.order?.delivery.deliveryStatus,
      deliveryMethod: this.order?.delivery.method.id,
      paymentStatus: this.order?.payment.paymentStatus,
      paymentMethod: this.order?.payment.method.id,
    });
  }

  ngOnInit() {
    this.resetValues();
  }

  save() {
    if (!this.order || !this.order.delivery) {
      return;
    }
    this.store.dispatch(
      OrdersActions.updateOrder({
        orderId: this.order.id,
        data: {
          status: this.editForm.getRawValue().status,
          delivery: {
            ...this.order.delivery,
            deliveryStatus: this.editForm.getRawValue().deliveryStatus,
            methodId: this.editForm.getRawValue().deliveryMethod,
          },
          payment: {
            paymentStatus: this.editForm.getRawValue().paymentStatus,
            methodId: this.editForm.getRawValue().paymentMethod,
          },
        },
      }),
    );
  }
}
