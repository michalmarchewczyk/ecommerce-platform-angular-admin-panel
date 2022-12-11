import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AttributeTypesActions } from '../../store';
import { FormControl, Validators } from '@angular/forms';
import { AttributeTypeDto } from '../../../core/api';
import ValueTypeEnum = AttributeTypeDto.ValueTypeEnum;

@Component({
  selector: 'app-attribute-type-create-dialog',
  templateUrl: './attribute-type-create-dialog.component.html',
  styleUrls: ['./attribute-type-create-dialog.component.scss'],
})
export class AttributeTypeCreateDialogComponent {
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  type = new FormControl<ValueTypeEnum>(ValueTypeEnum.String, {
    nonNullable: true,
    validators: [Validators.required],
  });
  types = Object.values(ValueTypeEnum);

  constructor(
    public dialogRef: MatDialogRef<AttributeTypeCreateDialogComponent>,
    private store: Store,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.store.dispatch(
      AttributeTypesActions.addAttributeType({
        data: { name: this.name.value, valueType: this.type.value },
      }),
    );
    this.dialogRef.close({ name: this.name.value, valueType: this.type.value });
  }
}
