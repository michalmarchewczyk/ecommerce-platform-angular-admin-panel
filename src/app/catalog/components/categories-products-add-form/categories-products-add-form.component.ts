import { Component, Input } from '@angular/core';
import { CategoriesActions, selectProductsList } from '../../store';
import { Category } from '../../../core/api';
import { FormControl } from '@angular/forms';
import { combineLatestWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories-products-add-form',
  templateUrl: './categories-products-add-form.component.html',
  styleUrls: ['./categories-products-add-form.component.scss'],
})
export class CategoriesProductsAddFormComponent {
  @Input() category: Category | null = null;
  products$ = this.store.select(selectProductsList);

  selectedProducts = new FormControl<number[]>([], {
    nonNullable: true,
  });
  productsFilter = new FormControl('');

  filteredProducts$ = this.products$.pipe(
    combineLatestWith(this.productsFilter.valueChanges),
    map(([products, filter]) => {
      products = products.filter(
        ({ id }) => !this.category?.products.map((p) => p.id).includes(id),
      );
      if (!filter) {
        return products;
      } else {
        return products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()),
        );
      }
    }),
  );

  constructor(private store: Store) {}

  add() {
    if (!this.category) {
      return;
    }
    for (const productId of this.selectedProducts.value) {
      this.store.dispatch(
        CategoriesActions.addCategoryProduct({
          categoryId: this.category.id,
          productId,
        }),
      );
    }
    this.selectedProducts.reset();
  }
}
