import { Component, Input } from '@angular/core';
import { Product } from '../../../core/api';
import { FormControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { ProductsActions } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-photos-input',
  templateUrl: './product-photos-input.component.html',
  styleUrls: ['./product-photos-input.component.scss'],
})
export class ProductPhotosInputComponent {
  @Input() product: Product | null | undefined = null;

  photosToSave = new FormControl<FileInput>(new FileInput([]), {
    nonNullable: true,
  });
  photosToDelete = new FormControl<number[]>([], {
    nonNullable: true,
  });
  photosToDisplay: { name: string; data: string }[] = [];

  constructor(private store: Store) {}

  updatePhotosToDisplay() {
    this.photosToDisplay = [];
    for (const file of this.photosToSave.value.files) {
      this.photosToDisplay.push({
        name: file.name,
        data: URL.createObjectURL(file),
      });
    }
  }

  removePhoto(name: string) {
    this.photosToSave.setValue(
      new FileInput(
        this.photosToSave.value.files.filter((file) => file.name !== name),
      ),
    );
    this.photosToDisplay = this.photosToDisplay.filter(
      (photo) => photo.name !== name,
    );
  }

  markPhotoToDelete(id: number) {
    const photosToDelete = this.photosToDelete.value;
    photosToDelete.push(id);
    this.photosToDelete.setValue(photosToDelete);
  }

  unmarkPhoto(id: number) {
    this.photosToDelete.setValue(
      this.photosToDelete.value.filter((photoId) => photoId !== id),
    );
  }

  private async resetValues() {
    this.photosToSave.setValue(new FileInput([]));
    this.photosToDelete.setValue([]);
    await this.updatePhotosToDisplay();
  }

  public async save() {
    await this.savePhotos();
    await this.deletePhotos();
    await this.resetValues();
  }

  private async savePhotos() {
    if (!this.product) {
      return;
    }
    for (const file of this.photosToSave.value.files) {
      this.store.dispatch(
        ProductsActions.addProductPhoto({
          productId: this.product.id,
          data: file,
        }),
      );
    }
  }

  private async deletePhotos() {
    if (!this.product) {
      return;
    }
    for (const photoId of this.photosToDelete.value) {
      this.store.dispatch(
        ProductsActions.deleteProductPhoto({
          productId: this.product.id,
          photoId,
        }),
      );
    }
  }
}
