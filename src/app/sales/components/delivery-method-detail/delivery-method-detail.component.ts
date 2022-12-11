import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeliveryMethod } from '../../../core/api';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryMethodsActions } from '../../store';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delivery-method-detail',
  templateUrl: './delivery-method-detail.component.html',
  styleUrls: ['./delivery-method-detail.component.scss'],
})
export class DeliveryMethodDetailComponent implements OnInit {
  @Input() deliveryMethod!: DeliveryMethod;

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
      name: this.deliveryMethod.name,
      description: this.deliveryMethod.description,
      price: this.deliveryMethod.price,
    });
  }

  save() {
    this.store.dispatch(
      DeliveryMethodsActions.updateDeliveryMethod({
        methodId: this.deliveryMethod.id,
        data: {
          ...this.editForm.getRawValue(),
        },
      }),
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete delivery method',
        message: 'Are you sure you want to delete this delivery method?',
        confirmButton: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          DeliveryMethodsActions.deleteDeliveryMethod({
            methodId: this.deliveryMethod.id,
          }),
        );
      }
    });
  }
}
