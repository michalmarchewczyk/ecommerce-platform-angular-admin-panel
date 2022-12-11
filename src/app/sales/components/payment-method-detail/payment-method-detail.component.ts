import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentMethod } from '../../../core/api';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodsActions } from '../../store';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment-method-detail',
  templateUrl: './payment-method-detail.component.html',
  styleUrls: ['./payment-method-detail.component.scss'],
})
export class PaymentMethodDetailComponent implements OnInit {
  @Input() paymentMethod!: PaymentMethod;

  @Output() cancel = new EventEmitter<void>();

  editForm = new FormGroup({
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

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.resetValues();
  }

  resetValues() {
    this.editForm.setValue({
      name: this.paymentMethod.name,
      description: this.paymentMethod.description,
      price: this.paymentMethod.price,
    });
  }

  save() {
    this.store.dispatch(
      PaymentMethodsActions.updatePaymentMethod({
        methodId: this.paymentMethod.id,
        data: {
          ...this.editForm.getRawValue(),
        },
      }),
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete payment method',
        message: 'Are you sure you want to delete this payment method?',
        confirmButton: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          PaymentMethodsActions.deletePaymentMethod({
            methodId: this.paymentMethod.id,
          }),
        );
      }
    });
  }
}
