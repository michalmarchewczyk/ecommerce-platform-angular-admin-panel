import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersActions, selectOrdersListWithItems } from '../../store';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../../core/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { ProductsActions } from '../../../catalog/store';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnDestroy {
  orders$ = this.store.select(selectOrdersListWithItems);
  dataSource = new MatTableDataSource<Order>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.data = [];
    this.store.dispatch(ProductsActions.loadProducts());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.orders$);
    this.subscription = this.orders$.subscribe((orders) => {
      this.dataSource.data = orders;
    });
    this.store.dispatch(OrdersActions.loadOrders());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
