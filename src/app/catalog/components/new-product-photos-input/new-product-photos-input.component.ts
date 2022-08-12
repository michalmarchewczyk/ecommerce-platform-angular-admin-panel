import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-new-product-photos-input',
  templateUrl: './new-product-photos-input.component.html',
  styleUrls: ['./new-product-photos-input.component.scss'],
})
export class NewProductPhotosInputComponent {
  photosToSave = new FormControl<FileInput>(new FileInput([]), {
    nonNullable: true,
  });
  photosToDisplay: { name: string; data: string }[] = [];

  constructor() {}

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
}
