import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../../store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(OrdersActions.loadOrders());
  }
}
