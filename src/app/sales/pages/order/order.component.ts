import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrdersActions, selectSelectedOrder } from '../../store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  order$ = this.store.select(selectSelectedOrder);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(
      OrdersActions.selectOrder({
        orderId:
          parseInt(this.route.snapshot.paramMap.get('id') ?? '0') || null,
      }),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(OrdersActions.selectOrder({ orderId: null }));
  }
}
