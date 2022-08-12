import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsActions, selectSelectedProduct } from '../../store';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product$ = this.store.select(selectSelectedProduct);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(
      ProductsActions.selectProduct({
        productId:
          parseInt(this.route.snapshot.paramMap.get('id') ?? '0') || null,
      }),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(ProductsActions.selectProduct({ productId: null }));
  }
}
