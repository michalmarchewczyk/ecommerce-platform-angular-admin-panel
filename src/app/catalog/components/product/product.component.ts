import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions, selectSelectedProduct } from '../../store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { FileInput } from 'ngx-material-file-input';

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
    photos: new FormControl<FileInput>(new FileInput([]), {
      nonNullable: true,
    }),
    photosToDelete: new FormControl<number[]>([], {
      nonNullable: true,
    }),
  });
  private subscription!: Subscription;
  photosToDisplay: { name: string; data: string }[] = [];

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

  updatePhotos() {
    this.photosToDisplay = [];
    for (const file of this.editForm.controls.photos.value.files) {
      this.photosToDisplay.push({
        name: file.name,
        data: URL.createObjectURL(file),
      });
    }
  }

  deletePhoto(id: number) {
    const photosToDelete = this.editForm.controls.photosToDelete.value;
    photosToDelete.push(id);
    this.editForm.controls.photosToDelete.setValue(photosToDelete);
  }

  restorePhoto(id: number) {
    this.editForm.controls.photosToDelete.setValue(
      this.editForm.controls.photosToDelete.value.filter(
        (photoId) => photoId !== id,
      ),
    );
  }

  removePhoto(name: string) {
    this.editForm.controls.photos.setValue(
      new FileInput(
        this.editForm.controls.photos.value.files.filter(
          (file) => file.name !== name,
        ),
      ),
    );
    this.photosToDisplay = this.photosToDisplay.filter(
      (photo) => photo.name !== name,
    );
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
      photos: new FileInput([]),
      photosToDelete: [],
    });
    this.updatePhotos();
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
    await this.savePhotos(product.id);
    await this.deletePhotos(product.id);
  }

  private async savePhotos(productId: number) {
    for (const file of this.editForm.controls.photos.value.files) {
      this.store.dispatch(
        ProductsActions.addProductPhoto({
          productId: productId,
          data: file,
        }),
      );
    }
  }

  private async deletePhotos(productId: number) {
    for (const photoId of this.editForm.controls.photosToDelete.value) {
      this.store.dispatch(
        ProductsActions.deleteProductPhoto({
          productId: productId,
          photoId,
        }),
      );
    }
  }
}
