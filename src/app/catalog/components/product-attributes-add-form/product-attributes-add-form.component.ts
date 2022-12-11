import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeDto, AttributeTypeDto, Product } from '../../../core/api';
import { AttributeTypesActions, selectAttributeTypesList } from '../../store';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import ValueTypeEnum = AttributeTypeDto.ValueTypeEnum;
import { AttributeTypeCreateDialogComponent } from '../attribute-type-create-dialog/attribute-type-create-dialog.component';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-attributes-add-form',
  templateUrl: './product-attributes-add-form.component.html',
  styleUrls: ['./product-attributes-add-form.component.scss'],
})
export class ProductAttributesAddFormComponent implements OnInit {
  @Input() product: Product | null = null;

  types$ = this.store.select(selectAttributeTypesList);
  type = new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required],
  });
  value = new FormControl<string>(
    { value: '', disabled: true },
    {
      nonNullable: true,
      validators: [Validators.required],
    },
  );
  valueType: ValueTypeEnum = 'string';
  @Output() add = new EventEmitter<AttributeDto & { id: number }>();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(AttributeTypesActions.getAttributeTypes());
  }

  createType() {
    this.type.markAsUntouched();

    const dialogRef = this.dialog.open(AttributeTypeCreateDialogComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.type.markAsUntouched();
      if (!result) {
        return;
      }
      const types = await firstValueFrom(this.types$);
      const newType = types.find(
        (t) => t.name === result.name && t.valueType === result.valueType,
      );
      this.type.setValue(newType?.id ?? 0);
      await this.newTypeChange();
    });
  }

  async newTypeChange() {
    const types = await firstValueFrom(this.types$);
    const selectedType = types.find((t) => t.id === this.type.value);
    if (selectedType) {
      this.value.enable();
      this.value.markAsUntouched();
      this.valueType = selectedType.valueType;
    } else {
      this.value.disable();
      this.valueType = 'string';
    }
  }

  save() {
    const typeId = this.type.value;
    const value = this.value.value.toString();
    this.add.emit({ typeId, value, id: -1 });
  }
}
