import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  OrdersActions,
  ReturnsActions,
  selectOrdersListWithItems,
  selectReturnsList,
} from '../../store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { combineLatestWith, Observable } from 'rxjs';
import { Order } from '../../../core/api';

@Component({
  selector: 'app-add-return-dialog',
  templateUrl: './return-add-dialog.component.html',
  styleUrls: ['./return-add-dialog.component.scss'],
})
export class ReturnAddDialogComponent implements OnInit {
  orderId: number | null = null;
  message: string = '';

  returns$ = this.store.select(selectReturnsList);
  orders$ = this.store.select(selectOrdersListWithItems);
  ordersFiltered$: Observable<(Order & { itemsTotal: number })[]> =
    this.orders$.pipe(
      combineLatestWith(this.returns$),
      map(([orders, returns]) =>
        orders.filter((o) => !returns.find((r) => r.order.id === o.id)),
      ),
    );

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ReturnAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number | null },
  ) {}

  ngOnInit(): void {
    this.store.dispatch(OrdersActions.loadOrders());
    this.orderId = this.data.orderId;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  add() {
    if (!this.orderId) {
      return;
    }
    this.store.dispatch(
      ReturnsActions.createReturn({
        data: {
          orderId: this.orderId,
          message: this.message,
        },
      }),
    );
    this.dialogRef.close(true);
  }
}
