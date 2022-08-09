import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions, selectSelectedProduct } from '../../store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { ProductPhotosInputComponent } from '../product-photos-input/product-photos-input.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product$ = this.store.select(selectSelectedProduct);
  editForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    visible: new FormControl('true', {
      nonNullable: true,
    }),
  });
  private subscription!: Subscription;

  @ViewChild(ProductPhotosInputComponent)
  private photosInput!: ProductPhotosInputComponent;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      ProductsActions.selectProduct({
        productId:
          parseInt(this.route.snapshot.paramMap.get('id') ?? '0') || null,
      }),
    );
    this.subscription = this.product$.subscribe(async () => {
      await this.resetValues();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ProductsActions.selectProduct({ productId: null }));
  }

  async resetValues() {
    const product = await firstValueFrom(this.product$);
    if (!product) {
      return;
    }
    this.editForm.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      visible: product.visible.toString(),
    });
  }

  async save() {
    const product = await firstValueFrom(this.product$);
    if (!product) {
      return;
    }
    this.store.dispatch(
      ProductsActions.updateProduct({
        id: product.id,
        data: {
          name: this.editForm.value.name,
          description: this.editForm.value.description,
          price: this.editForm.value.price,
          stock: this.editForm.value.stock,
          visible: this.editForm.value.visible === 'true',
        },
      }),
    );
    await this.photosInput.save();
  }
}
