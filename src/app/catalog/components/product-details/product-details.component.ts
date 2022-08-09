import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductPhotosInputComponent } from '../product-photos-input/product-photos-input.component';
import { Product } from '../../../core/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product | null = null;

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

  @ViewChild(ProductPhotosInputComponent)
  photosInput!: ProductPhotosInputComponent;

  constructor(private store: Store) {}

  async ngOnInit() {
    await this.resetValues();
  }

  async resetValues() {
    if (!this.product) {
      return;
    }
    this.editForm.reset({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      visible: this.product.visible.toString(),
    });
  }

  async save() {
    if (!this.product) {
      return;
    }
    this.store.dispatch(
      ProductsActions.updateProduct({
        id: this.product.id,
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
