import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewProductPhotosInputComponent } from '../../components/new-product-photos-input/new-product-photos-input.component';
import {
  ProductsActions,
  selectCatalogLoading,
  selectCatalogNewProductId,
} from '../../store';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss'],
})
export class CreateProductFormComponent {
  addForm = new FormGroup({
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
  newProductId$ = this.store.select(selectCatalogNewProductId);

  @ViewChild(NewProductPhotosInputComponent)
  photosInput!: NewProductPhotosInputComponent;

  constructor(private store: Store, private router: Router) {}

  async save() {
    this.store.dispatch(
      ProductsActions.addProduct({
        data: {
          ...this.addForm.getRawValue(),
          visible: this.addForm.value.visible === 'true',
        },
      }),
    );
    this.newProductId$
      .pipe(first((v) => v !== null))
      .subscribe(async (value) => {
        if (value) {
          await this.savePhotos(value);
        }
      });
  }

  private async savePhotos(productId: number) {
    for (const file of this.photosInput.photosToSave.value.files) {
      this.store.dispatch(
        ProductsActions.addProductPhoto({
          productId,
          data: file,
        }),
      );
    }
    this.store
      .select(selectCatalogLoading)
      .pipe(first((v) => !v))
      .subscribe(() => {
        this.router.navigate(['/catalog/products', productId]);
      });
  }
}
