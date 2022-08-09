import { Component, OnInit } from '@angular/core';
import { ProductsActions } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
