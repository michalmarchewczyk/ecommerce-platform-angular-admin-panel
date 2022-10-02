import { Component, ViewChild } from '@angular/core';
import { selectProductsList } from '../../../catalog/store';
import { Store } from '@ngrx/store';
import { OrderItemDto, Product } from '../../../core/api';
import { FormControl } from '@angular/forms';
import { combineLatestWith, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-order-items-input',
  templateUrl: './order-items-input.component.html',
  styleUrls: ['./order-items-input.component.scss'],
})
export class OrderItemsInputComponent {
  items: OrderItemDto[] = [];

  selectProduct = new FormControl<number>(-1);
  products$ = this.store.select(selectProductsList);
  productsFilter = new FormControl('');
  itemsQuantity = 0;
  itemsTotal = 0;

  dataSource: { product: Product; quantity: number }[] = [];

  filteredProducts$ = this.products$.pipe(
    combineLatestWith(this.productsFilter.valueChanges),
    map(([products, filter]) =>
      filter
        ? products.filter((p) =>
            p.name.toLowerCase().includes(filter.toLowerCase()),
          )
        : products,
    ),
    map((products) =>
      products.filter((p) => !this.items.find((i) => i.productId === p.id)),
    ),
  );

  @ViewChild(MatTable) table!: MatTable<{ product: Product; quantity: number }>;

  constructor(private store: Store) {}

  async addProduct(productId: number) {
    const product = (await firstValueFrom(this.products$)).find(
      (p) => p.id === productId,
    );
    if (!product || this.items.find((i) => i.productId === productId)) {
      return;
    }
    this.items.push({ productId, quantity: 1 });
    this.dataSource.push({
      product,
      quantity: 1,
    });
    this.table.renderRows();
    this.selectProduct.reset();
    this.updateTotals();
  }

  async deleteItem(item: { product: Product; quantity: number }) {
    this.items = this.items.filter((i) => i.productId !== item.product.id);
    this.dataSource = this.dataSource.filter(
      (i) => i.product.id !== item.product.id,
    );
    this.updateTotals();
  }

  async updateQuantity(item: { product: Product; quantity: number }) {
    const orderItem = this.items.find((i) => i.productId === item.product.id);
    if (orderItem) {
      orderItem.quantity = item.quantity;
    }
    this.updateTotals();
  }

  updateTotals() {
    this.itemsQuantity = this.dataSource.reduce(
      (acc, i) => acc + i.quantity,
      0,
    );
    this.itemsTotal = this.dataSource.reduce(
      (acc, i) => acc + i.quantity * i.product.price,
      0,
    );
  }
}
