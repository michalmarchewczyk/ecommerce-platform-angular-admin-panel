import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attribute, AttributeTypeDto } from '../../../core/api';
import { FormControl, Validators } from '@angular/forms';
import ValueTypeEnum = AttributeTypeDto.ValueTypeEnum;

@Component({
  selector: 'app-product-attribute-item',
  templateUrl: './product-attribute-item.component.html',
  styleUrls: ['./product-attribute-item.component.scss'],
})
export class ProductAttributeItemComponent implements OnInit {
  @Input() attribute: Attribute | null = null;

  value = new FormControl<string>(this.attribute?.value ?? '', {
    nonNullable: true,
    validators: [Validators.required],
  });
  valueType: ValueTypeEnum = this.attribute?.type.valueType ?? 'string';

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; value: string }>();

  constructor() {}

  ngOnInit() {
    this.value.setValue(this.attribute?.value ?? '');
    this.valueType = this.attribute?.type.valueType ?? 'string';
  }

  onChange() {
    if (!this.attribute || this.value.invalid) {
      return;
    }
    this.update.emit({
      id: this.attribute.id,
      value: this.value.value.toString(),
    });
  }

  onDelete() {
    if (!this.attribute) {
      return;
    }
    this.delete.emit(this.attribute.id);
  }
}
