import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Order, OrderItem } from '../../../core/api';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit, OnChanges {
  @Input() order: Order | null = null;
  dataSource = new MatTableDataSource<OrderItem & { total: number }>();

  itemsQuantity = 0;
  itemsTotal = 0;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['order']) {
      this.updateData();
    }
  }

  ngOnInit() {
    this.updateData();
  }

  private updateData() {
    this.dataSource.data =
      this.order?.items?.map((item) => ({
        ...item,
        total: item.price * item.quantity,
      })) ?? [];
    this.dataSource.sort = this.sort;
    this.itemsQuantity = this.dataSource.data.reduce(
      (acc, cur) => acc + cur.quantity,
      0,
    );
    this.itemsTotal = this.dataSource.data.reduce(
      (acc, cur) => acc + cur.total,
      0,
    );
  }
}
