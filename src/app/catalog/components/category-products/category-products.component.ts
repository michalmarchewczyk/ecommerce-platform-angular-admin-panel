import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../core/api';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
  @Input() category: Category | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.category) {
      return;
    }
    this.store.dispatch(
      CategoriesActions.getCategoryProducts({ id: this.category.id }),
    );
  }

  deleteProduct(id: number) {
    if (!this.category) {
      return;
    }
    this.store.dispatch(
      CategoriesActions.deleteCategoryProduct({
        categoryId: this.category.id,
        productId: id,
      }),
    );
  }
}
